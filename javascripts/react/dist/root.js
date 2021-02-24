/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function RootComponent() {
  let [navigation, setNavigation] = React.useState("reactors");
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EnergyComponent, null), /*#__PURE__*/React.createElement(React.Fragment, null, navigation === "reactors" ? /*#__PURE__*/React.createElement(LightWaterComponent, null) : navigation === "options" ? /*#__PURE__*/React.createElement(OptionComponent, null) : /*#__PURE__*/React.createElement(React.Fragment, null)));
}

ReactDOM.render( /*#__PURE__*/React.createElement(RootComponent, null), $("root"));