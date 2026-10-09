export default function PageLoader({ leaving = false }) {
	return (
		<div
			className={`page-loader${leaving ? " is-leaving" : ""}`}
			role="status"
			aria-live="polite">
			<div className="page-loader-sky" aria-hidden="true">
				<span className="page-loader-sun" />
				<span className="page-loader-cloud page-loader-cloud--a" />
				<span className="page-loader-cloud page-loader-cloud--b" />
				<svg className="page-loader-kite" viewBox="0 0 48 78">
					<path className="page-loader-kite-body" d="M24 4 42 26 24 44 6 26Z" />
					<path className="page-loader-kite-line" d="M24 4v40M6 26h36" />
					<path className="page-loader-kite-line" d="M24 44c6 8 2 14 8 18-8 1-6 8-2 12" />
				</svg>
				<svg className="page-loader-hills" viewBox="0 0 1440 180" preserveAspectRatio="none">
					<path fill="#b7e6dc" d="M0 90c120-40 220 20 360-10s220-50 340 0 240 40 380-10 220-30 360 10v100H0Z" />
					<path fill="#8fd4c8" d="M0 120c160-30 260 24 420 0s250-36 390 8 260 28 360-16 160-20 270 12v56H0Z" />
				</svg>
			</div>
			<div className="page-loader-card">
				<img src="/logo-nm.png?v=2" alt="" />
				<p>Nafis Mufadhal</p>
				<span>Opening the page</span>
				<i />
			</div>
		</div>
	);
}
