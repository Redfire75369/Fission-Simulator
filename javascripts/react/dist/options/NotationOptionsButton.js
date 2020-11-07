/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function NotationOptionsButton() {
  const [notation, setNotation] = React.useState("Scientific");

  function notationChange() {
    player.options.notation = (player.options.notation + 1) % notations.length;
    setNotation(notations[player.options.notation]);
  }

  return /*#__PURE__*/React.createElement("button", {
    onClick: notationChange
  }, "Notation: ", notation);
}
