class ProductionTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "production_tab",
      unlockedMines: player.unlocked.mines || player.energy.gt(250)
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
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FissionReactorsSubTabComponent, null)));
  }

}