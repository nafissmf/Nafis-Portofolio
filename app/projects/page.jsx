"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import Image from "next/image";

// images
import Ubikar from "@/public/image/projects/highlight/ubikar.jpg";
import Paud from "@/public/image/projects/highlight/paud.jpg";
import SikAmpel from "@/public/image/projects/highlight/sik-ampel.png";
import ProjectAll from "@/public/image/projects-collage.jpg";

import Hr from "@/components/Hr";
import ProjectCard from "./components/ProjectCard";
import FixedButon from "@/components/FixedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const category = {
	1: "Web Development",
	2: "AI & Machine Learning",
	9: "Other",
};

export default function Page() {
	const [activeCategory, setActiveCategory] = useState(1);
	const [projects, setProjects] = useState([]);
	const [projectsReady, setProjectsReady] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		let ignore = false;
		fetch("/api/github-projects")
			.then((response) => response.json())
			.then((data) => {
				if (!ignore) setProjects(data.projects || []);
			})
			.catch(() => {
				if (!ignore) setProjects([]);
			})
			.finally(() => {
				if (!ignore) setProjectsReady(true);
			});
		return () => {
			ignore = true;
		};
	}, []);
	return (
		<>
			<main className="overflow-hidden">
				<FixedButon href="/#projects">
					<FontAwesomeIcon icon={faChevronLeft} className="text-teal-dark pr-10" />
				</FixedButon>
				<div className="relative h-screen w-screen  gap-4 p-10 flex justify-center items-center flex-col mb-10 overflow-hidden">
					<div className="z-0 mx-auto mb-48 w-[min(78vw,20rem)] md:absolute md:right-[8%] md:top-1/2 md:mx-0 md:mb-0 md:w-[min(36vw,480px)] md:-translate-y-1/2">
						<motion.div
							initial={{ opacity: 0, x: 48 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
							className="photo-frame relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-teal-soft">
							<Image
								src={ProjectAll}
								alt="Collage of selected web projects"
								fill
								placeholder="blur"
								className="object-cover"
								sizes="(max-width: 768px) 78vw, 36vw"
							/>
						</motion.div>
					</div>
					<div className="z-10 w-full absolute md:w-auto md:left-[10%] top-[60%] md:top-1/3 col-span-2 flex flex-col justify-center items-start md:items-start text-start px-10 pt-4 backdrop-filter backdrop-blur-sm md:backdrop-blur-none md:backdrop-filter-none bg-surface/70 md:bg-transparent md:pt-0">
						<h1 className="md:bg-surface/80 bg-transparent lg:bg-transparent md-px-0 text-ink text-5xl md:text-8xl font-bold">
							My Projects
						</h1>
						<Hr />
						<p className="title text-xl mt-4 tracking-wider text-ink-muted leading-[1.7rem] mb-5">
							List of my projects that I have done and{" "}
							<span className="bg-transparent md:bg-teal-soft/70 xl:bg-transparent text-teal-dark font-medium">
								{" "}
								currently working on.
							</span>
						</p>
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "circOut" }}
							onClick={() => {
								window.scrollTo({
									top: 1000,
									behavior: "smooth",
								});
							}}
							className="mb-3">
							<Button variation="primary">Scroll Down</Button>
						</motion.div>
					</div>
				</div>
				<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
					<div className="flex justify-center items-center flex-col my-5 self-start ">
						<Hr variant="long"></Hr>
						<h1 className="text-3xl font-bold mt-3">Hightlight</h1>
					</div>
				</div>
				<div className="relative w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
					<div className="flex justify-center items-start flex-col mb-5 ">
						<div className="images relative w-full  aspect-square">
							<div className="absolute top-28 left-10 h-[40%]  aspect-video photo-frame overflow-hidden transition-all ease duration-300 hover:scale-150 z-10">
								<motion.div
									initial={{ opacity: 0, scale: 0.5, x: 100 }}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									className="relative w-full h-full shadow-lg">
									<Image
										src={Ubikar}
										alt="Portal digital BP UBIKAR Universitas Diponegoro"
										fill
										placeholder="blur"
										className="object-cover"
										sizes="50vw"
									/>
								</motion.div>
							</div>
							<div className="absolute top-10 right-28 h-[30%]  aspect-video photo-frame overflow-hidden transition-all ease duration-300 hover:scale-150">
								<motion.div
									initial={{
										opacity: 0,
										scale: 0.5,
										x: -100,
									}}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									transition={{ delay: 0.3 }}
									className="relative w-full h-full shadow-lg ">
									<Image
										src={Paud}
										alt="Website PAUD Permata UNDIP"
										fill
										placeholder="blur"
										className="object-cover"
										sizes="40vw"
									/>
								</motion.div>
							</div>
							<div className="absolute bottom-10 md:bottom-26 right-20 h-[35%]  aspect-video photo-frame overflow-hidden transition-all ease duration-300 hover:scale-150">
								<motion.div
									initial={{
										opacity: 0,
										scale: 0.5,
										x: -100,
									}}
									whileInView={{
										opacity: 1,
										scale: 1,
										x: 0,
									}}
									transition={{
										delay: 0.5,
									}}
									className="relative w-full h-full shadow-lg">
									<Image
										src={SikAmpel}
										alt="Dashboard SIK Ampel"
										fill
										placeholder="blur"
										className="object-cover"
										sizes="40vw"
									/>
								</motion.div>
							</div>
						</div>
					</div>
					<motion.div
						className="flex justify-center items-start flex-col mb-5 md:px-10"
						initial={{
							opacity: 0,
							x: 200,
						}}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						transition={{
							delay: 0.5,
							type: "spring",
						}}>
						<h2 className="text-2xl font-bold tracking-wider mb-3">
							PAUD Permata UNDIP
						</h2>
						<p className="text-gray-600 text-justify title text-lg">
							Website and enrollment portal for PAUD Permata UNDIP. Families
							can learn about the KB, TK, and childcare programs, then register
							online for the 2026/2027 academic year: create an account, submit
							the child&apos;s biodata, pay via QRIS, and complete the parent
							questionnaire before the interview.
						</p>{" "}
						<div className="mt-3">
							<Button variation="primary">
								<Link href="projects/paud-permata">More</Link>
							</Button>
							<Button variation="secondary">
								<a
									href="https://paudpermata.undip.id/"
									target="_blank"
									rel="noopener noreferrer">
									Preview
								</a>
							</Button>
						</div>
					</motion.div>
				</div>
				<div className="mt-16 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
					<div className="flex justify-center items-center flex-col my-5 self-start">
						<Hr variant="long"></Hr>
						<motion.h1
							className="text-3xl font-bold mt-3"
							initial={{
								opacity: 0,
								x: -200,
							}}
							whileInView={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								delay: 0.7,
								type: "spring",
							}}>
							Other Note Worthy Projects
						</motion.h1>
					</div>
				</div>

				{/* choose category */}
				<motion.div
					initial={{
						opacity: 0,
						x: 200,
					}}
					whileInView={{
						opacity: 1,
						x: 0,
					}}
					transition={{
						type: "spring",
					}}
					className="flex flex-row justify-center items-start flex-wrap gap-3 md:gap-5 my-5 ">
					{Object.keys(category).map((key, index) => (
						<button
							key={index}
							className={`px-2 md:px-4 py-2 rounded-lg cursor-pointer transition-all ease duration-300 focus:bg-gray-300 focus:text-black focus:ring focus:ring-slate-500 ${
								activeCategory === key
									? "bg-teal-soft text-teal-dark hover:bg-teal hover:text-white"
									: "bg-teal text-white hover:bg-amber hover:text-ink"
							}`}
							onClick={() => setActiveCategory(key)}>
							{category[key]}
						</button>
					))}
				</motion.div>

				{/* projects */}
				<div className="w-screen mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10 cursor-pointer">
					{projectsReady && projects.length === 0 && (
						<p className="text-ink-muted">No GitHub projects to show yet.</p>
					)}
					{projects.map((project) => (
						<ProjectCard
							project={project}
							key={project.slug}
							index={0}
							activeCategory={activeCategory}
						/>
					))}
				</div>

				{/* view in archive btn */}
				<motion.div
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
					}}
					className="flex justify-center items-center flex-col my-5 self-start ">
					<Button variation="primary">
						<Link href="projects/archive">View In Archive</Link>
					</Button>
				</motion.div>
			</main>
		</>
	);
}
