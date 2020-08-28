class PrestigeTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "prestige"
		});
	}

	render() {
		return (
			<div class="flex__col" style={{display: this.state.active ? "" : "none"}}>
				<p>You have {this.state.researchPoints} Research Points</p>
				<button onClick={toggleRespecResearch}>Respec Researches on Prestige</button>
				<GasCoolantComponent/>
			</div>
		);
	}
}
