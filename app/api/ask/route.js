const SYSTEM = `Anda asisten di situs portofolio Nafis Mufadhal.
Tugas Anda hanya membantu pengunjung belajar membuat website.

Aturan:
- Jawab dalam bahasa Indonesia yang hangat, jelas, dan singkat.
- Fokus pada cara membuat website, jenis situs yang bisa dibuat, langkah kerja, alat, dan cara menayangkan situs.
- Jika pertanyaan di luar topik itu, arahkan kembali dengan sopan ke cara membuat website.
- Jangan menyimpan pesan, jangan meminta email, dan jangan meminta data pribadi.
- answer paling banyak sekitar 140 kata. Untuk urutan kerja, mulai tiap langkah dengan nomor.
- Jangan memakai markdown, tanda bintang, atau heading.
- follow berisi 2 atau 3 pertanyaan lanjutan yang pendek, masih tentang membuat website.

Balas hanya JSON dengan bentuk {"answer":"...","follow":["...","..."]}.`;

const WINDOW_MS = 60_000;
const MAX_HITS = 12;
const hits = new Map();

function clientKey(request) {
	const forwarded = request.headers.get("x-forwarded-for") || "";
	return forwarded.split(",")[0].trim() || "local";
}

function limited(key) {
	const now = Date.now();
	const recent = (hits.get(key) || []).filter((time) => now - time < WINDOW_MS);
	if (recent.length >= MAX_HITS) {
		hits.set(key, recent);
		return true;
	}
	recent.push(now);
	hits.set(key, recent);
	return false;
}

function cleanMessages(input) {
	if (!Array.isArray(input)) return [];
	const messages = input
		.filter((item) => item && (item.role === "user" || item.role === "assistant"))
		.map((item) => ({
			role: item.role === "assistant" ? "model" : "user",
			text: String(item.text || "").trim().slice(0, 1500),
		}))
		.filter((item) => item.text)
		.slice(-8);

	while (messages[0]?.role === "model") messages.shift();
	return messages;
}

function parseReply(raw) {
	const trimmed = String(raw || "")
		.trim()
		.replace(/^```json\s*/i, "")
		.replace(/^```\s*/i, "")
		.replace(/```$/i, "")
		.trim();

	try {
		const data = JSON.parse(trimmed);
		const answer = String(data.answer || "").trim();
		if (answer) {
			const follow = Array.isArray(data.follow)
				? data.follow
						.map((item) => String(item || "").trim())
						.filter(Boolean)
						.slice(0, 3)
				: [];
			return { answer, follow };
		}
	} catch {
		/* The model sometimes answers in plain text. */
	}

	return trimmed ? { answer: trimmed, follow: [] } : null;
}

async function callGemini(model, contents) {
	const generationConfigs = [
		{ maxOutputTokens: 700, thinkingConfig: { thinkingLevel: "minimal" } },
		{ maxOutputTokens: 700 },
	];
	let status = 502;

	for (const generationConfig of generationConfigs) {
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-goog-api-key": process.env.GEMINI_API_KEY,
				},
				signal: AbortSignal.timeout(25000),
				body: JSON.stringify({
					systemInstruction: { parts: [{ text: SYSTEM }] },
					contents: contents.map((item) => ({
						role: item.role,
						parts: [{ text: item.text }],
					})),
					generationConfig,
				}),
			}
		);

		status = response.status;
		if (response.status === 400) continue;
		if (!response.ok) {
			console.error("Gemini status", response.status);
			return { ok: false, status: response.status };
		}

		const data = await response.json();
		const parts = data?.candidates?.[0]?.content?.parts || [];
		const text = parts
			.filter((part) => part?.text && !part.thought)
			.map((part) => part.text)
			.join("\n")
			.trim();
		const reply = parseReply(text);
		return reply ? { ok: true, reply } : { ok: false, status: 502 };
	}

	return { ok: false, status };
}

export async function GET() {
	return Response.json({ ready: Boolean(process.env.GEMINI_API_KEY) });
}

export async function POST(request) {
	if (!process.env.GEMINI_API_KEY) {
		return Response.json({ error: "missing_key" }, { status: 503 });
	}

	if (limited(clientKey(request))) {
		return Response.json({ error: "busy" }, { status: 429 });
	}

	let payload;
	try {
		payload = await request.json();
	} catch {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const messages = cleanMessages(payload?.messages);
	if (!messages.length || messages.at(-1).role !== "user") {
		return Response.json({ error: "invalid" }, { status: 400 });
	}

	const preferred = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
	const models = [preferred, "gemini-3.5-flash-lite"].filter((model, index, list) => list.indexOf(model) === index);

	for (const model of models) {
		try {
			const result = await callGemini(model, messages);
			if (result.ok) return Response.json(result.reply);
			if (result.status !== 404) break;
		} catch {
			console.error("Gemini request failed");
			break;
		}
	}

	return Response.json({ error: "upstream" }, { status: 502 });
}
