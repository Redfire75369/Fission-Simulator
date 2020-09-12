const trisoFuelTypes = ["TBU", "LEU-235", "LEP-239"];

class TRISOFuelComponent extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			tier: this.props.tier,
			type: trisoFuelTypes[this.props.tier]
		};
	}

	reprocessDepleted() {
		player.fuels.triso[this.state.tier].reprocessDepleted();
	}

	tick() {
		this.setState({
			unlocked: this.state.tier === 0 || player.fuels.triso[this.state.tier - 1].enriched.add(player.fuels.triso[this.state.tier - 1].depleted).gt(0) || player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].depleted).gt(0),
			hasFuel: player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].depleted).gt(0),
			enriched: player.fuels.triso[this.state.tier].enriched,
			enrichedPercentage: player.fuels.triso[this.state.tier].enriched.div(player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].depleted)).toNumber(),
			depleted: player.fuels.triso[this.state.tier].depleted,
			canReprocess: player.fuels.triso[this.state.tier].canReprocessDepleted,
			reprocessCost: player.fuels.triso[this.state.tier].reprocessEnergyCost,
			reprocessing: reprocessing[this.state.tier]
		});
		if (this.state.tier === 2) {
			this.setState({
				goal: prestigeGoal()
			});
		}
	}

	render() {
		return (
			<div className="trisodiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex-row title">
					<div className="type"><b>{this.state.type} TRISO Fuel</b></div>
					<div className="tooltip info">
						i
						<div className="tooltiptext">
							{this.state.tier === 2 ? <span>Depleted {this.state.type} Fuel can be reprocessed into Enriched {mineTypes[this.state.tier + 1]} Fuel</span> : <span>Reprocessing {notation(this.state.goal)}} Depleted LEP Fuel will result in a prestige</span>}
							
						</div>
					</div>
				</div>

				<div className="flex-row body">
					<div className="flex-col vertical-top fuelinfo">
						<div><b>Fuel Pebbles</b></div>
						<div>Enriched: {notation(this.state.enriched)}</div>
						<div>Depleted: {notation(this.state.depleted)}</div>
					</div>

					<div className="flex-col vertical-top reprocess">
						<div>Fuel Handling:</div>
						<button onClick={this.reprocessDepleted.bind(this)} className={this.state.canReprocess ? "trisobtn buy" : "trisobtn locked"} id={"fuel_triso_reprocess" + (this.state.tier + 1)}>
							<div style={{position: "absolute", transition: this.state.reprocessing ? player.fuels.triso[this.state.tier].reprocessingTime / 1000 + "s width linear" : "", width: this.state.reprocessing ? "100%" : "0"}}></div>
							Reprocess Depleted {this.state.type} Fuel Pebbles for {notation(this.state.reprocessCost)} Energy
						</button>
					</div>
				</div>

				<div className="flex-row horizontal-center fuelbar">
					<div className="flex-col">
						<div>
							<div>
								<div style={{maxWidth: this.state.hasFuel ? "100%" : "0"}}>
									<div style={{maxWidth: this.state.enrichedPercentage * 100 + "%"}}></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
