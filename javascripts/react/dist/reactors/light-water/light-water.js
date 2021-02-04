/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function LightWaterReactorComponent() {
  let fuel = React.useRef(null);
  let lwr = React.useRef(null);
  let [mineBought, setMineBought] = React.useState(zero);
  let [mineCost, setMineCost] = React.useState(zero);
  let [fuelRegular, setFuelRegular] = React.useState(zero);
  let [fuelEnriched, setFuelEnriched] = React.useState(zero);
  let [enrichment, setEnrichment] = React.useState(zero);
  let [storedFuelRegular, setStoredFuelRegular] = React.useState(zero);
  let [storedFuelEnriched, setStoredFuelEnriched] = React.useState(zero);
  let [fuelUsage, setFuelUsage] = React.useState(zero);
  let [bought, setBought] = React.useState(zero);
  let [amount, setAmount] = React.useState(zero);
  let [multiplier, setMultiplier] = React.useState(zero);
  let [cost, setCost] = React.useState(zero);
  React.useEffect(function () {
    fuel.current = player.fuels.light_water;
    lwr.current = player.reactors.light_water;
    setMineBought(fuel.current.mine.bought);
    setFuelRegular(fuel.current.regular);
    setFuelEnriched(fuel.current.enriched);
    setBought(lwr.current.bought);
    let update_loop = setInterval(function () {
      lwr.current = player.reactors.light_water;
      setStoredFuelRegular(lwr.current.fuel.regular);
      setStoredFuelEnriched(lwr.current.fuel.enriched);
      setAmount(lwr.current.amount);
    }, 50);
    return function () {
      clearInterval(update_loop);
    };
  }, []);
  React.useEffect(function () {
    setMineCost(fuel.current.mine.cost);
  }, [mineBought]);
  React.useEffect(function () {
    setCost(lwr.current.cost);
    setMultiplier(lwr.current.multiplier);
    setFuelUsage(lwr.current.fuel_usage);
  }, [bought]);
  React.useEffect(function () {
    setFuelUsage(lwr.current.fuel_usage);
  }, [storedFuelRegular, storedFuelEnriched, enrichment]);

  function mineFuelRegular() {
    player.fuels.light_water.mine_fuel();
    setFuelRegular(player.fuels.light_water.regular);
  }

  function buyMine() {
    player.fuels.light_water.mine.buy();
    setMineBought(player.fuels.light_water.mine.bought);
  }

  function loadFuelRegular() {
    player.reactors.light_water.load_fuel();
    setStoredFuelRegular(player.reactors.light_water.fuel.regular);
    setFuelRegular(zero);
  }

  function buyLWR() {
    player.reactors.light_water.buy();
    setBought(player.reactors.light_water.bought);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center vh-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w-25"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-mid-gray"
  }, "Uranium Fuel"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Mine Upgrades: ", notation(mineBought)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Uranium Fuel: ", notation(fuelRegular))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: mineFuelRegular
  }, "Mine Uranium Fuel"), /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: buyMine
  }, "Upgrade Mining for ", notation(mineCost), " Energy")))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w-25"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-mid-gray"
  }, "Light Water Reactor"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Amount: ", notation(amount)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Loaded Fuel: ", notation(storedFuelRegular))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "w-100 bg-moon-gray b--green pa1",
    onClick: loadFuelRegular
  }, "Load Uranium Fuel"), /*#__PURE__*/React.createElement("button", {
    className: "w-100 bg-moon-gray b--green pa1",
    onClick: buyLWR
  }, "Upgrade Reactors for ", notation(cost), " Energy")))))));
}