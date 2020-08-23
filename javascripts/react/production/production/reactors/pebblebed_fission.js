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
			unlocked: this.state.tier == 0 || player.reactors.pebblebeds[this.state.tier - 1].bought > 0,
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
		return /*#__PURE__*/React.createElement("div", {
			className: "pebblebeddiv",
			style: {
				display: this.state.unlocked ? "" : "none"
			}
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__row title"
		}, /*#__PURE__*/React.createElement("div", {
			className: "type"
		}, /*#__PURE__*/React.createElement("b", null, this.state.type, " Pebblebed Reactor")), /*#__PURE__*/React.createElement("div", {
			className: "info"
		}, "i")), /*#__PURE__*/React.createElement("div", {
			className: "flex__row body"
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__col info"
		}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Reactor Information")), /*#__PURE__*/React.createElement("div", null, "Amount: ", notation(this.state.amount)), /*#__PURE__*/React.createElement("div", null, "Efficiency: ", notation(this.state.efficiency)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Fuel Information")), /*#__PURE__*/React.createElement("div", null, "Capacity: ", notation(this.state.totalCapacity)), /*#__PURE__*/React.createElement("div", null, "Enriched:", notation(this.state.fuel)), /*#__PURE__*/React.createElement("div", null, "Spent: ", notation(this.state.spent))), /*#__PURE__*/React.createElement("div", {
			className: "flex__col pebblebed fuelhandling"
		}, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
			onClick: this.loadFuel,
			className: this.state.canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked"
		}, "Load Enriched ", this.state.type, " Pellets"), /*#__PURE__*/React.createElement("button", {
			onClick: this.ejectWaste,
			className: this.state.canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"
		}, "Eject Spent ", this.state.type, " Pellets"))), /*#__PURE__*/React.createElement("div", {
			className: "flex__row fuelbar"
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__col"
		}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
			style: {
				maxWidth: this.state.spentPercentage * 100 + "%"
			}
		}, /*#__PURE__*/React.createElement("div", {
			style: {
				maxWidth: this.state.fuelPercentage / this.state.spentPercentage + "%"
			}
		})))))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
			className: "flex__row buying"
		}, /*#__PURE__*/React.createElement("button", {
			onClick: this.buy,
			className: this.state.buyable ? "pebblebedbtn buy buysingle" : "pebblebedbtn locked buysingle"
		}, "Buy for ", notation(this.state.cost), " Energy"), /*#__PURE__*/React.createElement("div", {
			style: {
				minWidth: "5%",
				maxWidth: "5%"
			}
		}), /*#__PURE__*/React.createElement("button", {
			onClick: this.buyMax,
			className: this.state.buyable ? "pebblebedbtn buy buymax" : "pebblebedbtn locked buymax"
		}, "Buy Max")));
	}

}
