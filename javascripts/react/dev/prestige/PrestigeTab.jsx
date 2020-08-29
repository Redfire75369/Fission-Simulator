class PrestigeTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "prestige_tab",
			respec: player.prestige.respec
		});
	}

	render() {
		return (
			<div className="flex-col horizontal-center" style={{display: this.state.active ? "" : "none"}}>
				<p>You have {this.state.researchPoints} Research Points</p>
				<button onClick={toggleRespecResearch} className={player.prestige.respec ? "" : ""}>Respec Researches on Prestige</button>
				<GasCoolantComponent/>
			</div>
		);
	}
}
