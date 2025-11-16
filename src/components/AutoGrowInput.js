
export default function AutoGrowInput({

}) {
	const handleInput = (e) => {
		const text = e.currentTarget.textContent || "";
	}

	return (
		<span>
			<span contentEditable></span>
		</span>
	)
}
