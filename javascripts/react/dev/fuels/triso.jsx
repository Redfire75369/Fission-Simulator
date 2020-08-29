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
			reprocessCost: player.fuels.triso[this.state.tier].reprocessEnergyCost
		});
	}

	reprocessDepleted() {
		player.fuels.triso[this.state.tier].reprocessDepleted();
	}

	render() {
		return (
			<div className="trisodiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex__row" style={{backgroundColor: "#14213D", fontSize:"120%", textAlign: "center"}}>
					<div style={{color: "#C5861E", maxWidth: "90%"}}><b>{this.state.type} TRISO Fuel</b></div>
					<div style={{backgroundColor: "#C5861E", color: "#14213D", maxWidth: "10%"}}>i</div>
				</div>

				<div className="flex__row" style={{marginLeft: "12px", marginRight: "12px"}}>
					<div className="flex__col" style={{alignItems: "flex-start", fontSize: "120%", maxWidth: "50%", minWidth: "50%", textAlign: "left"}}>
						<div><b>Fuel Pebbles</b></div>
						<div>Enriched: {notation(this.state.enriched)}</div>
						<div>Depleted: {notation(this.state.depleted)}</div>
						<div>Lifetime: {notation(this.state.lifetime)} ms</div>
					</div>

					<div className="flex__col pebblebed" style={{fontSize: "120%", justifyContent: "flex-start", maxHeight: "80%", maxWidth: "50%", minHeight: "80%", minWidth: "50%"}}>
						<div>Fuel Handling:</div>
						<button onClick={this.reprocessDepleted} className={this.state.canReprocess ? "trisobtn buy" : "trisobtn locked"} id={"fuel_triso_reprocess" + this.state.tier} style={{position: "relative", padding: "0"}}>
							<div className="trisofuelreprocessbar" style={{position: "absolute"}}></div>
							Reprocess Spent {this.state.type} Fuel Pebbles for {notation(this.state.reprocessCost)} Energy
						</button>
					</div>
				</div>

				<div className="flex__row" style={{height: "20%", marginLeft: "12px", marginRight: "12px"}}>
					<div className="flex__col">
						<div className="trisofuelbarcontainer">
							<div>
								<div style={{maxWidth: this.state.hasFuel ? "100%" : "0"}}>
									<div style={{maxWidth: this.state.enrichedPercentage * 100 + "%"}}></div>\
								</div>
							</div>
						</div>
					</div>
				</div><br/>
			</div>
		);
	}
}
class TRISOFuelsComponent extends React.Component {
	render() {
		return (
			<div className={"flex__row"}>
				<TRISOFuelComponent tier={0}/>
				<TRISOFuelComponent tier={1}/>
				<TRISOFuelComponent tier={2}/>
			</div>
		);
	}
}
