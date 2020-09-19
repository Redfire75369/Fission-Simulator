class AutomationTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "automation_tab"
		});
	}

	render() {
		return (
			<div className="flex-row" style={{display: this.state.active ? "" : "none"}}>
				<PebblebedFuelHandlingAutomationComponent tier={0}/>
				<PebblebedFuelHandlingAutomationComponent tier={1}/>
				<PebblebedFuelHandlingAutomationComponent tier={2}/>
			</div>
		);
	}
}
