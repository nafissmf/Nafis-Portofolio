import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMedal,
	faGraduationCap,
	faTrophy,
	faAward,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Podium from "@/public/image/nafis-podium.jpg";
import Undip from "@/public/image/nafis-undip.jpg";
import Organisasi from "@/public/image/nafis-organisasi.jpg";

function Wrapper({ children }) {
	return (
		<div className="mx-auto container gap-10 p-10 grid grid-cols-1 my-10">
			<motion.div
				className="flex justify-center items-start flex-col mb-5"
				initial={{
					opacity: 0,
					y: 50,
				}}
				whileInView={{
					opacity: 1,
					y: 0,
				}}
				transition={{
					delay: 0.3,
					duration: 0.8,
					type: "spring",
					stiffness: 100,
				}}>
				{children}
			</motion.div>
		</div>
	);
}

export default function Education() {
	const [isExpanded, setIsExpanded] = useState(false);

	const achievementsByYear = {
		2025: [
			{
				icon: faGraduationCap,
				title: "Bachelor of Informatics",
				subtitle: "Universitas Diponegoro — thesis on Population App (ICONIX Process)",
				date: "2025",
				color: "from-teal-500 to-emerald-600",
			},
			{
				icon: faAward,
				title: "Master's Student",
				subtitle: "Information Systems — Universitas Diponegoro",
				date: "Present",
				color: "from-amber-500 to-orange-500",
			},
		],
		2024: [
			{
				icon: faTrophy,
				title: "Bangkit Academy 2024",
				subtitle: "Cloud Computing Cohort — Google Cloud training & RoDexApp capstone",
				date: "2024",
				color: "from-blue-500 to-cyan-600",
			},
			{
				icon: faMedal,
				title: "Chairperson",
				subtitle: "HMIF Undip (Informatics Student Association)",
				date: "2023–2024",
				color: "from-yellow-400 to-orange-500",
			},
			{
				icon: faAward,
				title: "Vice Chairperson I",
				subtitle: "Faculty Student Senate — FSM Undip",
				date: "2024–2025",
				color: "from-slate-400 to-slate-600",
			},
		],
	};

	// Flatten all achievements into a single array for easier limiting
	const allAchievements = Object.entries(achievementsByYear)
		.sort(([a], [b]) => parseInt(b) - parseInt(a))
		.flatMap(([year, achievements]) =>
			achievements.map((achievement) => ({ ...achievement, year }))
		);

	const visibleAchievements = isExpanded
		? allAchievements
		: allAchievements.slice(0, 6);
	const hasMoreAchievements = allAchievements.length > 6;

	return (
		<Wrapper>
			<section className="grid gap-8 md:gap-12">
				{" "}
				{/* Header */}
				<motion.div
					className="text-center space-y-2"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					<h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
						Education
					</h1>
					<p className="text-muted-foreground max-w-[800px] mx-auto">
						Get to know more about my educational background.
					</p>
				</motion.div>
				{/* Main Content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Education Section - Left */}
					<motion.div
						className="px-5"
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}>
						<div className="font-medium text-lg mb-4">
							2021 - Present
						</div>
						<div>
							<h2 className="font-semibold text-xl">
								Universitas Diponegoro
							</h2>
							<h3 className="text-md font-normal mb-3">
								S2 Sistem Informasi | S1 Informatika
							</h3>
							<div className="gap-4 mb-4 flex items-stretch md:h-[300px] xl:h-[400px]">
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Podium}
										width={400}
										height={710}
										alt="Nafis Mufadhal speaking at a podium"
										className="rounded-lg w-full h-full object-cover object-[center_38%] grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Undip}
										width={400}
										height={533}
										alt="Nafis Mufadhal at Universitas Diponegoro"
										className="rounded-lg w-full h-full object-cover object-[center_72%] grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
								<div className="flex-[1] transition-all duration-300 ease-in-out hover:flex-[3] group">
									<Image
										src={Organisasi}
										width={400}
										height={300}
										alt="Nafis Mufadhal with student organizations"
										className="rounded-lg w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-300 ease-in-out"
									/>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-ink-muted text-justify title text-lg">
									I earned my Bachelor&apos;s degree in{" "}
									<span className="text-ink font-medium">
										Informatics
									</span>{" "}
									from{" "}
									<span className="text-ink font-medium">
										Universitas Diponegoro
									</span>{" "}
									(2025), with an undergraduate thesis on
									developing a population information system
									using the{" "}
									<span className="text-ink font-medium">
										ICONIX Process
									</span>
									. I am now continuing as a Master&apos;s
									student in{" "}
									<span className="text-ink font-medium">
										Information Systems
									</span>{" "}
									at the same university.
									<br />
									<br />
									Beyond coursework, I served as{" "}
									<span className="text-ink font-medium">
										Chairperson of HMIF Undip
									</span>{" "}
									and{" "}
									<span className="text-ink font-medium">
										Vice Chairperson I of the Faculty Student
										Senate
									</span>
									, and completed{" "}
									<span className="text-ink font-medium">
										Bangkit Academy 2024
									</span>{" "}
									in the Cloud Computing cohort. I also
									contribute as an author for FSM Undip
									communications.
									<br />
									<br />
									My academic path strengthens how I approach{" "}
									<span className="text-ink font-medium">
										IT infrastructure
									</span>
									,{" "}
									<span className="text-ink font-medium">
										full stack development
									</span>
									, and{" "}
									<span className="text-ink font-medium">
										data-driven systems
									</span>{" "}
									in real campus and research environments.
								</p>
							</div>
							<div className="flex flex-wrap gap-2 mt-4 text-sm">
								<div className="bg-teal text-white px-2 py-1 rounded-2xl">
									S1 Informatika Undip
								</div>
								<div className="bg-amber text-ink px-2 py-1 rounded-2xl">
									S2 Sistem Informasi
								</div>
								<div className="bg-teal-soft text-teal-dark px-2 py-1 rounded-2xl">
									Bangkit 2024
								</div>
							</div>
						</div>
					</motion.div>{" "}
					{/* Achievements Section - Right */}
					<motion.div
						className="flex flex-col justify-start px-5 md:px-0"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}>
						<h2 className="font-semibold text-xl mt-7">
							Achievements
						</h2>
						<p className="text-md font-normal mb-3 md:mb-6">
							Some of my achievements during my study.
						</p>

						{/* Achievements Container with transparent bottom effect */}
						<div className="relative">
							<div className="space-y-4">
								{/* Show visible achievements */}
								<AnimatePresence>
									{visibleAchievements.map(
										(achievement, index) => (
											<motion.div
												key={`${achievement.year}-${index}`}
												className="group"
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{
													duration: 0.5,
													delay: index * 0.05,
												}}>
												{/* Year indicator for first achievement of each year */}
												{index === 0 ||
												visibleAchievements[index - 1]
													?.year !==
													achievement.year ? (
													<div className="flex items-center gap-3 mb-3 mt-2">
														<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
															<span className="text-xs font-bold text-gray-600">
																{
																	achievement.year
																}
															</span>
														</div>
														<div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
													</div>
												) : null}

												{/* Glassmorphism achievement card with monochrome to color effect */}
												<div className="bg-white/40 backdrop-blur-md border border-teal/20 rounded-2xl p-4 shadow-lg hover:bg-teal-soft/50 transition-all duration-300 hover:shadow-xl">
													<div className="flex items-center gap-4">
														<div
															className={`aspect-square w-10 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-primary-foreground transition-all duration-300`}>
															<FontAwesomeIcon
																icon={
																	achievement.icon
																}
																className="text-white h-5 w-5"
															/>
														</div>
														<div>
															<h3 className="font-medium">
																{
																	achievement.title
																}
															</h3>
															<p className="text-sm">
																{
																	achievement.subtitle
																}
															</p>
															<div className="text-xs text-gray-500 mt-1">
																{
																	achievement.date
																}
															</div>
														</div>
													</div>
												</div>
											</motion.div>
										),
									)}
								</AnimatePresence>
							</div>

							{/* Transparent bottom overlay when not expanded */}
							{!isExpanded && hasMoreAchievements && (
								<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stale-300 via-stale/70 to-transparent pointer-events-none"></div>
							)}

							{/* Expand/Collapse Button */}
							{hasMoreAchievements && (
								<motion.div
									className="flex justify-center mt-6"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.5 }}>
									<button
										onClick={() =>
											setIsExpanded(!isExpanded)
										}
										className="flex items-center gap-2 px-6 py-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/40 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl">
										<span>
											{isExpanded
												? `Show Less`
												: `Show ${allAchievements.length - 4} More`}
										</span>
										<FontAwesomeIcon
											icon={
												isExpanded
													? faChevronUp
													: faChevronDown
											}
											className="h-3 w-3 transition-transform duration-300"
										/>
									</button>
								</motion.div>
							)}
						</div>
					</motion.div>
				</div>
			</section>
		</Wrapper>
	);
}
