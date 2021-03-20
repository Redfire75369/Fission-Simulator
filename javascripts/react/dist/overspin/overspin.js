/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function OverspinTabComponent() {
  const upgrade_descriptions = ["Increase Fuel Density based on Reactor Upgrades", "Decrease Centrifuge Time from 8000 ms to 5000ms", "Increase Quantity of Fuel Mined and Fuel Usage based on Energy", "Increase Centrifuge Softcap based on Weapon-Grade Uranium", "Unlocks ???????"];
  const upgrade_formulas = ["r^{1.5}", "log_{15}(e)", "\\frac{u}{6}"];
  return !mobile ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mv1"
  }, /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 0,
    description: upgrade_descriptions[0],
    multiplier: true,
    formula: upgrade_formulas[0]
  }), /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 1,
    description: upgrade_descriptions[1],
    multiplier: false
  }), /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 2,
    description: upgrade_descriptions[2],
    multiplier: true,
    formula: upgrade_formulas[1]
  }), /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 3,
    description: upgrade_descriptions[3],
    multiplier: true,
    formula: upgrade_formulas[2]
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mv1"
  }, /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 4,
    description: upgrade_descriptions[4],
    multiplier: false
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mv1"
  }, /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 0,
    description: upgrade_descriptions[0],
    multiplier: true,
    formula: upgrade_formulas[0]
  }), /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 1,
    description: upgrade_descriptions[1],
    multiplier: false
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mv1"
  }, /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 2,
    description: upgrade_descriptions[2],
    multiplier: true,
    formula: upgrade_formulas[1]
  }), /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 3,
    description: upgrade_descriptions[3],
    multiplier: true,
    formula: upgrade_formulas[2]
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mv1"
  }, /*#__PURE__*/React.createElement(OverspinUpgradeComponent, {
    index: 4,
    description: upgrade_descriptions[4],
    multiplier: false
  })));
}