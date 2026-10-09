const SKIP = new Set(["nafissmf"]);
const TOOLING = new Set(["Dockerfile", "Shell", "Mako", "Batchfile", "Procfile", "Makefile"]);

function githubHeaders() {
	const headers = {
		Accept: "application/vnd.github+json",
		"User-Agent": "nafis-portfolio",
	};
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
}

function categoryFor(language) {
	const lang = (language || "").toLowerCase();
	if (lang === "python") return [2];
	if (["javascript", "typescript", "php", "css", "html", "blade"].includes(lang)) return [1];
	return [9];
}

async function techFor(repo, headers) {
	try {
		const response = await fetch(repo.languages_url, {
			headers,
			next: { revalidate: 3600 },
		});
		if (response.ok) {
			const data = await response.json();
			const names = Object.entries(data)
				.filter(([name]) => !TOOLING.has(name))
				.sort((a, b) => b[1] - a[1])
				.map(([name]) => name);
			if (names.length) return names;
		}
	} catch {
		// Keep the primary language when the languages endpoint is unavailable.
	}
	return repo.language ? [repo.language] : [];
}

function titleFrom(name) {
	return name.replace(/-/g, " ");
}

async function fetchRepoPage(url, headers) {
	const response = await fetch(url, {
		headers,
		next: { revalidate: 3600 },
	});
	if (!response.ok) return null;
	const repos = await response.json();
	return Array.isArray(repos) ? repos : null;
}

async function fetchRepos(headers) {
	if (process.env.GITHUB_TOKEN) {
		const collected = [];
		for (let page = 1; page <= 10; page += 1) {
			const batch = await fetchRepoPage(
				`https://api.github.com/user/repos?per_page=100&page=${page}&visibility=all&affiliation=owner&sort=updated`,
				headers
			);
			if (!batch) break;
			collected.push(...batch);
			if (batch.length < 100) break;
		}
		if (collected.length) return collected;
	}

	return (
		(await fetchRepoPage(
			"https://api.github.com/users/nafissmf/repos?per_page=100&sort=updated",
			headers
		)) || []
	);
}

export async function GET() {
	const headers = githubHeaders();
	const repos = await fetchRepos(headers);
	const selected = repos
		.filter((repo) => !repo.fork && !repo.archived)
		.filter((repo) => !SKIP.has(repo.name))
		.filter((repo) => !/praktikum|alpro/i.test(repo.name));
	const projects = await Promise.all(
		selected.map(async (repo) => {
			const isPrivate = Boolean(repo.private);
			return {
				title: titleFrom(repo.name),
				desc: [
					repo.description ||
						(isPrivate ? "Private project." : "Open-source project on GitHub."),
				],
				year: String(new Date(repo.created_at).getFullYear()),
				thumbnail: isPrivate
					? "/image/placeholder/blur.jpg"
					: `https://opengraph.githubassets.com/1/nafissmf/${repo.name}`,
				tech: await techFor(repo, headers),
				slug: repo.name,
				href: isPrivate ? "" : repo.html_url,
				code: isPrivate ? "" : repo.html_url,
				preview: repo.homepage || "",
				private: isPrivate,
				category: categoryFor(repo.language),
			};
		})
	);

	return Response.json({ projects });
}
