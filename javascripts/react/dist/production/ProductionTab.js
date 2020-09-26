function ProductionTabComponent() {
	const [active, setActive] = React.useState(false);
	React.useEffect(function () {
		const timerID = setInterval(function () {
			setActive(player.navigation.naviTab === "production_tab");
		}, 50);
		return function () {
			clearInterval(timerID);
		};
	}, []);
	return /*#__PURE__*/React.createElement("div", {
		style: {
			display: active ? "" : "none"
		}
	}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FissionReactorsSubTabComponent, null)));
}
