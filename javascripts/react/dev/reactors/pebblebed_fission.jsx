const pebblebedReactorTypes = ["TBU", "LEU-235", "LEP-239"];

class PebblebedReactorComponent extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			tier: this.props.tier,
			type: pebblebedReactorTypes[this.props.tier]
		};

		this.loadFuel = this.loadFuel.bind(this);
		this.ejectWaste = this.ejectWaste.bind(this);
		this.buy = this.buy.bind(this);
		this.buyMax = this.buyMax.bind(this);
	}

	tick() {
		this.setState({
			unlocked: this.state.tier == 0 || player.reactors.pebblebeds[this.state.tier - 1].bought >  0,
			amount: player.reactors.pebblebeds[this.state.tier].amount,
			bought: player.reactors.pebblebeds[this.state.tier].bought,
			canLoadFuel: player.fuels.triso[this.state.tier].enriched.gt(0) && player.reactors.pebblebeds[this.state.tier].fuel.add(player.reactors.pebblebeds[this.state.tier].spent).lt(player.reactors.pebblebeds[this.state.tier].totalCapacity) * 100,
			canEjectWaste: player.reactors.pebblebeds[this.state.tier].spent.gt(0),
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

	render() {
		return (
			<div className="pebblebeddiv" style={{display: this.state.unlocked ? "" : "none"}}>
				<div className="flex__row" style={{backgroundColor: "#14213D", fontSize:"120%", textAlign: "center"}}>
					<div style={{color: "#C5861E", maxWidth: "90%"}}><b>{this.state.type} Pebblebed Reactor</b></div>
					<div style={{backgroundColor: "#C5861E", color: "#14213D", maxWidth: "10%"}}>i</div>
				</div>

				<div className="flex__row" style={{marginLeft: "12px", marginRight: "12px"}}>
					<div className="flex__col" style={{alignItems: "flex-start", fontSize: "120%", maxWidth: "50%", minWidth: "50%", textAlign: "left"}}>
						<div><b>Reactor Information</b></div>
						<div>Amount: {notation(this.state.amount)}</div>
						<div>Efficiency: {notation(this.state.efficiency)}</div>
						<div><b>Fuel Information</b></div>
						<div>Capacity: {notation(this.state.totalCapacity)}</div>
						<div>Enriched:{notation(this.state.fuel)}</div>
						<div>Spent: {notation(this.state.spent)}</div>
					</div>

					<div className="flex__col pebblebed" style={{fontSize: "120%", justifyContent: "flex-start", maxHeight: "80%", maxWidth: "50%", minHeight: "80%", minWidth: "50%"}}>
						<div>Fuel Handling:</div>
						<button onClick={this.loadFuel} className={this.state.canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Load Enriched {this.state.type} Pellets</button>
						<button onClick={this.ejectWaste} className={this.state.canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Eject Spent {this.state.type} Pellets</button>
					</div>
				</div>

				<div className="flex__row" style={{height: "20%", marginLeft: "12px", marginRight: "12px"}}>
					<div className="flex__col">
						<div className="pebblebedfuelbarcontainer">
							<div>
								<div style={{maxWidth: this.state.spentPercentage * 100 + "%"}}>
									<div style={{maxWidth: this.state.fuelPercentage / this.state.spentPercentage + "%"}}></div>
								</div>
							</div>
						</div>
					</div>
				</div><br/>

				<div className="flex__row" style={{marginLeft: "12px", marginRight: "12px", marginBottom: "12px"}}>
					<button onClick={this.buy} className={this.state.buyable ? "pebblebedbtn buy" : "pebblebedbtn locked"} style={{minWidth: "60%", maxWidth: "60%"}}>Buy for {notation(this.state.cost)} Energy</button>
					<div style={{minWidth: "5%", maxWidth: "5%"}}></div>
					<button onClick={this.buyMax} className={this.state.buyable ? "pebblebedbtn buy" : "pebblebedbtn locked"} style={{minWidth: "30%", maxWidth: "30%"}}>Buy Max</button>
				</div>
			</div>
		);
	}
}

class PebblebedReactorsComponent extends React.Component {
	render() {
		return (
			<div className={"flex__row"}>
				<PebblebedReactorComponent tier={0}/>
				<PebblebedReactorComponent tier={1}/>
				<PebblebedReactorComponent tier={2}/>
			</div>
		);
	}
}


class PebblebedReactorsSubSubTabComponent extends React.Component {
	render() {
		return (
			<div>
				<TRISOFuelsComponent/>
				<div className="flex__row" style={{minHeight: "2vh"}}></div>
				<PebblebedReactorsComponent/>
			</div>
		);
	}
}
ReactDOM.render(<PebblebedReactorsSubSubTabComponent/>, document.getElementById("production_reactor_pebblebed_subsubtab"));
