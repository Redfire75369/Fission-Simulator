function OptionsTabComponent() {
	const [active, setActive] = React.useState(false);
	React.useEffect(function () {
		const timerID = setInterval(function () {
			setActive(player.navigation.naviTab === "options_tab");
		}, 50);
		return function () {
			clearInterval(timerID);
		};
	}, []);
	return /*#__PURE__*/React.createElement("div", {
		className: "flex-col options"
	}, /*#__PURE__*/React.createElement("div", {
		className: "flex-row"
	}, /*#__PURE__*/React.createElement(NotationOptionsButton, null), /*#__PURE__*/React.createElement(ThemeOptionsButton, null)), /*#__PURE__*/React.createElement("div", {
		className: "flex-row"
	}, /*#__PURE__*/React.createElement("button", {
		onClick: save
	}, "Save"), /*#__PURE__*/React.createElement("button", {
		onClick: load
	}, "Load")), /*#__PURE__*/React.createElement("div", {
		className: "flex-row"
	}, /*#__PURE__*/React.createElement("button", {
		onClick: importSave
	}, "Import Save"), /*#__PURE__*/React.createElement("button", {
		onClick: exportSave
	}, "Export Save")), /*#__PURE__*/React.createElement("div", {
		className: "flex-row"
	}, /*#__PURE__*/React.createElement("button", {
		onClick: hardReset
	}, "Hard Reset"), /*#__PURE__*/React.createElement("button", {
		onClick: enableCheatsTab
	}, "Stuff")));
}
