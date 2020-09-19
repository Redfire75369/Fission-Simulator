const trisoFuelTypes = ["TBU", "LEU-235", "LEP-239"];

class TRISOFuelComponent extends ReactStateComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: trisoFuelTypes[this.props.tier]
    };
  }

  reprocessDepleted() {
    player.fuels.triso[this.props.tier].reprocessDepleted();
  }

  tick() {
    this.setState({
      unlocked: player.mines.tier > - 1 && (this.props.tier === 0 || ((player.fuels.triso[this.props.tier - 1].enriched.add(player.fuels.triso[this.props.tier - 1].depleted).gt(0) || player.fuels.triso[this.props.tier].enriched.add(player.fuels.triso[this.props.tier].depleted).gt(0)) && player.reactors.pebblebeds[this.props.tier - 1].bought > 0)),
      unlockedReprocessing: player.mines.tier > 0,
      hasFuel: player.fuels.triso[this.props.tier].enriched.add(player.fuels.triso[this.props.tier].depleted).gt(0),
      enriched: player.fuels.triso[this.props.tier].enriched,
      enrichedPercentage: player.fuels.triso[this.props.tier].enriched.div(player.fuels.triso[this.props.tier].enriched.add(player.fuels.triso[this.props.tier].depleted)).toNumber(),
      depleted: player.fuels.triso[this.props.tier].depleted,
      canReprocess: player.fuels.triso[this.props.tier].canReprocessDepleted,
      reprocessCost: player.fuels.triso[this.props.tier].reprocessEnergyCost,
      reprocessing: reprocessing[this.props.tier],
      gain: getTRISOFuelGain(this.props.tier)
    });

    if (this.props.tier === 2) {
      this.setState({
        goal: prestigeGoal()
      });
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "trisodiv",
      style: {
        display: this.state.unlocked ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-row title"
    }, /*#__PURE__*/React.createElement("div", {
      className: "type"
    }, /*#__PURE__*/React.createElement("b", null, this.state.type, " TRISO Fuel")), /*#__PURE__*/React.createElement("div", {
      className: "tooltip info"
    }, "i", /*#__PURE__*/React.createElement("div", {
      className: "tooltiptext",
      style: {
        fontSize: "90%",
        maxWidth: "15vw",
        minWidth: "15vw",
        padding: "1vw"
      }
    }, "Mines are producing ", notation(this.state.gain), " Enriched ", this.state.type, "Fuel per second.", /*#__PURE__*/React.createElement("br", null), this.props.tier !== 2 ? /*#__PURE__*/React.createElement("span", null, "Depleted ", this.state.type, " Fuel can be reprocessed into Enriched ", trisoFuelTypes[this.props.tier + 1], " Fuel") : /*#__PURE__*/React.createElement("span", null, "Reprocessing ", notation(this.state.goal), " Depleted LEP Fuel will result in a prestige")))), /*#__PURE__*/React.createElement("div", {
      className: "flex-row body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col vertical-top fuelinfo"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Fuel Pebbles")), /*#__PURE__*/React.createElement("div", null, "Enriched: ", notation(this.state.enriched)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(this.state.depleted))), /*#__PURE__*/React.createElement("div", {
      className: "flex-col vertical-top reprocess",
      style: {
        display: this.state.unlockedReprocessing ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
      onClick: this.reprocessDepleted.bind(this),
      className: this.state.canReprocess ? "trisobtn buy" : "trisobtn locked",
      id: "fuel_triso_reprocess" + (this.props.tier + 1)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        transition: this.state.reprocessing ? player.fuels.triso[this.props.tier].reprocessingTime / 1000 + "s width linear" : "",
        width: this.state.reprocessing ? "100%" : "0"
      }
    }), "Reprocess Depleted ", this.state.type, " Fuel Pebbles for ", notation(this.state.reprocessCost), " Energy"))), /*#__PURE__*/React.createElement("div", {
      className: "flex-row horizontal-center fuelbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: this.state.hasFuel ? "100%" : "0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: this.state.enrichedPercentage * 100 + "%"
      }
    })))))));
  }

}
