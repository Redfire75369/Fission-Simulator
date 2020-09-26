function ThemeOptionsButton() {
	const [theme, setTheme] = React.useState("Light");

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setTheme(player.options.theme);
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<button onClick={themeChange}>
			Theme: {theme}
		</button>
	);
}
