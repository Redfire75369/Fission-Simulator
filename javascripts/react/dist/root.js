/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function RootComponent() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EnergyComponent, null), /*#__PURE__*/React.createElement(LightWaterReactorComponent, null));
}

ReactDOM.render( /*#__PURE__*/React.createElement(RootComponent, null), document.getElementById("root"));