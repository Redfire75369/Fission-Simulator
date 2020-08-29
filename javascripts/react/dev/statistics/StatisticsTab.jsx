class StatisticsTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "statistics_tab",
			totalTime: player.time,
			totalEnergy: player.totalEnergy,
			totalNanites: player.nanites.total,
			unlockedMeltdown: player.unlocked.meltdown,
			bestMeltdownTime: player.meltdown.bestTime
		});
	}

	render() {
		return (
			<div className="flex-col statistics" style={{display: this.state.active ? "" : "none"}}>
				<div>Total time played: {formatTime(this.state.totalTime)}</div>
				<div>Total energy generated: {notation(this.state.totalEnergy)}</div>
				<div>Total nanites researched: {notation(this.state.totalNanites)}</div>
				<div style={{display: this.state.unlockedMeltdown ? "" : "none"}}>Fastest Meltdown Time: {formatTime(this.state.bestMeltdownTime)}</div>
			</div>
		);
	}
}
