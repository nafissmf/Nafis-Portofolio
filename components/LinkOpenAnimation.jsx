"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "@/components/PageLoader";

function isInternalNavigation(anchor) {
	if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return false;
	const href = anchor.getAttribute("href");
	if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
	let url;
	try {
		url = new URL(href, window.location.href);
	} catch {
		return false;
	}
	if (url.origin !== window.location.origin) return false;
	if (url.pathname === window.location.pathname && url.hash) return false;
	if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
	return true;
}

export default function LinkOpenAnimation() {
	const pathname = usePathname();
	const [visible, setVisible] = useState(false);
	const [leaving, setLeaving] = useState(false);
	const played = useRef(false);
	const pathWhenOpened = useRef(pathname);

	useEffect(() => {
		const onClick = (event) => {
			if (played.current) return;
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
			if (
				event.defaultPrevented ||
				event.button !== 0 ||
				event.metaKey ||
				event.ctrlKey ||
				event.shiftKey ||
				event.altKey
			) {
				return;
			}
			const anchor = event.target.closest("a");
			if (!isInternalNavigation(anchor)) return;
			played.current = true;
			pathWhenOpened.current = window.location.pathname;
			setLeaving(false);
			setVisible(true);
		};
		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, []);

	useEffect(() => {
		if (!visible || pathname === pathWhenOpened.current) return undefined;
		const hold = window.setTimeout(() => setLeaving(true), 720);
		const hide = window.setTimeout(() => {
			setVisible(false);
			setLeaving(false);
		}, 1170);
		return () => {
			window.clearTimeout(hold);
			window.clearTimeout(hide);
		};
	}, [pathname, visible]);

	useEffect(() => {
		if (!visible) return undefined;
		const fallback = window.setTimeout(() => {
			setVisible(false);
			setLeaving(false);
		}, 4000);
		return () => window.clearTimeout(fallback);
	}, [visible]);

	if (!visible) return null;
	return <PageLoader leaving={leaving} />;
}
