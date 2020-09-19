class AutomationTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "automation_tab"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-row",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
      tier: 0
    }), /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
      tier: 1
    }), /*#__PURE__*/React.createElement(PebblebedFuelHandlingAutomationComponent, {
      tier: 2
    }));
  }

}