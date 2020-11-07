/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function ThemeOptionsButton() {
  const [theme, setTheme] = React.useState("Light");

  function themeChange() {
    player.options.theme = (player.options.theme + 1) % themes.length;
    setTheme(themes[player.options.theme]);
    document.getElementById("style").setAttribute("href", "stylesheets/" + theme.toLowerCase() + ".css");
    document.getElementById("colour").content = themeBackgroundColours[player.options.theme];
  }

  return /*#__PURE__*/React.createElement("button", {
    onClick: themeChange
  }, "Theme: ", theme);
}
