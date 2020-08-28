const achievementTexts = {
  11: "The fertility of Thorium\nBuy one TBU Pebblebed Reactor.",
  12: "I have the power inside\nObtain 1000 Energy.",
  13: "Suggest Ideas in the Discord Server",
  14: "WIP\nNucleosynthesise for the first time.",
  15: "Suggest Ideas in the Discord Server>",
  16: "All the Elements\nUnlock all 8 Reactors.",
  17: "Suggest Ideas in the Discord Server>",
  18: "Nanomachines, Son\nObtain 1 Nanite.",
  21: "Suggest Ideas in the Discord Server",
  22: "The Power of a Dying Star\nNucleosynthesise 8 Times.",
  23: "Suggest Ideas in the Discord Server",
  24: "WIP\nObtain 1.00e12 Energy.",
  25: "They harden in response to physical trauma!\nObtain 8 Nanites.",
  26: "Suggest Ideas in the Discord Server",
  27: "WIP\nBuy all Nanite Upgrades",
  28: "To Infinity and Beyond!\nMeltdown for the first time."
};

class AchievementComponent extends ReactStateComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
  }

  tick() {
    this.setState({
      completed: player.achievements[this.state.id]
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: this.state.completed ? "tooltip achcomplete" : "tooltip achlocked"
    }, /*#__PURE__*/React.createElement("img", {
      className: "achpic",
      src: "resources/images/achievements/" + this.state.id + ".png"
    }), /*#__PURE__*/React.createElement("span", {
      className: "tooltiptext"
    }, achievementTexts[this.props.id]));
  }

}