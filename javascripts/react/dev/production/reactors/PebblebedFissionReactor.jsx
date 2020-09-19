const pebblebedReactorTypes = ["TBU", "LEU-235", "LEP-239"];

class PebblebedFissionReactorComponent extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			type: pebblebedReactorTypes[this.props.tier]
		};
	}

	loadFuel() {
		player.reactors.pebblebeds[this.props.tier].loadFuel();
	}
	ejectWaste() {
		player.reactors.pebblebeds[this.props.tier].ejectWaste();
	}
	buy() {
		player.reactors.pebblebeds[this.props.tier].buy();
	}
	buyMax() {
		player.reactors.pebblebeds[this.props.tier].buyMax();
	}

	tick() {
		this.setState({
			unlocked: this.props.tier === 0 || player.reactors.pebblebeds[this.props.tier - 1].bought >  0,
			unlockedMines: player.mines.tier > -1,
			amount: player.reactors.pebblebeds[this.props.tier].amount,
			bought: player.reactors.pebblebeds[this.props.tier].bought,
			canLoadFuel: player.fuels.triso[this.props.tier].enriched.gte(1) && player.reactors.pebblebeds[this.props.tier].fuel.add(player.reactors.pebblebeds[this.props.tier].spent).add(1).lt(player.reactors.pebblebeds[this.props.tier].totalCapacity),
			canEjectWaste: player.reactors.pebblebeds[this.props.tier].spent.gte(1),
			fuel: player.reactors.pebblebeds[this.props.tier].fuel,
			fuelPercentage: player.reactors.pebblebeds[this.props.tier].fuel.div(player.reactors.pebblebeds[this.props.tier].totalCapacity).toNumber() * 100,
			spent: player.reactors.pebblebeds[this.props.tier].spent,
			spentPercentage: player.reactors.pebblebeds[this.props.tier].fuel.add(player.reactors.pebblebeds[this.props.tier].spent).div(player.reactors.pebblebeds[this.props.tier].totalCapacity).toNumber(),
			buyable: player.reactors.pebblebeds[this.props.tier].buyable,
			cost: player.reactors.pebblebeds[this.props.tier].cost,
			burnRate: player.reactors.pebblebeds[this.props.tier].burnRate,
			totalCapacity: player.reactors.pebblebeds[this.props.tier].totalCapacity,
			gain: getReactorGain(this.props.tier)
		});
	}

	render() {
		return (
			<div className="pebblebeddiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex-row title">
					<div className="type"><b>{this.state.type} Pebblebed Reactor</b></div>
					<div className="tooltip info">
						i
						<div className="tooltiptext" style={{fontSize: "90%", maxWidth: "15vw", minWidth: "15vw", padding: "1vw",}}>
							{this.state.type} Pebblebed Reactors convert Enriched fuel into Spent Fuel, producing energy.<br/>
							Your mines are producing {notation(this.state.gain)} {this.state.type} reactors every second.<br/>
						</div>
					</div>
				</div>

				<div className="flex-row body">
					<div className="flex-col vertical-top info">
						<div><b>Reactor Information</b></div>
						<div>Amount: {notation(this.state.amount)} ({this.state.bought} Bought)</div>
						<div><b>Fuel Information</b></div>
						<div>Capacity: {notation(this.state.totalCapacity)}</div>
						<div>Fuel Usage: {notation(this.state.burnRate)}/s</div>
						<div>Enriched: {notation(this.state.fuel)}</div>
						<div>Spent: {notation(this.state.spent)}</div>
					</div>

					<div className="flex-col vertical-top fuelhandling" style={{display: this.state.unlockedMines ? "" : "none"}}>
						<div>Fuel Handling:</div>
						<button onClick={this.loadFuel.bind(this)} className={this.state.canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Load Enriched {this.state.type} Pellets</button>
						<button onClick={this.ejectWaste.bind(this)} className={this.state.canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Eject Spent {this.state.type} Pellets</button>
					</div>
				</div>

				<div className="flex-row fuelbar">
					<div className="flex-col">
						<div>
							<div>
								<div style={{maxWidth: this.state.spentPercentage * 100 + "%"}}>
									<div style={{maxWidth: this.state.fuelPercentage / this.state.spentPercentage + "%"}}></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="flex-row buying">
					<button onClick={this.buy.bind(this)} className={this.state.buyable ? "pebblebedbtn buy buysingle" : "pebblebedbtn locked buysingle"}>Buy for {notation(this.state.cost)} Energy</button>
					<div style={{minWidth: "5%", maxWidth: "5%"}}></div>
					<button onClick={this.buyMax.bind(this)} className={this.state.buyable ? "pebblebedbtn buy buymax" : "pebblebedbtn locked buymax"}>Buy Max</button>
				</div>
			</div>
		);
	}
}
