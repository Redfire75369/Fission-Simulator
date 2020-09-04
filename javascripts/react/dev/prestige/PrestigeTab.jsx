class PrestigeTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "prestige_tab",
			researchPoints: player.prestige.researchPoints,
			respec: player.prestige.respec
		});
	}

	render() {
		return (
			<div className="flex-col horizontal-center" style={{display: this.state.active ? "" : "none"}}>
				<p>You have {notation(this.state.researchPoints)} Research Points</p>
				<button onClick={toggleRespecResearch} className={this.state.respec ? "" : ""}>Respec Researches on Prestige</button>
				<GasCoolantComponent/>

				<div className="flex-row vertical-top">
					<GasCoolantStatsComponent tier={0}/>
					<GasCoolantStatsComponent tier={1}/>
					<GasCoolantStatsComponent tier={2}/>
				</div>
			</div>
		);
	}
}
