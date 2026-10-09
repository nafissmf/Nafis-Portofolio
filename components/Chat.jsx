"use client";

import { useEffect, useId, useRef, useState } from "react";

const STARTERS = [
	"Bagaimana cara membuat website?",
	"Bisa membuat apa saja?",
	"Langkah-langkahnya bagaimana?",
];

const GUIDES = [
	{
		keys: ["cara membuat website", "buat website", "bikin website", "membuat website", "make a website", "build a website"],
		follow: ["Bisa membuat apa saja?", "Pakai alat apa?", "Bagaimana cara menayangkannya?"],
		text: "Website dibuat dari ide, halaman, dan kode yang ditayangkan ke internet.\n\n1. Tentukan tujuan dan halaman: beranda, tentang, karya, dan kontak.\n2. Susun tampilan: warna, huruf, dan foto.\n3. Bangun dengan HTML, CSS, dan JavaScript, atau kerangka seperti Next.js.\n4. Isi dengan tulisan dan gambar milik sendiri.\n5. Jalankan di komputer untuk dicek.\n6. Unggah ke hosting supaya orang lain bisa membuka alamatnya.",
	},
	{
		keys: ["bisa membuat apa", "membuat apa saja", "apa saja", "jenis website", "what can i build"],
		follow: ["Bagaimana cara membuat website?", "Bagaimana membuat portofolio?", "Pakai alat apa?"],
		text: "Yang paling sering dibuat:\n\n- Situs profil atau portofolio, seperti halaman ini.\n- Situs perusahaan atau organisasi.\n- Halaman promosi untuk satu produk.\n- Toko sederhana dengan daftar barang dan tombol pesan.\n- Aplikasi web: dasbor, formulir, atau catatan.\n- Blog untuk tulisan berurutan.\n\nMulailah dari satu jenis. Portofolio adalah latihan yang paling jelas.",
	},
	{
		keys: ["langkah", "caranya bagaimana", "cara membuatnya", "step by step", "langkah-langkah"],
		follow: ["Pakai alat apa?", "Bagaimana cara menayangkannya?", "Bagaimana membuat portofolio?"],
		text: "Urutan kerja yang tenang:\n\n1. Tulis apa yang ingin ditampilkan, satu kalimat saja.\n2. Gambar sketsa tiap halaman di kertas.\n3. Buat proyek Next.js atau HTML biasa.\n4. Kerjakan satu bagian dulu, misalnya beranda.\n5. Tambah halaman lain setelah beranda sudah rapi.\n6. Simpan ke GitHub.\n7. Tayangkan lewat Vercel atau Netlify, lalu cek di ponsel.",
	},
	{
		keys: ["portofolio", "portfolio"],
		follow: ["Langkah-langkahnya bagaimana?", "Bagaimana cara menayangkannya?"],
		text: "Portofolio cukup empat bagian.\n\n- Perkenalan singkat dan peran Anda.\n- Beberapa proyek, masing-masing dengan gambar dan tautan.\n- Keahlian atau alat yang dipakai.\n- Cara menghubungi, misalnya LinkedIn.\n\nPilih karya yang paling jelas menceritakan apa yang bisa Anda buat.",
	},
	{
		keys: ["alat", "tools", "next.js", "nextjs", "html", "css", "javascript"],
		follow: ["Bagaimana cara membuat website?", "Bagaimana cara menayangkannya?"],
		text: "Alat yang cukup untuk mulai:\n\n- Cursor atau VS Code untuk menulis kode.\n- HTML untuk isi, CSS untuk tampilan, JavaScript untuk interaksi.\n- Next.js kalau ingin situs yang rapi dan mudah ditambah halamannya.\n- GitHub untuk menyimpan versi kode.\n- Vercel untuk menayangkan situs pada awalnya.",
	},
	{
		keys: ["tayang", "menayang", "hosting", "deploy", "vercel", "online", "unggah", "upload"],
		follow: ["Pakai alat apa?", "Bagaimana cara membuat website?"],
		text: "Menayangkan situs:\n\n1. Simpan proyek di GitHub.\n2. Buka Vercel dan hubungkan repositori itu.\n3. Biarkan Vercel membangun situsnya.\n4. Anda mendapat alamat web yang bisa dibagikan.\n5. Setiap perubahan yang didorong ke GitHub bisa memperbarui situs.",
	},
];

const FALLBACK = {
	follow: STARTERS,
	text: "Saya bantu soal membuat website. Coba tanyakan cara membuatnya, apa saja yang bisa dibuat, atau langkah mengerjakannya.",
};

function normalize(value) {
	return value.toLowerCase().replace(/[^a-z0-9\u00c0-\u024f\s]/gi, " ");
}

function localReply(question) {
	const normalized = normalize(question);
	let best = null;
	let bestScore = 0;

	for (const guide of GUIDES) {
		let score = 0;
		for (const key of guide.keys) {
			if (normalized.includes(normalize(key))) score += key.length;
		}
		if (score > bestScore) {
			best = guide;
			bestScore = score;
		}
	}

	return bestScore >= 4 ? best : FALLBACK;
}

function Mark() {
	return <img src="/logo-nm.png?v=2" alt="" />;
}

function Answer({ text }) {
	const blocks = text
		.split(/\n+/)
		.map((line) => line.trim())
		.filter(Boolean);

	return blocks.map((line, index) => <p key={`${index}-${line}`}>{line}</p>);
}

export default function Chat() {
	const titleId = useId();
	const panelRef = useRef(null);
	const logRef = useRef(null);
	const inputRef = useRef(null);
	const [open, setOpen] = useState(false);
	const [draft, setDraft] = useState("");
	const [pending, setPending] = useState(false);
	const [gemini, setGemini] = useState(false);
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			text: "Halo. Tanya saja cara membuat website, apa yang bisa dibuat, atau langkah mengerjakannya.",
			follow: STARTERS,
		},
	]);

	useEffect(() => {
		let ignore = false;
		fetch("/api/ask")
			.then((response) => response.json())
			.then((data) => {
				if (!ignore) setGemini(Boolean(data.ready));
			})
			.catch(() => {
				if (!ignore) setGemini(false);
			});
		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		if (!open) return undefined;
		const panel = panelRef.current;
		const onKey = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		const keepTyping = (event) => {
			if (event.key === "Escape") return;
			const target = event.target;
			if (target instanceof Element && target.closest("input, textarea, [contenteditable='true']")) {
				event.stopPropagation();
			}
		};
		const keepScroll = (event) => {
			event.stopPropagation();
			if (event.type !== "wheel") return;
			event.preventDefault();
			const log = logRef.current;
			if (log) log.scrollTop += event.deltaY;
		};
		window.addEventListener("keydown", onKey);
		panel?.addEventListener("keydown", keepTyping);
		panel?.addEventListener("wheel", keepScroll, { passive: false });
		panel?.addEventListener("touchmove", keepScroll, { passive: true });
		inputRef.current?.focus();
		return () => {
			window.removeEventListener("keydown", onKey);
			panel?.removeEventListener("keydown", keepTyping);
			panel?.removeEventListener("wheel", keepScroll);
			panel?.removeEventListener("touchmove", keepScroll);
		};
	}, [open]);

	useEffect(() => {
		const log = logRef.current;
		if (log) log.scrollTop = log.scrollHeight;
	}, [messages, pending, open]);

	const ask = async (question) => {
		const text = question.trim();
		if (!text || pending) return;

		const history = [...messages, { role: "user", text }];
		setDraft("");
		setPending(true);
		setMessages(history);

		if (gemini) {
			try {
				const response = await fetch("/api/ask", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						messages: history.map((message) => ({ role: message.role, text: message.text })),
					}),
				});
				const data = await response.json();
				if (response.ok && data.answer) {
					setMessages((current) => [
						...current,
						{ role: "assistant", text: data.answer, follow: data.follow?.length ? data.follow : STARTERS },
					]);
					setPending(false);
					return;
				}
				if (data.error === "missing_key") setGemini(false);
				if (data.error === "busy") {
					setMessages((current) => [
						...current,
						{
							role: "assistant",
							text: "Terlalu banyak pertanyaan sekaligus. Tunggu sebentar, lalu coba lagi.",
							follow: STARTERS,
						},
					]);
					setPending(false);
					return;
				}
			} catch {
				/* Local guide still answers if Gemini cannot be reached. */
			}
		}

		const answer = localReply(text);
		setMessages((current) => [...current, { role: "assistant", text: answer.text, follow: answer.follow }]);
		setPending(false);
	};

	const follow = !pending ? messages.at(-1)?.follow : null;

	return (
		<div className="contact-dock">
			{open && (
				<section className="guide-panel" role="dialog" aria-labelledby={titleId} ref={panelRef}>
					<header className="guide-head">
						<div className="guide-mark" aria-hidden="true">
							<Mark />
						</div>
						<div>
							<p className="guide-kicker">
								<span className={gemini ? "guide-dot" : "guide-dot guide-dot--wait"} />
								{gemini ? "Gemini" : "Panduan"}
							</p>
							<h2 id={titleId}>Tanya jawab</h2>
						</div>
						<button type="button" className="guide-close" onClick={() => setOpen(false)} aria-label="Tutup tanya jawab">
							×
						</button>
					</header>
					<div className="guide-log" ref={logRef}>
						{messages.map((message, index) => (
							<div key={`${message.role}-${index}`} className={`guide-row${message.role === "user" ? " guide-row--user" : ""}`}>
								{message.role === "assistant" && (
									<span className="guide-avatar" aria-hidden="true">
										<Mark />
									</span>
								)}
								<div className={`guide-bubble guide-bubble--${message.role}`}>
									<Answer text={message.text} />
								</div>
							</div>
						))}
						{pending && (
							<div className="guide-row">
								<span className="guide-avatar" aria-hidden="true">
									<Mark />
								</span>
								<div className="guide-bubble guide-bubble--assistant" aria-label="Menyusun jawaban">
									<span className="guide-typing">
										<i />
										<i />
										<i />
									</span>
								</div>
							</div>
						)}
					</div>
					{follow && (
						<div className="guide-suggest">
							{follow.map((item) => (
								<button key={item} type="button" onClick={() => ask(item)}>
									{item}
								</button>
							))}
						</div>
					)}
					<form
						className="guide-form"
						onSubmit={(event) => {
							event.preventDefault();
							ask(draft);
						}}>
						<input
							ref={inputRef}
							value={draft}
							onChange={(event) => setDraft(event.target.value)}
							placeholder="Tulis pertanyaan"
							aria-label="Pertanyaan"
							maxLength={500}
						/>
						<button type="submit" disabled={!draft.trim() || pending} aria-label="Kirim">
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M3.4 11.2 20.2 4.1c.8-.3 1.6.5 1.3 1.3l-7.1 16.8c-.3.8-1.5.8-1.8 0l-2.4-6.3-6.3-2.4c-.8-.3-.8-1.5 0-1.8Z" />
							</svg>
						</button>
					</form>
				</section>
			)}
			<button
				type="button"
				className="contact-launcher"
				aria-expanded={open}
				aria-label={open ? "Tutup tanya jawab" : "Buka tanya jawab"}
				onClick={() => setOpen((value) => !value)}>
				{open ? (
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M6.2 5.2 12 11l5.8-5.8 1 1L13 12l5.8 5.8-1 1L12 13l-5.8 5.8-1-1L11 12 5.2 6.2l1-1Z" />
					</svg>
				) : (
					<svg viewBox="0 0 24 24" aria-hidden="true">
						<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2h7A3.5 3.5 0 0 1 19 5.5v6A3.5 3.5 0 0 1 15.5 15H9.8L6 18.2c-.7.6-1.8.1-1.8-.8V5.5ZM8.5 4A1.5 1.5 0 0 0 7 5.5V15l2.2-1.8c.2-.2.5-.2.7-.2h5.6A1.5 1.5 0 0 0 17 11.5v-6A1.5 1.5 0 0 0 15.5 4h-7Z" />
					</svg>
				)}
			</button>
		</div>
	);
}
