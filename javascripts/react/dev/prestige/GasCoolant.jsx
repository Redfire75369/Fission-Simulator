class GasCoolantComponent extends ReactStateComponent {
	tick() {
		this.setState({
			percentageWidth: max(max(max(player.prestige.researches[0], player.prestige.researches[1]), player.prestige.researches[2]), player.prestige.researches[3]) / 23,
			heatCapacityResearch: player.prestige.researches[0],
			flowRateResearch: player.prestige.researches[1],
			fuelEfficiencyResearch: player.prestige.researches[2],
			nobilityResearch: player.prestige.researches[3]
		});
	}

	render() {
		return (
			<div className="flex-col" style={{maxHeight: "min(76vw, 76vh)", minHeight: "min(76vw, 76vh)", marginTop: "min(2vw, 2vh)", width: "min(60vw, 60vh)"}}>
				<div className="flex-row horizontal-center vertical-center" style={{marginBottom: "min(1vw, 1vh)", maxHeight: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)", width: "min(6vw, 6vh)"}}>
					<button onClick={function() {assignResearch(0);}} className="" style={{maxHeight: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)"}}>▲</button>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{maxHeight: "min(23vw, 23vh)", minHeight: "min(23vw, 23vh)", width: "min(12vw, 12vh)"}}>
					<div className="flex-col vertical-bottom" style={{maxHeight: "min(23vw, 23vh)", minHeight: "min(23vw, 23vh)", width: "min(12vw, 12vh)"}}>
						<div style={{backgroundColor: "#CA2B3C", maxHeight: "min(" + this.state.heatCapacityResearch / this.state.percentageWidth + "vh, " + this.state.heatCapacityResearch / this.state.percentageWidth + "vw)", minHeight: "min(" + this.state.heatCapacityResearch / this.state.percentageWidth + "vh, " + this.state.heatCapacityResearch / this.state.percentageWidth + "vw)", width: "min(12vw, 12vh)"}}/>
					</div>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{maxHeight: "min(14vw, 14vh)", minHeight: "min(14vw, 14vh)", width: "min(74vw, 74vh)"}}>
					<button onClick={function() {assignResearch(1);}} className="" style={{marginRight: "min(1vw, 1vh)", maxHeight: "min(6vw, 6vh)", maxWidth: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)", minWidth: "min(6vw, 6vh)"}}>◀</button>
					<div className="flex-row horizontal-right" style={{maxHeight: "min(12vw, 12vh)", minHeight: "min(12vw, 12vh)", width: "24vw"}}>
						<div style={{backgroundColor: "#00B2D3", maxHeight: "min(12vw, 12vh)", maxWidth: "min(" + this.state.flowRateResearch / this.state.percentageWidth + "vh, " + this.state.flowRateResearch / this.state.percentageWidth + "vw)", minHeight: "min(12vw, 12vh)", minWidth: "min(" + this.state.flowRateResearch / this.state.percentageWidth + "vh, " + this.state.flowRateResearch / this.state.percentageWidth + "vw)"}}/>
					</div>
					<div style={{backgroundColor: "#000000", borderRadius: "min(6vw, 6vh)", margin: "min(1vw, 1vh)", maxHeight: "min(12vw, 12vh)", maxWidth: "min(12vw, 12vh)",  minHeight: "min(12vw, 12vh)",}}/>
					<div className="flex-row horizontal-left" style={{maxHeight: "min(12vw, 12vh)", minHeight: "min(12vw, 12vh)", width: "24vw"}}>
						<div style={{backgroundColor: "#40CE39", maxHeight: "min(12vw, 12vh)", maxWidth: "min(" + this.state.fuelEfficiencyResearch / this.state.percentageWidth + "vh, " + this.state.fuelEfficiencyResearch / this.state.percentageWidth + "vw)", minHeight: "min(12vw, 12vh)", minWidth: "min(" + this.state.fuelEfficiencyResearch / this.state.percentageWidth + "vh, " + this.state.fuelEfficiencyResearch / this.state.percentageWidth + "vw)"}}/>
					</div>
					<button onClick={function() {assignResearch(2);}} className="" style={{marginLeft: "min(1vw, 1vh)", maxHeight: "min(6vw, 6vh)", maxWidth: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)", minWidth: "min(6vw, 6vh)"}}>▶</button>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{maxHeight: "min(23vw, 23vh)", minHeight: "min(23vw, 23vh)", width: "min(12vw, 12vh)"}}>
					<div className="flex-col vertical-top" style={{maxHeight: "min(23vw, 23vh)", minHeight: "min(23vw, 23vh)", width: "min(12vw, 12vh)"}}>
						<div style={{backgroundColor: "#9037D6", maxHeight: "min(" + this.state.nobilityResearch / this.state.percentageWidth + "vh, " + this.state.nobilityResearch / this.state.percentageWidth + "vw)", minHeight: "min(" + this.state.nobilityResearch / this.state.percentageWidth + "vh, " + this.state.nobilityResearch / this.state.percentageWidth + "vw)", width: "min(12vw, 12vh)"}}/>
					</div>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{marginBottom: "min(3vw, 3vh)", marginTop: "min(1vw, 1vh)", maxHeight: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)", width: "min(6vw, 6vh)"}}>
					<button onClick={function() {assignResearch(3);}} className="" style={{maxHeight: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)"}}>▼</button>
				</div>
			</div>
		);
	}
}
