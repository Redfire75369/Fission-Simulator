const trisoFuelTypes = ["TBU", "LEU-235", "LEP-239"];

class TRISOFuelComponent extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			tier: this.props.tier,
			type: trisoFuelTypes[this.props.tier]
		};

		this.reprocessDepleted = this.reprocessDepleted.bind(this);
	}

	tick() {
		this.setState({
			unlocked: this.state.tier == 0 || player.fuels.triso[this.state.tier - 1].enriched.add(player.fuels.triso[this.state.tier - 1].spent).gt(0) || player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].spent).gt(0),
			hasFuel: player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].depleted).gt(0),
			enriched: player.fuels.triso[this.state.tier].enriched,
			enrichedPercentage: player.fuels.triso[this.state.tier].enriched.div(player.fuels.triso[this.state.tier].enriched.add(player.fuels.triso[this.state.tier].depleted)).toNumber(),
			depleted: player.fuels.triso[this.state.tier].depleted,
			lifetime: player.fuels.triso[this.state.tier].lifetime.div(1000),
			canReprocess: player.fuels.triso[this.state.tier].canReprocessDepleted,
			reprocessCost: player.fuels.triso[this.state.tier].reprocessEnergyCost,
			reprocessing: reprocessing[this.state.tier]
		});
	}

	reprocessDepleted() {
		player.fuels.triso[this.state.tier].reprocessDepleted();
	}

	render() {
		return (
			<div className="trisodiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex__row title">
					<div className="type"><b>{this.state.type} TRISO Fuel</b></div>
					<div className="info">i</div>
				</div>

				<div className="flex__row body">
					<div className="flex__col fuelinfo">
						<div><b>Fuel Pebbles</b></div>
						<div>Enriched: {notation(this.state.enriched)}</div>
						<div>Depleted: {notation(this.state.depleted)}</div>
						<div>Lifetime: {notation(this.state.lifetime)} ms</div>
					</div>

					<div className="flex__col reprocess">
						<div>Fuel Handling:</div>
						<button onClick={this.reprocessDepleted} className={this.state.canReprocess ? "trisobtn buy" : "trisobtn locked"} id={"fuel_triso_reprocess" + this.state.tier}>
							<div style={{position: "absolute", transition: this.state.reprocessing ? player.fuels.triso[this.state.tier].reprocessingTime / 1000 + "s width linear" : "", width: this.state.reprocessing ? "100%" : 0}}></div>
							Reprocess Spent {this.state.type} Fuel Pebbles for {notation(this.state.reprocessCost)} Energy
						</button>
					</div>
				</div>

				<div className="flex__row fuelbar">
					<div className="flex__col">
						<div>
							<div>
								<div style={{maxWidth: this.state.hasFuel ? "100%" : "0"}}>
									<div style={{maxWidth: this.state.enrichedPercentage * 100 + "%"}}></div>
								</div>
							</div>
						</div>
					</div>
				</div><br/>
			</div>
		);
	}
}
