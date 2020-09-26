function AutomationTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "automation_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className="flex-row" style={{display: this.state.active ? "" : "none"}}>
			<PebblebedFuelHandlingAutomationComponent tier={0}/>
			<PebblebedFuelHandlingAutomationComponent tier={1}/>
			<PebblebedFuelHandlingAutomationComponent tier={2}/>
		</div>
	);
}
