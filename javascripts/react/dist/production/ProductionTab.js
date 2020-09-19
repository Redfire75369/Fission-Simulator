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
    }, /*#__PURE__*/React.createElement(ProductionNavigationSubtabButton, {
      tab: "mines",
      text: "Mines"
    }), /*#__PURE__*/React.createElement(ProductionNavigationSubtabButton, {
      tab: "reactors",
      text: "Reactors"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FissionReactorsSubTabComponent, null)));
  }

}