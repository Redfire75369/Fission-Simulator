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
		return /*#__PURE__*/React.createElement("div", {
			className: "trisodiv",
			style: {
				display: this.state.unlocked ? "" : "none"
			}
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__row",
			style: {
				backgroundColor: "#14213D",
				fontSize: "120%",
				textAlign: "center"
			}
		}, /*#__PURE__*/React.createElement("div", {
			style: {
				color: "#C5861E",
				maxWidth: "90%"
			}
		}, /*#__PURE__*/React.createElement("b", null, this.state.type, " TRISO Fuel")), /*#__PURE__*/React.createElement("div", {
			style: {
				backgroundColor: "#C5861E",
				color: "#14213D",
				maxWidth: "10%"
			}
		}, "i")), /*#__PURE__*/React.createElement("div", {
			className: "flex__row",
			style: {
				marginLeft: "12px",
				marginRight: "12px"
			}
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__col",
			style: {
				alignItems: "flex-start",
				fontSize: "120%",
				maxWidth: "50%",
				minWidth: "50%",
				textAlign: "left"
			}
		}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Fuel Pebbles")), /*#__PURE__*/React.createElement("div", null, "Enriched: ", notation(this.state.enriched)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(this.state.depleted)), /*#__PURE__*/React.createElement("div", null, "Lifetime: ", notation(this.state.lifetime), " ms")), /*#__PURE__*/React.createElement("div", {
			className: "flex__col pebblebed",
			style: {
				fontSize: "120%",
				justifyContent: "flex-start",
				maxHeight: "80%",
				maxWidth: "50%",
				minHeight: "80%",
				minWidth: "50%"
			}
		}, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
			onClick: this.reprocessDepleted,
			className: this.state.canReprocess ? "trisobtn buy" : "trisobtn locked",
			id: "fuel_triso_reprocess" + this.state.tier,
			style: {
				position: "relative",
				padding: "0"
			}
		}, /*#__PURE__*/React.createElement("div", {
			className: "trisofuelreprocessbar",
			style: {
				position: "absolute"
			}
		}), "Reprocess Spent ", this.state.type, " Fuel Pebbles for ", notation(this.state.reprocessCost), " Energy"))), /*#__PURE__*/React.createElement("div", {
			className: "flex__row",
			style: {
				height: "20%",
				marginLeft: "12px",
				marginRight: "12px"
			}
		}, /*#__PURE__*/React.createElement("div", {
			className: "flex__col"
		}, /*#__PURE__*/React.createElement("div", {
			className: "trisofuelbarcontainer"
		}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
			style: {
				maxWidth: this.state.hasFuel ? "100%" : "0"
			}
		}, /*#__PURE__*/React.createElement("div", {
			style: {
				maxWidth: this.state.enrichedPercentage * 100 + "%"
			}
		}), "\\"))))), /*#__PURE__*/React.createElement("br", null));
	}

}

class TRISOFuelsComponent extends React.Component {
	render() {
		return /*#__PURE__*/React.createElement("div", {
			className: "flex__row"
		}, /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 0
		}), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 1
		}), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 2
		}));
	}

}
