import Image from "next/image";
import Card from "./spotify/card";
import { motion } from "framer-motion";
import Me1 from "@/public/image/nafis6.jpeg";
import Me2 from "@/public/image/nafis2.jpeg";
import Me3 from "@/public/image/nafis3.jpeg";
import Hr from "@/components/Hr";

function Title() {
	return (
		<div className="mt-10 flex flex-col justify-start items-center w-full pl-10 md:pl-32">
			<div className="flex justify-center items-center flex-col my-5 self-start ">
				<Hr variant="long"></Hr>
				<h1 className="text-3xl font-bold mt-3 text-ink">Who Am I?</h1>
			</div>
		</div>
	);
}

export default function About() {
	return (
		<>
			<Title />
			<div className="relative mx-auto container gap-4 px-10 grid grid-cols-1 md:grid-cols-2 mb-10">
				<div className="flex justify-center items-start flex-col mb-5 ">
					<div className="images relative w-full aspect-square">
						<div className="absolute -z-10 top-10 left-0 w-48 h-48 rounded-full bg-teal/20 blur-3xl" />
						<div className="absolute -z-10 bottom-10 right-0 w-56 h-56 rounded-full bg-amber/25 blur-3xl" />
						<div className="absolute top-28 left-10 w-[50%] aspect-square overflow-hidden photo-frame rounded-lg transition-transform duration-300 hover:scale-[1.02]">
							<motion.div
								initial={{ opacity: 0, scale: 0.5, x: 100 }}
								whileInView={{
									opacity: 1,
									scale: 1,
									x: 0,
								}}
								className="relative w-full h-full">
								<Image
									src={Me1}
									alt="Nafis Mufadhal"
									fill
									sizes="(max-width: 768px) 80vw, 40vw"
									className="object-cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute top-16 right-28 w-[30%] aspect-square overflow-hidden photo-frame-amber rounded-lg transition-transform duration-300 hover:scale-[1.02]">
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
								className="relative w-full h-full">
								<Image
									src={Me2}
									alt="Nafis Mufadhal"
									fill
									sizes="(max-width: 768px) 60vw, 25vw"
									className="object-cover"
									placeholder="blur"
								/>
							</motion.div>
						</div>
						<div className="absolute bottom-16 right-20 w-[40%] aspect-square overflow-hidden photo-frame rounded-lg transition-transform duration-300 hover:scale-[1.02]">
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
								className="relative w-full h-full">
								<Image
									src={Me3}
									alt="Nafis Mufadhal"
									fill
									sizes="(max-width: 768px) 80vw, 35vw"
									className="object-cover"
									placeholder="blur"
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
					<p className="text-sm uppercase tracking-[0.35rem] text-amber-deep mb-2 font-medium">
						About
					</p>
					<h2 className="text-2xl font-bold tracking-wider mb-3 text-ink">
						Nafis <span className="text-teal">Mufadhal</span>
					</h2>
					<p className="text-ink-muted text-justify title text-lg leading-relaxed">
						I am a{" "}
						<span className="text-teal-dark font-medium">
							Master&apos;s student in Information Systems
						</span>{" "}
						at{" "}
						<span className="text-teal-dark font-medium">
							Universitas Diponegoro
						</span>
						, with a Bachelor&apos;s degree in Informatics from the
						same university. My work sits at the intersection of{" "}
						<span className="text-teal-dark font-medium">
							IT infrastructure, full stack development, and data
							analysis
						</span>
						.
						<br />
						<br />
						As staff at the Faculty IT Unit (
						<span className="text-amber-deep font-medium">
							UP2TI
						</span>
						), I help manage servers, internal applications, and
						digital resources that support faculty operations. I
						also completed{" "}
						<span className="text-amber-deep font-medium">
							Bangkit Academy 2024
						</span>{" "}
						(Cloud Computing Cohort) with Google Cloud training, and
						previously led{" "}
						<span className="text-teal-dark font-medium">
							HMIF Undip
						</span>{" "}
						as Chairperson while serving as Vice Chairperson I of
						the Faculty Student Senate. I am open to opportunities
						in IT, data analysis, and production planning where
						technical skill and leadership can deliver real impact.
					</p>
					<Card />
				</motion.div>
			</div>
		</>
	);
}
