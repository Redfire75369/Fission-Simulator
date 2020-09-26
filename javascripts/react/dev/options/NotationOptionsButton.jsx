function NotationOptionsButton() {
	const [notation, setNotation] = React.useState("Scientific");

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setNotation(player.options.notation);
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<button onClick={notationChange}>
			Theme: {notation}
		</button>
	);
}
