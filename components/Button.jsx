const Button = ({ children, variation, ...props }) => (
	<button
		{...props}
		className={`title mr-3 rounded-2xl px-8 py-2 transition duration-300 ease-in-out ${
			variation === "primary"
				? "bg-teal text-white border-2 border-teal hover:bg-amber hover:border-amber shadow-[0_8px_20px_rgba(15,118,110,0.28)]"
				: "bg-transparent border-2 border-teal text-teal hover:bg-teal hover:text-white"
		}`}>
		{children}
	</button>
);

export default Button;
