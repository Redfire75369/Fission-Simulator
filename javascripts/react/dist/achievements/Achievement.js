const achievementTexts = {
  11: "Thorium Power\nBuy one TBU Pebblebed Reactor.",
  12: "Minecraft 2\nBuy a Mine with an iron-tipped drill.",
  13: "Thoranium\nReprocess Depleted TBU Fuel into Enriched LEU-235 Fuel.",
  14: "Capacity Overload\nReach a total capacity of 1000 LEU-235 Fuel in LEU-235 Pebblebed Reactors.",
  15: "",
  16: "",
  17: "",
  18: "",
  21: "",
  22: "",
  23: "",
  24: "",
  25: "",
  26: "",
  27: "",
  28: ""
};

class AchievementComponent extends ReactStateComponent {
  tick() {
    this.setState({
      completed: player.achievements[this.props.id]
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col align horizontal-center tooltip " + (this.state.completed ? "achcomplete" : "achlocked")
    }, /*#__PURE__*/React.createElement("img", {
      src: "resources/images/achievements/" + this.props.id + ".png"
    }), /*#__PURE__*/React.createElement("span", {
      className: "tooltiptext"
    }, achievementTexts[this.props.id].split("\n")[0], /*#__PURE__*/React.createElement("br", null), achievementTexts[this.props.id].split("\n")[1]));
  }

}