"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navVariant = {
	open: {
		clipPath: "circle(2000px at calc(100% - 40px) 40px)",
		transition: {
			type: "tween",
			duration: 0.55,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	closed: {
		clipPath: "circle(0px at calc(100% - 40px) 40px)",
		transition: {
			delay: 0.25,
			type: "tween",
			duration: 0.35,
			ease: [0.4, 0, 1, 1],
		},
	},
};

const itemVariants = {
	open: (custom) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: custom,
			type: "tween",
			duration: 0.35,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
	closed: {
		opacity: 0,
		y: 28,
		transition: {
			type: "tween",
			duration: 0.2,
		},
	},
};

function MenuScene() {
	return (
		<div className="menu-scene" aria-hidden="true">
			<div className="menu-sun" />
			<div className="menu-cloud menu-cloud--a" />
			<div className="menu-cloud menu-cloud--b" />
			<div className="menu-cloud menu-cloud--c" />
			<div className="menu-cloud menu-cloud--d" />
			<svg className="menu-bird menu-bird--a" viewBox="0 0 64 28">
				<path d="M2 16c8-8 14-8 22 0" />
				<path d="M40 16c8-8 14-8 22 0" />
			</svg>
			<svg className="menu-bird menu-bird--b" viewBox="0 0 64 28">
				<path d="M2 16c8-8 14-8 22 0" />
				<path d="M40 16c8-8 14-8 22 0" />
			</svg>
			<svg className="menu-bird menu-bird--c" viewBox="0 0 64 28">
				<path d="M2 16c8-8 14-8 22 0" />
				<path d="M40 16c8-8 14-8 22 0" />
			</svg>
			<svg className="menu-bird menu-bird--d" viewBox="0 0 64 28">
				<path d="M2 16c8-8 14-8 22 0" />
				<path d="M40 16c8-8 14-8 22 0" />
			</svg>
			<svg className="menu-bird menu-bird--e" viewBox="0 0 64 28">
				<path d="M2 16c8-8 14-8 22 0" />
				<path d="M40 16c8-8 14-8 22 0" />
			</svg>
			<span className="menu-spark menu-spark--a" />
			<span className="menu-spark menu-spark--b" />
			<span className="menu-spark menu-spark--c" />
			<span className="menu-spark menu-spark--d" />
			<svg className="menu-mountains" viewBox="0 0 1440 360" preserveAspectRatio="none">
				<path fill="#1a8f84" d="M0 230 160 150 300 210 470 90 640 190 820 60 1010 180 1180 110 1440 200 1440 360 0 360Z" />
				<path fill="#0e6d66" d="M0 270 150 190 310 250 480 160 660 240 840 150 1040 230 1220 170 1440 240 1440 360 0 360Z" />
				<path fill="#084e4a" d="M0 300 180 230 340 280 520 210 700 290 900 220 1100 280 1280 230 1440 290 1440 360 0 360Z" />
			</svg>
			<svg className="menu-palm menu-palm--left" viewBox="0 0 80 140">
				<path d="M38 140c6-30 4-70 8-110" />
				<path d="M46 36c-18-8-34 2-42 10 16 2 28 2 42-10Z" />
				<path d="M46 34c-8-20-2-36 8-44-2 16 0 28-8 44Z" />
				<path d="M48 36c16-12 34-8 46 2-18 4-32 4-46-2Z" />
				<path d="M46 40c8 10 22 16 36 14-14-8-26-12-36-14Z" />
			</svg>
			<svg className="menu-palm menu-palm--right" viewBox="0 0 80 140">
				<path d="M38 140c6-30 4-70 8-110" />
				<path d="M46 36c-18-8-34 2-42 10 16 2 28 2 42-10Z" />
				<path d="M46 34c-8-20-2-36 8-44-2 16 0 28-8 44Z" />
				<path d="M48 36c16-12 34-8 46 2-18 4-32 4-46-2Z" />
				<path d="M46 40c8 10 22 16 36 14-14-8-26-12-36-14Z" />
			</svg>
			<svg className="menu-sea" viewBox="0 0 1440 220" preserveAspectRatio="none">
				<path className="menu-wave menu-wave--back" fill="#0a6e78" d="M0 80c120 40 240-40 360 0s240 40 360 0 240-40 360 0 240 40 360 0v140H0Z" />
				<path className="menu-wave menu-wave--front" fill="#085862" d="M0 120c140 36 220-36 360 0s220 36 360 0 220-36 360 0 220 36 360 0v100H0Z" />
			</svg>
			<svg className="menu-whale" viewBox="0 0 120 48">
				<path d="M8 28c18-16 48-18 78-6 8 3 18 2 26-4-6 10-8 16-2 22-16 4-34 6-54 2-18-4-34-6-48-14Z" />
				<path d="M78 20c6-14 16-18 22-16-8 6-12 14-14 22" />
				<circle cx="28" cy="24" r="1.6" fill="#fff6e8" />
			</svg>
			<svg className="menu-fish menu-fish--a" viewBox="0 0 36 16">
				<ellipse cx="16" cy="8" rx="10" ry="5" />
				<path d="M26 8 36 2v12Z" />
			</svg>
			<svg className="menu-fish menu-fish--b" viewBox="0 0 36 16">
				<ellipse cx="16" cy="8" rx="10" ry="5" />
				<path d="M26 8 36 2v12Z" />
			</svg>
			<svg className="menu-fish menu-fish--c" viewBox="0 0 36 16">
				<ellipse cx="16" cy="8" rx="10" ry="5" />
				<path d="M26 8 36 2v12Z" />
			</svg>
			<svg className="menu-dolphin" viewBox="0 0 70 36">
				<path d="M4 24c10-14 24-16 40-8 6 3 12 2 18-2-4 8-6 12 0 16-12 2-24 2-36-2-8-2-16-2-22-4Z" />
				<path d="M34 16c2-8 8-12 12-10" />
			</svg>
			<svg className="menu-boat" viewBox="0 0 70 48">
				<path d="M8 32h54l-8 10H16Z" />
				<path d="M34 30V8" />
				<path d="M34 10 52 28H34Z" />
			</svg>
			<div className="menu-scrim" />
		</div>
	);
}

const menuLinks = [
	{ href: "/#home", label: "Home", index: "01" },
	{ href: "/about", label: "About", index: "02" },
	{ href: "/projects", label: "Projects", index: "03" },
	{ href: "/#contact", label: "Contact", index: "04" },
];

const NavItems = ({ isNavOpen, setIsNavOpen }) => {
	const handleItemClick = () => {
		setIsNavOpen(false);
	};

	return (
		<motion.div
			className="fixed z-[45] w-full h-screen flex items-center justify-center overflow-hidden"
			variants={navVariant}
			animate={isNavOpen ? "open" : "closed"}
			initial={false}
			aria-hidden={!isNavOpen}>
			<div className="relative flex min-h-[100vh] min-w-[100vw] flex-col items-center justify-center overflow-hidden bg-[#0b5a54]">
				<MenuScene />

				<div className="relative z-10 flex w-full max-w-3xl flex-col items-start px-10 md:px-16">
					<motion.p
						variants={itemVariants}
						animate={isNavOpen ? "open" : "closed"}
						custom={0.05}
						className="mb-6 text-xs font-medium uppercase tracking-[0.45rem] text-amber">
						Navigation
					</motion.p>

					<nav className="flex w-full flex-col gap-2 md:gap-3">
						{menuLinks.map((item, i) => (
							<Link key={item.href} href={item.href} onClick={handleItemClick}>
								<motion.div
									variants={itemVariants}
									animate={isNavOpen ? "open" : "closed"}
									custom={0.1 + i * 0.08}
									className="group flex items-baseline gap-5 border-b border-white/10 py-3 transition-colors duration-300 hover:border-amber/50 md:py-4">
									<span className="text-sm font-medium text-amber/80 transition-colors group-hover:text-amber">
										{item.index}
									</span>
									<span className="text-4xl font-bold tracking-tight text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber md:text-6xl lg:text-7xl">
										{item.label}
									</span>
								</motion.div>
							</Link>
						))}
					</nav>

					<motion.div
						variants={itemVariants}
						animate={isNavOpen ? "open" : "closed"}
						custom={0.48}
						className="mt-12 flex w-full flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
						<p className="tracking-wide">
							Nafis <span className="text-amber">Mufadhal</span>
						</p>
						<div className="flex gap-6">
							<a
								href="https://github.com/nafissmf"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-amber">
								GitHub
							</a>
							<a
								href="https://www.linkedin.com/in/nafissmf"
								target="_blank"
								rel="noopener noreferrer"
								className="transition-colors hover:text-amber">
								LinkedIn
							</a>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

const Navbar = () => {
	const navRef = useRef(null);
	const [isNavOpen, setIsNavOpen] = useState(false);

	useEffect(() => {
		document.body.classList.toggle("nav-open", isNavOpen);
		return () => document.body.classList.remove("nav-open");
	}, [isNavOpen]);

	const toggleNav = () => {
		setIsNavOpen(!isNavOpen);
	};

	return (
		<>
			<nav
				ref={navRef}
				className={`navbar px-5 md:px-24 w-screen fixed transition-colors ease duration-500 ${
					isNavOpen
						? "backdrop-filter backdrop-blur-md bg-teal-dark/80"
						: "backdrop-filter backdrop-blur-md bg-surface/40"
				} inset-0 flex flex-row justify-between items-center h-16 z-50 `}>
				<div>
					<h1
						className={`text-2xl ml-2 md:ml-0 font-semibold tracking-tight transition-colors ease duration-500 ${
							isNavOpen ? "text-white" : "text-teal-dark"
						}`}>
						Nafis{" "}
						<span className={isNavOpen ? "text-amber" : "text-amber-deep"}>
							Mufadhal
						</span>
					</h1>
				</div>
				<div className="flex flex-row items-center">
					<button
						aria-label={isNavOpen ? "Close menu" : "Open menu"}
						aria-expanded={isNavOpen}
						className="burger button flex flex-col justify-center items-center space-y-1.5 "
						onClick={toggleNav}>
						<div
							className={`w-10 h-1 bg-teal-dark rounded-full transition-all ease duration-300 ${
								isNavOpen ? "rotate-45 bg-white translate-y-[2px]" : ""
							}`}></div>
						<div
							className={`w-10 h-1 bg-teal-dark rounded-full transition-all ease duration-300 ${
								isNavOpen ? "-rotate-45 -translate-y-2 bg-white" : ""
							}`}></div>
					</button>
				</div>
			</nav>
			<NavItems isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
		</>
	);
};
export default Navbar;
