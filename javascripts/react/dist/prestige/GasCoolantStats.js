class GasCoolantStatsComponent extends ReactStateComponent {
  tick() {
    this.setState({
      heatCapacity: gasCoolants[this.props.tier].heatCapacity,
      flowRate: gasCoolants[this.props.tier].flowRate,
      nobility: gasCoolants[this.props.tier].nobility,
      fuelEfficiency: gasCoolants[this.props.tier].fuelEfficiency
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col vertical-top",
      style: {
        margin: "4vw"
      }
    }, /*#__PURE__*/React.createElement("div", null, "Coolant Stats"), /*#__PURE__*/React.createElement("div", null, "Heat Capacity: ", notation(this.state.heatCapacity)), /*#__PURE__*/React.createElement("div", null, "Flow Rate: ", notation(this.state.flowRate)), /*#__PURE__*/React.createElement("div", null, "Nobility: ", notation(this.state.nobility)), /*#__PURE__*/React.createElement("div", null, "Fuel Efficiency: ", notation(this.state.fuelEfficiency)));
  }

}