/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function GasCoolantsComponent() {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-row",
    style: {
      marginTop: "min(2vw, 2vh)",
      maxHeight: "min(55vw, 55vh)",
      minHeight: "min(55vw, 55vh)",
      width: "min(80vw, 80vh)"
    }
  }, /*#__PURE__*/React.createElement(GasCoolantColumnComponent, {
    colour: "#CA2B3C",
    type: 0,
    name: "Heat Capacity"
  }), /*#__PURE__*/React.createElement(GasCoolantColumnComponent, {
    colour: "#00B2D3",
    type: 1,
    name: "Flow Rate"
  }), /*#__PURE__*/React.createElement(GasCoolantColumnComponent, {
    colour: "#40CE39",
    type: 2,
    name: "Efficiency"
  }), /*#__PURE__*/React.createElement(GasCoolantColumnComponent, {
    colour: "#9037D6",
    type: 3,
    name: "Nobility"
  }));
}