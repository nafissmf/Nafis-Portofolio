"use client";

import { useEffect, useRef } from "react";

const LIGHTS = [
	{ left: "8%", top: "14%", size: 5, color: "#f0a202", delay: "0s", duration: "3.6s", drift: "12px" },
	{ left: "18%", top: "32%", size: 4, color: "#0f766e", delay: "-1.2s", duration: "4.4s", drift: "-10px" },
	{ left: "27%", top: "12%", size: 7, color: "#f0a202", delay: "-2.4s", duration: "5s", drift: "16px" },
	{ left: "36%", top: "48%", size: 4, color: "#fff6e8", delay: "-0.6s", duration: "3.2s", drift: "8px" },
	{ left: "44%", top: "22%", size: 6, color: "#0f766e", delay: "-3s", duration: "4.8s", drift: "-14px" },
	{ left: "53%", top: "64%", size: 5, color: "#f0a202", delay: "-1.8s", duration: "3.8s", drift: "11px" },
	{ left: "61%", top: "16%", size: 4, color: "#d97706", delay: "-2.8s", duration: "4.2s", drift: "-8px" },
	{ left: "69%", top: "40%", size: 7, color: "#f0a202", delay: "-0.4s", duration: "5.2s", drift: "14px" },
	{ left: "76%", top: "24%", size: 4, color: "#0f766e", delay: "-3.4s", duration: "3.4s", drift: "9px" },
	{ left: "84%", top: "58%", size: 6, color: "#f0a202", delay: "-1.6s", duration: "4.6s", drift: "-12px" },
	{ left: "91%", top: "18%", size: 5, color: "#fff6e8", delay: "-2.2s", duration: "3.9s", drift: "10px" },
	{ left: "14%", top: "72%", size: 6, color: "#d97706", delay: "-4s", duration: "4.7s", drift: "-9px" },
	{ left: "48%", top: "78%", size: 4, color: "#0f766e", delay: "-2.6s", duration: "3.5s", drift: "13px" },
	{ left: "72%", top: "76%", size: 5, color: "#f0a202", delay: "-0.8s", duration: "5.1s", drift: "-11px" },
	{ left: "22%", top: "56%", size: 11, color: "rgba(240, 162, 2, 0.85)", delay: "-1s", duration: "6.4s", drift: "18px" },
	{ left: "58%", top: "34%", size: 13, color: "rgba(15, 118, 110, 0.75)", delay: "-3.2s", duration: "7s", drift: "-16px" },
	{ left: "86%", top: "42%", size: 10, color: "rgba(240, 162, 2, 0.8)", delay: "-4.5s", duration: "6s", drift: "12px" },
];

const STREAKS = [
	{ top: "20%", left: "8%", delay: "0s", duration: "11s" },
	{ top: "46%", left: "30%", delay: "-4s", duration: "13s" },
	{ top: "68%", left: "55%", delay: "-8s", duration: "12s" },
];

const BIRDS = [
	{ top: "11%", duration: "28s", delay: "-6s", scale: 0.7, bob: "-18px" },
	{ top: "23%", duration: "36s", delay: "-20s", scale: 1, bob: "22px" },
	{ top: "38%", duration: "24s", delay: "-12s", scale: 0.55, bob: "-12px", reverse: true },
	{ top: "57%", duration: "32s", delay: "-26s", scale: 0.85, bob: "16px" },
	{ top: "18%", duration: "40s", delay: "-33s", scale: 0.45, bob: "10px", reverse: true },
];

const CLOUDS = [
	{ top: "4%", scale: 1.25, duration: "58s", delay: "-18s", tint: "cream", rest: "8%" },
	{ top: "16%", scale: 0.7, duration: "86s", delay: "-52s", tint: "teal", rest: "62%" },
	{ top: "28%", scale: 1.45, duration: "46s", delay: "-8s", tint: "warm", rest: "28%" },
	{ top: "44%", scale: 0.85, duration: "72s", delay: "-40s", tint: "cream", rest: "74%", reverse: true },
	{ top: "60%", scale: 1.15, duration: "64s", delay: "-28s", tint: "teal", rest: "18%" },
	{ top: "76%", scale: 1.6, duration: "90s", delay: "-60s", tint: "warm", rest: "48%" },
	{ top: "10%", scale: 0.5, duration: "100s", delay: "-74s", tint: "cream", rest: "40%" },
	{ top: "52%", scale: 0.62, duration: "54s", delay: "-14s", tint: "amber", rest: "82%", reverse: true },
];

export default function AmbientBackground() {
	const layerRef = useRef(null);

	useEffect(() => {
		const layer = layerRef.current;
		if (!layer) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		let frame = 0;
		let current = window.scrollY || 0;
		let running = false;

		const tick = () => {
			const target = window.scrollY || 0;
			current += (target - current) * 0.14;
			if (Math.abs(target - current) < 0.4) {
				current = target;
				running = false;
			}
			layer.style.transform = `translate3d(0, ${(-current * 0.045).toFixed(2)}px, 0)`;
			if (running) frame = requestAnimationFrame(tick);
		};

		const onScroll = () => {
			if (running) return;
			running = true;
			frame = requestAnimationFrame(tick);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div ref={layerRef} className="ambient" aria-hidden="true">
			<div className="ambient-haze" />
			{LIGHTS.map((light) => (
				<span
					key={`${light.left}-${light.top}`}
					className="ember"
					style={{
						left: light.left,
						top: light.top,
						width: light.size,
						height: light.size,
						background: light.color,
						color: light.color,
						animationDelay: light.delay,
						animationDuration: light.duration,
						"--drift": light.drift,
					}}
				/>
			))}
			{STREAKS.map((streak) => (
				<span
					key={streak.top}
					className="streak"
					style={{
						top: streak.top,
						left: streak.left,
						animationDelay: streak.delay,
						animationDuration: streak.duration,
					}}
				/>
			))}
			{BIRDS.map((bird) => (
				<svg
					key={`${bird.top}-${bird.delay}`}
					className={`bird${bird.reverse ? " bird--reverse" : ""}`}
					viewBox="0 0 64 28"
					width={72}
					height={32}
					style={{
						"--top": bird.top,
						"--dur": bird.duration,
						"--delay": bird.delay,
						"--scale": bird.scale,
						"--bob": bird.bob,
					}}>
					<g className="bird-wing bird-wing--left">
						<path d="M32 16 C22 16 12 8 2 4 C12 12 22 16 32 16" />
					</g>
					<g className="bird-wing bird-wing--right">
						<path d="M32 16 C42 16 52 8 62 4 C52 12 42 16 32 16" />
					</g>
				</svg>
			))}
			{CLOUDS.map((cloud) => (
				<div
					key={`${cloud.top}-${cloud.delay}`}
					className={`cloud cloud--${cloud.tint}${cloud.reverse ? " cloud--reverse" : ""}`}
					style={{
						"--top": cloud.top,
						"--scale": cloud.scale,
						"--dur": cloud.duration,
						"--delay": cloud.delay,
						"--rest": cloud.rest,
					}}>
					<div className="cloud-bob">
						<div className="cloud-shape">
							<i />
							<i />
							<i />
							<i />
							<i />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
