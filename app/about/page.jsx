"use client";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";
import FixedButton from "@/components/FixedButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Quote from "./components/quote/quote.jsx";
import Skills from "./components/skills/skills.jsx";
import Experience from "./components/experience.jsx";
import Education from "./components/education.jsx";

// images
import Hero from "@/public/image/nafis1.jpeg";

import Hr from "@/components/Hr";
import About from "./components/about/about.jsx";

const ease = [0.22, 1, 0.36, 1];

export default function Page() {
	const reduce = useReducedMotion();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<main className="overflow-hidden">
				<FixedButton href="/#about">
					<FontAwesomeIcon
						icon={faChevronLeft}
						className="text-teal-dark pr-10"
					/>
				</FixedButton>
				<div className="relative mb-10 flex min-h-[100dvh] items-center overflow-hidden px-5 pb-16 pt-24 md:px-10">
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_40%,rgba(15,118,110,0.14),transparent_46%),radial-gradient(ellipse_at_12%_80%,rgba(240,162,2,0.16),transparent_42%)]" />
					<div className="relative z-10 mx-auto w-full max-w-5xl">
						<motion.div
							className="relative ml-auto aspect-[3/4] w-[min(78vw,18rem)] md:h-[min(calc(100dvh-14rem),520px)] md:w-auto"
							initial={reduce ? false : { opacity: 0, x: 96 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.95, ease }}>
							<div
								aria-hidden
								className="absolute -bottom-4 -right-4 h-full w-full rounded-[2rem] bg-gradient-to-br from-teal/30 to-amber/35"
							/>
							<div className="photo-frame relative h-full w-full overflow-hidden rounded-[2rem]">
								<Image
									src={Hero}
									alt="Nafis Mufadhal"
									fill
									priority
									sizes="(max-width: 768px) 78vw, 28rem"
									className="object-cover object-[center_46%]"
									placeholder="blur"
								/>
							</div>
						</motion.div>
						<div className="relative z-10 -mt-16 w-[min(92vw,20rem)] md:absolute md:left-0 md:top-1/2 md:mt-0 md:w-[62%] md:-translate-y-1/2">
							<motion.div
								className="rounded-[1.75rem] border border-white/80 bg-[#fffdf8]/92 p-6 shadow-[0_18px_50px_rgba(16,42,45,0.12)] backdrop-blur-md sm:p-8 md:p-10"
								initial={reduce ? false : { opacity: 0, x: -72 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.18, duration: 0.9, ease }}>
								<motion.h1
									className="text-5xl font-bold leading-[1.02] text-ink sm:text-6xl lg:text-7xl"
									initial={reduce ? false : { opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.38, duration: 0.6, ease }}>
									About <span className="text-teal">Me</span>
								</motion.h1>
								<Hr />
								<motion.p
									className="title mb-7 mt-4 text-lg leading-relaxed tracking-wide text-ink-muted"
									initial={reduce ? false : { opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5, duration: 0.6, ease }}>
									A brief introduction to my journey as a{" "}
									<span className="font-medium text-teal-dark">software engineer.</span>
								</motion.p>
								<motion.div
									initial={reduce ? false : { opacity: 0, y: 14 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.62, duration: 0.55, ease }}
									onClick={() => {
										window.scrollTo({
											top: window.innerHeight * 0.92,
											behavior: "smooth",
										});
									}}>
									<Button variation="primary">Scroll Down</Button>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
				{/* end hero */}

				{/* about */}
				<About />
				{/* end about */}

				{/* skills */}
				<Skills />
				{/* end skills */}

				{/* experience */}
				<Experience />
				{/* end experience */}

				{/* Education */}
				<Education />
				{/* end Education */}

				{/* Quote */}
				<Quote />
				{/* end Quote */}
			</main>
		</>
	);
}
