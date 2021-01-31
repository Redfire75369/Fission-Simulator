/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function EnergyComponent() {
  let [energy, setEnergy] = React.useState(zero);
  React.useEffect(function () {
    let update_loop = setInterval(function () {
      setEnergy(player.energy);
    }, 50);
    return function () {
      clearInterval(update_loop);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row justify-center pa2"
  }, "You have ", notation(energy), " J of Energy");
}