class PebblebedFuelHandlingAutomationComponent extends ReactStateComponent {
  tick() {
    this.setState({
      unlockedUpgrade: player.prestiges > 1,
      active: player.automation.reactors.pebblebeds.fuel[this.props.tier].active,
      interval: player.automation.reactors.pebblebeds.fuel[this.props.tier].interval,
      cooldownPercentage: min(1, player.automation.reactors.pebblebeds.fuel[this.props.tier].cooldown / player.automation.reactors.pebblebeds.fuel[this.props.tier].interval),
      cost: new Decimal(1000),
      reprocessActive: player.automation.fuels.triso[this.props.tier].active,
      reprocessInterval: player.automation.fuels.triso[this.props.tier].interval,
      reprocessCooldownPercentage: min(1, player.automation.fuels.triso[this.props.tier].cooldown / player.automation.fuels.triso[this.props.tier].interval),
      reprocessCost: new Decimal(1000)
    });
  }

  toggle() {
    player.automation.reactors.pebblebeds.fuel[this.props.tier].active = !player.automation.reactors.pebblebeds.fuel[this.props.tier].active;
  }

  decreaseInterval() {
    player.automation.reactors.pebblebeds.fuel[this.props.tier].interval -= 80;
  }

  reprocessToggle() {
    player.automation.fuels.triso[this.props.tier].active = !player.automation.fuels.triso[this.props.tier].active;
  }

  decreaseReprocessInterval() {
    player.automation.fuels.triso[this.props.tier].interval -= 80;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col fuelhandlingautomationdiv"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Pebblebed Reactor Fuel Handling")), /*#__PURE__*/React.createElement("div", null, "Interval: ", this.state.interval), /*#__PURE__*/React.createElement("div", {
      className: "cooldown"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: this.state.cooldownPercentage * 100 + "%"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.toggle.bind(this),
      className: this.state.active ? "active" : "inactive"
    }, this.state.active ? "Deactivate" : "Activate", " Automation")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.unlockedUpgrade ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.decreaseInterval.bind(this),
      className: "fuelhandlingautomationbtn"
    }, "Decrease Automation Interval for ", notation(this.state.cost))))), /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "TRISO Fuel Reprocessing")), /*#__PURE__*/React.createElement("div", null, "Interval: ", this.state.reprocessInterval), /*#__PURE__*/React.createElement("div", {
      className: "cooldown"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: this.state.reprocessCooldownPercentage * 100 + "%"
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
      onClick: this.reprocessToggle.bind(this),
      className: this.state.reprocessActive ? "active" : "inactive"
    }, this.state.reprocessActive ? "Deactivate" : "Activate", " Automation")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.unlockedReprocessUpgrade ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.decreaseReprocessInterval.bind(this),
      className: "fuelhandlingautomationbtn"
    }, "Decrease Automation Interval for ", notation(this.state.reprocessCost))))));
  }

}