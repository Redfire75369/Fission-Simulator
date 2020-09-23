function NotationOptionsButton() {
	const [notation, setNotation] = useState("Scientific");

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setNotation(player.options.notation);
		}, 50);

		return return function() {
			clearInterval(timerID);
		};
	}

	return (
		<button onClick={notationChange}>
			Theme: {notation}
		</button>
	);
}
