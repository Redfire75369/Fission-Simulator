class PrestigeTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "prestige_tab",
      researchPoints: player.prestige.researchPoints,
      respec: player.prestige.respec
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col horizontal-center",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("p", null, "You have ", notation(this.state.researchPoints), " Research Points"), /*#__PURE__*/React.createElement("button", {
      onClick: toggleRespecResearch,
      className: this.state.respec ? "" : ""
    }, "Respec Researches on Prestige"), /*#__PURE__*/React.createElement(GasCoolantComponent, null), /*#__PURE__*/React.createElement("div", {
      className: "flex-row vertical-top"
    }, /*#__PURE__*/React.createElement(GasCoolantStatsComponent, {
      tier: 0
    }), /*#__PURE__*/React.createElement(GasCoolantStatsComponent, {
      tier: 1
    }), /*#__PURE__*/React.createElement(GasCoolantStatsComponent, {
      tier: 2
    })));
  }

}