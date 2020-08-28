const pebblebedReactorTypes = ["TBU", "LEU-235", "LEP-239"];

class PebblebedFissionReactorComponent extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			tier: this.props.tier,
			type: pebblebedReactorTypes[this.props.tier]
		};
	}

	loadFuel() {
		player.reactors.pebblebeds[this.state.tier].loadFuel();
	}
	ejectWaste() {
		player.reactors.pebblebeds[this.state.tier].ejectWaste();
	}
	buy() {
		player.reactors.pebblebeds[this.state.tier].buy();
	}
	buyMax() {
		player.reactors.pebblebeds[this.state.tier].buyMax();
	}

	tick() {
		this.setState({
			unlocked: this.state.tier == 0 || player.reactors.pebblebeds[this.state.tier - 1].bought >  0,
			amount: player.reactors.pebblebeds[this.state.tier].amount,
			bought: player.reactors.pebblebeds[this.state.tier].bought,
			canLoadFuel: player.fuels.triso[this.state.tier].enriched.gte(1) && player.reactors.pebblebeds[this.state.tier].fuel.add(player.reactors.pebblebeds[this.state.tier].spent).add(1).lt(player.reactors.pebblebeds[this.state.tier].totalCapacity),
			canEjectWaste: player.reactors.pebblebeds[this.state.tier].spent.gte(1),
			fuel: player.reactors.pebblebeds[this.state.tier].fuel,
			fuelPercentage: player.reactors.pebblebeds[this.state.tier].fuel.div(player.reactors.pebblebeds[this.state.tier].totalCapacity).toNumber() * 100,
			spent: player.reactors.pebblebeds[this.state.tier].spent,
			spentPercentage: player.reactors.pebblebeds[this.state.tier].fuel.add(player.reactors.pebblebeds[this.state.tier].spent).div(player.reactors.pebblebeds[this.state.tier].totalCapacity).toNumber(),
			buyable: player.reactors.pebblebeds[this.state.tier].buyable,
			cost: player.reactors.pebblebeds[this.state.tier].cost,
			efficiency: player.reactors.pebblebeds[this.state.tier].efficiency,
			totalCapacity: player.reactors.pebblebeds[this.state.tier].totalCapacity
		});
	}

	render() {
		return (
			<div className="pebblebeddiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex__row title">
					<div className="type"><b>{this.state.type} Pebblebed Reactor</b></div>
					<div className="info">i</div>
				</div>

				<div className="flex__row body">
					<div className="flex__col info">
						<div><b>Reactor Information</b></div>
						<div>Amount: {notation(this.state.amount)}</div>
						<div>Efficiency: {notation(this.state.efficiency)}</div>
						<div><b>Fuel Information</b></div>
						<div>Capacity: {notation(this.state.totalCapacity)}</div>
						<div>Enriched:{notation(this.state.fuel)}</div>
						<div>Spent: {notation(this.state.spent)}</div>
					</div>

					<div className="flex__col pebblebed fuelhandling">
						<div>Fuel Handling:</div>
						<button onClick={this.loadFuel.bind(this)} className={this.state.canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Load Enriched {this.state.type} Pellets</button>
						<button onClick={this.ejectWaste.bind(this)} className={this.state.canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Eject Spent {this.state.type} Pellets</button>
					</div>
				</div>

				<div className="flex__row fuelbar">
					<div className="flex__col">
						<div>
							<div>
								<div style={{maxWidth: this.state.spentPercentage * 100 + "%"}}>
									<div style={{maxWidth: this.state.fuelPercentage / this.state.spentPercentage + "%"}}></div>
								</div>
							</div>
						</div>
					</div>
				</div><br/>

				<div className="flex__row buying">
					<button onClick={this.buy.bind(this)} className={this.state.buyable ? "pebblebedbtn buy buysingle" : "pebblebedbtn locked buysingle"}>Buy for {notation(this.state.cost)} Energy</button>
					<div style={{minWidth: "5%", maxWidth: "5%"}}></div>
					<button onClick={this.buyMax.bind(this)} className={this.state.buyable ? "pebblebedbtn buy buymax" : "pebblebedbtn locked buymax"}>Buy Max</button>
				</div>
			</div>
		);
	}
}
