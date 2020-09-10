class GasCoolantStatsComponent extends ReactStateComponent {
  constructor(props) {
    super(props);
    this.state = {
      tier: this.props.tier
    };
  }

  tick() {
    this.setState({
      heatCapacity: gasCoolants[this.state.tier].heatCapacity,
      flowRate: gasCoolants[this.state.tier].flowRate,
      nobility: gasCoolants[this.state.tier].nobility,
      fuelEfficiency: gasCoolants[this.state.tier].fuelEfficiency
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