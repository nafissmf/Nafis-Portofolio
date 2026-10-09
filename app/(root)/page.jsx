// Copyright (C) 2025 Nafis Mufadhal
// This file is part of Alvalens-porto-2-nextJs.
// Licensed under the GNU GPL v3.0. See LICENSE for details.

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FullPageWrapper, Section, useFullPage } from "@alvalens/react-fullpage-snap";

// components
import Button from "@/components/Button";
import HomeLife from "@/components/HomeLife";
import Me from "@/public/image/nafis2.jpeg";
import MeAbout from "@/public/image/nafis6.jpeg";
import Setup from "@/public/image/nafis4.jpeg";
import ProjectAll from "@/public/image/projects-collage.jpg";
import Hr from "@/components/Hr";
// icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function ScrollIndicator() {
	const { activeIndex } = useFullPage();
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		if (activeIndex !== 0) setDismissed(true);
	}, [activeIndex]);

	useEffect(() => {
		document.body.classList.toggle("home-section", activeIndex === 0);
		return () => document.body.classList.remove("home-section");
	}, [activeIndex]);

	return (
		<AnimatePresence>
			{activeIndex === 0 && !dismissed && (
				<motion.div
					className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, transition: { duration: 0.6, delay: 1.2 } }}
					exit={{ opacity: 0, transition: { duration: 0.4 } }}>
					<span className="text-[10px] uppercase tracking-[4px] text-teal font-medium">
						Scroll
					</span>
					<motion.div
						className="w-[1.5px] h-14 bg-amber origin-top"
						animate={{
							scaleY: [0, 1, 1],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
							times: [0, 0.5, 1],
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

const MyPage = () => {
	return (
		<FullPageWrapper>
			<Section>
				<HomeLife />
				<div className="home-stage relative z-10 mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-3 px-5 pb-14 pt-20 md:w-[82%] md:grid-cols-3 md:gap-4 md:p-10">
					<motion.div
						className="col-span-2 flex flex-col justify-center items-center md:items-start text-center md:text-start"
						initial={{ x: -100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
						}}>
						<div className="block md:hidden col-span-1 mx-auto my-1">
							<div className="relative mx-auto h-52 w-40 sm:h-60 sm:w-48">
								<div
									aria-hidden
									className="absolute -inset-3 translate-x-2 translate-y-2 rounded-[1.75rem] bg-gradient-to-br from-teal/35 to-amber/30"
								/>
								<div className="relative h-full w-full overflow-hidden rounded-[1.75rem] photo-frame">
									<Image
										src={Me}
										width={500}
										height={650}
										className="h-full w-full object-cover object-[center_15%]"
										alt="Nafis Mufadhal"
										placeholder="blur"
									/>
								</div>
							</div>
						</div>
						<motion.h3
							className="uppercase mb-2 text-sm font-normal tracking-[0.28rem] text-teal sm:text-xl sm:tracking-[.5rem] md:mb-3"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Nafis Mufadhal
						</motion.h3>
						<motion.h1
							className="text-ink text-3xl sm:text-4xl md:text-6xl lg:text-6xl 2xl:text-8xl font-bold my-1 md:my-5 leading-[1.05]"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Full Stack Developer
						</motion.h1>
						<motion.p
							className="title mt-3 text-sm leading-relaxed tracking-wide text-ink-muted sm:text-base md:mt-4 md:text-md md:leading-[1.7rem] md:tracking-wider 2xl:text-xl"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.4,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Hi! I&rsquo;m Nafis Mufadhal — a Master&apos;s
							student in Information Systems at Universitas
							Diponegoro, focused on IT infrastructure, full stack
							development, and data analysis. I build and maintain
							systems that keep campus operations running, and I
							keep growing through cloud, research, and leadership
							work.
						</motion.p>
						<motion.div
							className="buttons mt-5 flex flex-row flex-wrap items-center justify-center gap-3 md:mt-10"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.5,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Button variation="primary">
								<a
									href="/docs/CV_Nafis%20Mufadhal.pdf"
									download="CV_Nafis Mufadhal.pdf">
									Download CV
								</a>
							</Button>
							<Button variation="secondary">
								<a href="#contact">Contact Me</a>
							</Button>
						</motion.div>
					</motion.div>
					<motion.div
						className="hidden md:flex col-span-1 mx-auto justify-center items-center"
						initial={{ x: 100, opacity: 0 }}
						whileInView={{ x: 0, opacity: 1 }}
						transition={{
							delay: 0.7,
							duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
						}}>
						<div className="relative aspect-[3/4] w-[min(32vw,420px,50vh)]">
							<div
								aria-hidden
								className="absolute -inset-4 translate-x-3 translate-y-3 rounded-[2rem] bg-gradient-to-br from-teal/40 via-teal/15 to-amber/35"
							/>
							<div
								aria-hidden
								className="glow-float absolute -left-6 top-10 h-24 w-24 rounded-full bg-amber/30 blur-2xl"
							/>
							<div
								aria-hidden
								className="glow-float absolute -right-3 bottom-10 h-20 w-20 rounded-full bg-teal/30 blur-2xl"
								style={{ animationDelay: "-3.5s" }}
							/>
							<div className="relative h-full w-full overflow-hidden rounded-[2rem] photo-frame">
								<Image
									src={Me}
									width={520}
									height={700}
									placeholder="blur"
									alt="Nafis Mufadhal"
									className="h-full w-full object-cover object-[center_12%]"
									priority
								/>
							</div>
						</div>
					</motion.div>
				</div>
			</Section>
			<Section>
				<HomeLife />
				<div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 pb-8 pt-16 md:block md:h-screen md:px-0 md:pb-0 md:pt-0">
					<div className="slide-photo z-0 w-[min(72vw,16rem)] md:absolute md:top-1/2 md:right-[10%] md:w-[min(30vw,420px)] md:-translate-y-1/2">
						<motion.div
							className="relative h-44 w-full overflow-hidden rounded-sm bg-teal-soft photo-frame sm:h-52 md:h-[min(60vh,640px)] md:w-full"
							initial={{
								x: 40,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Image
								src={MeAbout}
								fill
								sizes="(max-width: 768px) 80vw, 30vw"
								className="object-cover"
								alt="Nafis Mufadhal"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="slide-copy z-10 flex w-full max-w-md flex-col items-center text-center md:absolute md:left-[10%] md:top-1/3 md:w-auto md:max-w-[46%] md:items-start md:px-10 md:py-5 md:text-start">
						<motion.h1
							className="text-ink text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							About Me
						</motion.h1>
						<Hr />
						<motion.p
							className="title mb-5 mt-3 text-base leading-relaxed tracking-wide text-ink-muted sm:text-lg md:mt-4 md:text-xl md:leading-[1.7rem] md:tracking-wider"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							A brief introduction my journey as a software
							engineer.
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Button variation="primary">
								<Link href="/about">Learn More</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</Section>
			<Section>
				<HomeLife />
				<div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 pb-8 pt-16 md:block md:h-screen md:px-0 md:pb-0 md:pt-0">
					<div className="slide-photo z-0 w-[min(78vw,20rem)] md:absolute md:top-1/2 md:right-[8%] md:w-[min(36vw,480px)] md:-translate-y-1/2">
						<motion.div
							className="photo-frame relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-teal-soft"
							initial={{
								x: 40,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Image
								src={ProjectAll}
								fill
								sizes="(max-width: 768px) 80vw, 36vw"
								className="object-cover"
								alt="Collage of selected web projects"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="slide-copy z-10 flex w-full max-w-md flex-col items-center text-center md:absolute md:left-[10%] md:top-1/3 md:w-auto md:max-w-[46%] md:items-start md:px-10 md:py-5 md:text-start">
						<motion.h1
							className="text-ink text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							My Projects
						</motion.h1>
						<Hr />
						<motion.p
							className="title mb-5 mt-3 text-base leading-relaxed tracking-wide text-ink-muted sm:text-lg md:mt-4 md:text-xl md:leading-[1.7rem] md:tracking-wider"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Selected works that I&apos;ve built over the years.
							<span className="bg-transparent md:bg-teal-soft/60 xl:bg-transparent text-teal-dark">
								{" "}
								and currently working on.
							</span>
						</motion.p>
						<motion.div
							initial={{ y: 40, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Button variation="primary">
								<Link href="/projects">Learn More</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</Section>
			<Section>
				<HomeLife />
				<div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden px-6 pb-8 pt-16 md:block md:h-screen md:px-0 md:pb-0 md:pt-0">
					<div className="slide-photo z-0 w-[min(72vw,16rem)] md:absolute md:top-1/2 md:right-[10%] md:w-[min(30vw,420px)] md:-translate-y-1/2">
						<motion.div
							className="relative h-44 w-full overflow-hidden rounded-sm bg-teal-soft photo-frame sm:h-52 md:h-[min(60vh,640px)] md:w-full"
							initial={{
								x: 40,
								opacity: 0,
								z: -100,
							}}
							whileInView={{
								x: 0,
								opacity: 1,
								z: 0,
							}}
							transition={{
								delay: 0.5,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<Image
								src={Setup}
								fill
								sizes="(max-width: 768px) 80vw, 30vw"
								className="object-cover"
								alt="Nafis Mufadhal Setup"
								placeholder="blur"
							/>
						</motion.div>
					</div>
					<div className="slide-copy z-10 flex w-full max-w-md flex-col items-center text-center md:absolute md:left-[10%] md:top-1/3 md:w-auto md:max-w-[46%] md:items-start md:px-10 md:py-5 md:text-start">
						<motion.h1
							className="mb-3 text-ink text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.1,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Get In Touch
						</motion.h1>
						<Hr />
						<motion.p
							className="title mt-3 text-base leading-relaxed tracking-wide text-ink-muted sm:text-lg md:mb-5 md:mt-4 md:text-xl md:leading-[1.7rem] md:tracking-wider"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							Feel free to contact me if you have any{" "}
							<span className="bg-transparent md:bg-teal-soft/60 xl:bg-transparent text-teal-dark">
								questions or just want to say hi.
							</span>
						</motion.p>
						<motion.p
							className="title mb-5 mt-3 break-all text-base leading-relaxed tracking-wide text-teal sm:break-normal sm:text-lg md:mt-4 md:text-xl md:leading-[1.7rem] md:tracking-wider"
							initial={{ x: -100, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							transition={{
								delay: 0.3,
								duration: 0.9,
								ease: [0.22, 1, 0.36, 1],
							}}>
							<a
								href="https://www.linkedin.com/in/nafissmf"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-amber-deep transition-colors">
								linkedin.com/in/nafissmf
							</a>
						</motion.p>
						{/* icons */}
						<div className="flex justify-center items-center space-x-4">
							<motion.a
								href="https://github.com/nafissmf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub profile"
								className="flex justify-center items-center bg-teal w-14 h-14 rounded-full text-white hover:bg-amber hover:text-ink transition-all ease-in-out duration-300"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									y: { delay: 0.2 },
									opacity: { delay: 0.3 },
								}}>
								<FontAwesomeIcon
									icon={faGithub}
									className="text-3xl"
								/>
							</motion.a>
							<motion.a
								href="https://www.linkedin.com/in/nafissmf"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="LinkedIn profile"
								className="flex justify-center items-center bg-teal w-14 h-14 rounded-full text-white hover:bg-amber hover:text-ink transition-all ease-in-out duration-300"
								initial={{ opacity: 0, y: 40 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									y: { delay: 0.4 },
									opacity: { delay: 0.5 },
								}}>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="text-3xl"
								/>
							</motion.a>
						</div>
					</div>
				</div>
			</Section>
			<ScrollIndicator />
		</FullPageWrapper>
	);
};

export default MyPage;
