class FissionReactorsSubTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.production === "reactors"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex__row"
    }, /*#__PURE__*/React.createElement(TRISOFuelComponent, {
      tier: 0
    }), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
      tier: 1
    }), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
      tier: 2
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex__row",
      style: {
        minHeight: "2vh"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex__row"
    }, /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
      tier: 0
    }), /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
      tier: 1
    }), /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
      tier: 2
    })));
  }

}