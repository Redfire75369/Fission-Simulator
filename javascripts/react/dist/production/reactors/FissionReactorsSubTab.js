/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
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