class ProductionTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "production_tab"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FissionReactorsSubTabComponent, null)));
  }

}