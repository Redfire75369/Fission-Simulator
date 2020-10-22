function FissionReactorsSubTabComponent() {
  const [active, setActive] = React.useState(false);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setActive(player.navigation.production === "reactors");
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: active ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement(TRISOFuelComponent, {
    tier: 0
  }), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
    tier: 1
  }), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
    tier: 2
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
    tier: 0
  }), /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
    tier: 1
  }), /*#__PURE__*/React.createElement(PebblebedFissionReactorComponent, {
    tier: 2
  })));
}