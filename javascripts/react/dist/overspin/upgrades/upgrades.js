/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function OverspinUpgradeComponent(props) {
  let up = React.useRef(null);
  let [rerender, setRerender] = React.useState(false);
  let [bought, setBought] = React.useState(false);
  let [cost, setCost] = React.useState(zero);
  let [multiplier, setMultiplier] = React.useState(zero);
  React.useEffect(function () {
    update_once();
    let update_loop_id = setInterval(function () {
      setRerender(cache.overspin.upgrades.rerender);
      update_loop();
    }, 50);
    return function () {
      clearInterval(update_loop_id);
    };
  }, []);

  function update_once() {
    up.current = player.overspin.upgrades[props.index];
    setBought(up.current.bought);
    setCost(up.current.cost);
  }

  function update_loop() {
    up.current = player.overspin.upgrades[props.index];
    setMultiplier(up.current.multiplier);
  }

  React.useEffect(function () {
    if (rerender) {
      update_once();
      update_loop();
      cache.overspin.upgrades.rerender = false;
    }
  }, [rerender]);

  function buy() {
    player.overspin.upgrades[props.index].buy();
    setBought(player.overspin.upgrades[props.index].bought);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "vw-20 mh2 " + (bought ? "bg-blue" : "bg-light-blue") + " b--dark-gray b--solid br1 br--bottom pointer",
    onClick: buy
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-between h4 pa3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex flex-row b tc"
  }, props.description), props.multiplier ? /*#__PURE__*/React.createElement("span", {
    className: "flex flex-row tc"
  }, "Formula: ", /*#__PURE__*/React.createElement("span", {
    className: "f6"
  }, /*#__PURE__*/React.createElement(TeX, null, props.formula))) : /*#__PURE__*/React.createElement(React.Fragment, null), bought && props.multiplier ? /*#__PURE__*/React.createElement("span", {
    className: "flex flex-row tc"
  }, "Multiplier: ", notation(multiplier)) : /*#__PURE__*/React.createElement("span", {
    className: "flex flex-row tc"
  }, "Cost: ", notation(cost), " Uranium")));
}