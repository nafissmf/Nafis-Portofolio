"use client";

import { useEffect, useRef, useState } from "react";

const BITS = [
	{ x: "-78px", y: "-36px", color: "#f0a202", size: 12 },
	{ x: "72px", y: "-28px", color: "#fff6e8", size: 9 },
	{ x: "-36px", y: "64px", color: "#0f766e", size: 11 },
	{ x: "58px", y: "52px", color: "#d97706", size: 12 },
	{ x: "6px", y: "-80px", color: "#f0a202", size: 8 },
	{ x: "-86px", y: "14px", color: "#fffdf8", size: 10 },
	{ x: "88px", y: "6px", color: "#0f766e", size: 8 },
	{ x: "-8px", y: "4px", color: "#fff6e8", size: 18 },
	{ x: "28px", y: "-22px", color: "#f0a202", size: 7 },
	{ x: "-48px", y: "-22px", color: "#d97706", size: 10 },
	{ x: "18px", y: "36px", color: "#fffdf8", size: 8 },
	{ x: "-18px", y: "-54px", color: "#0f766e", size: 7 },
];

function hitsPhoto(rocketBox, photoBox) {
	const width = Math.min(rocketBox.right, photoBox.right) - Math.max(rocketBox.left, photoBox.left);
	const height = Math.min(rocketBox.bottom, photoBox.bottom) - Math.max(rocketBox.top, photoBox.top);
	return width > 56 && height > 40;
}

export default function FlyingRocket() {
	const flightRef = useRef(null);
	const rocketRef = useRef(null);
	const hitRef = useRef(false);
	const [hit, setHit] = useState(false);

	useEffect(() => {
		const flight = flightRef.current;
		if (!flight) return undefined;

		const hideOnHome = () => {
			const path = window.location.pathname;
			const nearTop = window.scrollY < window.innerHeight * 0.8;
			const onHome = path === "/" && window.scrollY < window.innerHeight * 0.55;
			const onAboutHero = path.startsWith("/about") && nearTop;
			flight.style.visibility = onHome || onAboutHero ? "hidden" : "";
		};

		hideOnHome();
		window.addEventListener("scroll", hideOnHome, { passive: true });
		window.addEventListener("hashchange", hideOnHome);
		window.addEventListener("popstate", hideOnHome);
		const timer = window.setInterval(hideOnHome, 400);
		return () => {
			window.removeEventListener("scroll", hideOnHome);
			window.removeEventListener("hashchange", hideOnHome);
			window.removeEventListener("popstate", hideOnHome);
			window.clearInterval(timer);
			flight.style.visibility = "";
		};
	}, []);

	useEffect(() => {
		const rocket = rocketRef.current;
		if (!rocket) return;

		let frame = 0;
		let resetTimer = 0;

		const relaunch = () => {
			rocket.style.animation = "none";
			void rocket.offsetWidth;
			rocket.style.animation = "";
			hitRef.current = false;
			setHit(false);
		};

		const tick = () => {
			if (!hitRef.current) {
				const box = rocket.getBoundingClientRect();
				if (box.width > 0 && box.height > 0) {
					const photos = document.querySelectorAll(".photo-frame");
					for (const photo of photos) {
						const photoBox = photo.getBoundingClientRect();
						if (photoBox.width < 40 || photoBox.height < 40) continue;
						if (!hitsPhoto(box, photoBox)) continue;
						hitRef.current = true;
						setHit(true);
						resetTimer = window.setTimeout(relaunch, 900);
						break;
					}
				}
			}
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(resetTimer);
		};
	}, []);

	return (
		<div className="rocket-flight" ref={flightRef} aria-hidden="true">
			<div ref={rocketRef} className={`rocket${hit ? " is-hit" : ""}`}>
				<svg className="rocket-body" viewBox="0 0 148 72" width="148" height="72">
					<g className="rocket-flame">
						<ellipse cx="16" cy="38" rx="14" ry="7" fill="#f0a202" />
						<ellipse cx="10" cy="38" rx="8" ry="4" fill="#fff6e8" />
					</g>
					<ellipse cx="6" cy="38" rx="3.5" ry="2.2" fill="rgba(255, 246, 232, 0.85)" />
					<path d="M46 24 L24 8 L46 30 Z" fill="#0b5a54" />
					<path d="M46 52 L24 68 L46 46 Z" fill="#0b5a54" />
					<path d="M40 26 C72 16 104 20 118 32 L128 38 L118 44 C104 56 72 60 40 50 Z" fill="#0f766e" />
					<path
						d="M52 30 C78 24 104 28 116 35"
						fill="none"
						stroke="rgba(255, 253, 248, 0.55)"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>
					<circle cx="86" cy="38" r="8" fill="#fff6e8" stroke="#f0a202" strokeWidth="2.5" />
					<circle cx="88" cy="37" r="2.5" fill="#0f766e" />
					<path d="M114 30 L140 38 L114 46 Z" fill="#d97706" />
				</svg>
				{hit && (
					<div className="rocket-boom">
						{BITS.map((bit) => (
							<i
								key={`${bit.x}-${bit.y}`}
								style={{
									"--x": bit.x,
									"--y": bit.y,
									width: bit.size,
									height: bit.size,
									background: bit.color,
								}}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
