class PrestigeTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "prestige"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      class: "flex__col",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("p", null, "You have ", this.state.researchPoints, " Research Points"), /*#__PURE__*/React.createElement("button", {
      onClick: toggleRespecResearch
    }, "Respec Researches on Prestige"), /*#__PURE__*/React.createElement(GasCoolantComponent, null));
  }

}