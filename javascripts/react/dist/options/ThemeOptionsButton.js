function ThemeOptionsButton() {
	const [theme, setTheme] = React.useState("Light");
	function themeChange() {
		player.options.theme = player.options.theme + 1 % themes.length;
		setTheme(themes[player.options.theme]);
		document.getElementById("style").setAttribute("href", "stylesheets/" + theme.toLowerCase() + ".css");
	}
	return /*#__PURE__*/React.createElement("button", {
		onClick: themeChange
	}, "Theme: ", theme);
}
