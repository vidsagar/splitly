import { useRef, useLayoutEffect } from "react";

export default function AutoGrowInput({ value, onChange, onBlur = (e) => e, minWidth = 20 }) {
	const spanRef = useRef(null);
	const inputRef = useRef(null);

	useLayoutEffect(() => {
		if (!spanRef.current || !inputRef.current) return;
		const newWidth = spanRef.current.offsetWidth + 2; // small padding
		inputRef.current.style.width = `${Math.max(newWidth, minWidth)}px`;
	}, [value]);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onBlur(event.target.value);
		}
	}

	return (
		<div style={{ display: "inline-block", position: "relative" }}>
			<input
				ref={inputRef}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={(e) => onBlur(e.target.value)}
				onKeyDown={handleKeyDown}
				style={{
					width: minWidth,
					color: "lightgray",
					border: "none",
					outline: "none",
					font: "inherit",
					padding: 0,
					background: "transparent",
				}}
			/>

			{/* Hidden span used for measuring text width */}
			<span
				ref={spanRef}
				style={{
					position: "absolute",
					visibility: "hidden",
					whiteSpace: "pre",
					font: "inherit",
					minWidth: "6ch",
				}}
			>
				{value || ""}
			</span>
		</div>
	);
}
