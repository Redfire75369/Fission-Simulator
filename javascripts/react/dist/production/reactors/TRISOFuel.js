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
    }, this.state.tier !== 2 ? /*#__PURE__*/React.createElement("span", null, "Depleted ", this.state.type, " Fuel can be reprocessed into Enriched ", trisoFuelTypes[this.state.tier + 1], " Fuel") : /*#__PURE__*/React.createElement("span", null, "Reprocessing ", notation(this.state.goal), " Depleted LEP Fuel will result in a prestige")))), /*#__PURE__*/React.createElement("div", {
      className: "flex-row body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col vertical-top fuelinfo"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Fuel Pebbles")), /*#__PURE__*/React.createElement("div", null, "Enriched: ", notation(this.state.enriched)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(this.state.depleted))), /*#__PURE__*/React.createElement("div", {
      className: "flex-col vertical-top reprocess"
    }, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
      onClick: this.reprocessDepleted.bind(this),
      className: this.state.canReprocess ? "trisobtn buy" : "trisobtn locked",
      id: "fuel_triso_reprocess" + (this.state.tier + 1)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        transition: this.state.reprocessing ? player.fuels.triso[this.state.tier].reprocessingTime / 1000 + "s width linear" : "",
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
