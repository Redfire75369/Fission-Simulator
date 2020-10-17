function PrestigeTabComponent() {
	const [active, setActive] = React.useState(false);
	const [research, setResearch] = React.useState(0);
	const [respec, setRespec] = React.useState(false);
	React.useEffect(function () {
		const timerID = setInterval(function () {
			setActive(player.navigation.naviTab === "prestige_tab");
			setResearch(player.prestige.researchPoints);
			setRespec(player.prestige.respec);
		}, 50);
		return function () {
			clearInterval(timerID);
		};
	}, []);
	return /*#__PURE__*/React.createElement("div", {
		className: "flex-col horizontal-center",
		style: {
			display: active ? "" : "none"
		}
	}, /*#__PURE__*/React.createElement("p", null, "You have ", notation(research), " Research Points"), /*#__PURE__*/React.createElement("button", {
		onClick: toggleRespecResearch,
		className: respec ? "" : ""
	}, "Respec Researches on Prestige"), /*#__PURE__*/React.createElement(GasCoolantsComponent, null));
}
