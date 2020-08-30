class ProductionTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "production_tab",
      unlockedMines: player.unlocked.mines || player.energy.gt(250),
      unlockedPrestige: player.unlocked.prestige,
      canPrestige: player.americium > 1,
      americium: player.americium
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "navigation subtab"
    }, /*#__PURE__*/React.createElement(ProductionMinesNavigationButton, {
      tab: "mines",
      text: "Mines"
    }), /*#__PURE__*/React.createElement(ProductionNavigationButton, {
      tab: "reactors",
      text: "Reactors"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FissionReactorsSubTabComponent, null)), /*#__PURE__*/React.createElement("div", {
      className: "flex-row",
      style: {
        marginTop: "12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("p", null, "You have ", notation(this.state.americium), " Americium-242"), /*#__PURE__*/React.createElement("button", {
      onClick: buyPrestige,
      className: this.state.canPrestige ? "prestigebtn buy" : "prestigebtn locked",
      style: {
        display: this.state.unlockedPrestige ? "" : "none"
      }
    }, "Prestige for 1 Americium-242"))));
  }

}