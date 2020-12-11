/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
try {
  ReactDOM.render( /*#__PURE__*/React.createElement(ProductionTabComponent, null), document.getElementById("production_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(StatisticsTabComponent, null), document.getElementById("statistics_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(AchievementsTabComponent, null), document.getElementById("achievements_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(OptionsTabComponent, null), document.getElementById("options_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(AutomationTabComponent, null), document.getElementById("automation_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PrestigeTabComponent, null), document.getElementById("prestige_tab"));
  ReactDOM.render( /*#__PURE__*/React.createElement(NavigationComponent, null), document.getElementById("navigation"));
} catch (e) {
  if (!errored) {
    alert("The game has encountered a fatal error during the initial render. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
    alert("--DEBUG Information--\n" + e.stack);
    console.error(e);
    errored = true;
  }
}