function NotationOptionsButton() {
	const [notation, setNotation] = React.useState("Scientific");
	React.useEffect(function () {
		const timerID = setInterval(function () {
			setNotation(player.options.notation);
		}, 50);
		return function () {
			clearInterval(timerID);
		};
	}, []);
	return /*#__PURE__*/React.createElement("button", {
		onClick: notationChange
	}, "Theme: ", notation);
}
