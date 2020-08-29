class PrestigeTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "prestige_tab",
      respec: player.prestige.respec
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col horizontal-center",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("p", null, "You have ", this.state.researchPoints, " Research Points"), /*#__PURE__*/React.createElement("button", {
      onClick: toggleRespecResearch,
      className: player.prestige.respec ? "" : ""
    }, "Respec Researches on Prestige"), /*#__PURE__*/React.createElement(GasCoolantComponent, null));
  }

}