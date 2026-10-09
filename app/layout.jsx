import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Analytics } from "@vercel/analytics/react";
import Chat from "@/components/Chat";
import ClientTopProgressBar from "@/components/ClientTopProgressBar";
import AmbientBackground from "@/components/AmbientBackground";
import FlyingRocket from "@/components/FlyingRocket";
import LinkOpenAnimation from "@/components/LinkOpenAnimation";
import SplashScreen from "@/components/SplashScreen";



const poppins = localFont({
	src: [
		{
			path: "./fonts/poppins-latin-300-normal.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "./fonts/poppins-latin-400-normal.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/poppins-latin-500-normal.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "./fonts/poppins-latin-600-normal.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "./fonts/poppins-latin-700-normal.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-poppins",
});

const jost = localFont({
	src: "./fonts/jost-latin-wght-normal.woff2",
	weight: "100 900",
	display: "swap",
	variable: "--font-jost",
});

export const metadata = {
	metadataBase: new URL("https://www.alvalens.my.id"),
	title: "Nafis Mufadhal | Portofolio",

	description:
		"Nafis Mufadhal — Master's student in Information Systems at Universitas Diponegoro. IT Infrastructure, Full Stack Developer, and Data Analyst.",

	author: "Nafis Mufadhal",
	siteUrl: "https://www.alvalens.my.id",
	applicationName: "Nafis Mufadhal",

	keywords: [
		"nafis mufadhal",
		"nafis",
		"mufadhal",
		"nafissmf",
		"undip",
		"universitas diponegoro",
		"full stack developer",
		"it infrastructure",
		"nafis portfolio",
	],

	openGraph: {
		type: "website",
		url: "https://www.alvalens.my.id",
		title: "Nafis Mufadhal | Portofolio",
		siteName: "Nafis Mufadhal | Portofolio",
		description:
			"Master's student in Information Systems at Universitas Diponegoro — IT Infrastructure, Full Stack Developer, Data Analyst.",
		images: [
			{
				url: "/og-image-rev.png",
				alt: "Nafis Mufadhal Portofolio",
				width: 1200,
				height: 630,
			},
		],
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Nafis Mufadhal",
	url: "https://www.alvalens.my.id",
	jobTitle: "Full Stack Developer",
	worksFor: [
		{ "@type": "Organization", name: "Universitas Diponegoro" },
		{ "@type": "Organization", name: "UP2TI FSM Undip" },
	],
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Universitas Diponegoro",
	},
	sameAs: [
		"https://github.com/nafissmf",
		"https://www.linkedin.com/in/nafissmf",
	],
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${poppins.variable} ${jost.variable}`}>
			<body>
				<AmbientBackground />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<ClientTopProgressBar />
				<SplashScreen />
				<LinkOpenAnimation />
				<Navbar />
				{children}
				<Chat />
				<FlyingRocket />
				<Analytics />
			</body>
		</html>
	);
}
