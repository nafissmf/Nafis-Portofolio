"use client";

import { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader";

export default function SplashScreen() {
	const [visible, setVisible] = useState(true);
	const [leaving, setLeaving] = useState(false);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const holdMs = reduce ? 250 : 1600;
		const leaveMs = reduce ? 0 : 450;
		const hold = window.setTimeout(() => setLeaving(true), holdMs);
		const hide = window.setTimeout(() => setVisible(false), holdMs + leaveMs);
		return () => {
			window.clearTimeout(hold);
			window.clearTimeout(hide);
		};
	}, []);

	if (!visible) return null;
	return <PageLoader leaving={leaving} label="Welcome" />;
}
