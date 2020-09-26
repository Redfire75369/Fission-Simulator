function AutomationTabComponent() {
	const [active, setActive] = React.useState(false);
	React.useEffect(function () {
		const timerID = setInterval(function () {
			setActive(player.navigation.naviTab === "automation_tab");
		}, 50);
		return function () {
			clearInterval(timerID);
		};
	}, []);
	return /*#__PURE__*/React.createElement("div", {
		className: "flex-row",
		style: {
			display: active ? "" : "none"
		}
	}, /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
		tier: 0
	}), /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
		tier: 1
	}), /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
		tier: 2
	}));
}
