/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function LightWaterComponent() {
  let lwf = React.useRef(null);
  let lwc = React.useRef(null);
  let lwr = React.useRef(null);
  /* Fuel and Mine */

  let [fuelRegular, setFuelRegular] = React.useState(zero);
  let [fuelEnriched, setFuelEnriched] = React.useState(zero);
  let [mineBuyable, setMineBuyable] = React.useState(false);
  let [mineBought, setMineBought] = React.useState(0);
  let [mineCost, setMineCost] = React.useState(zero);
  /* Centrifuge */

  let [centrifugeFuelStored, setCentrifugeFuelStored] = React.useState(zero);
  let [centrifugeEnrichment, setCentrifugeEnrichment] = React.useState(zero);
  let [centrifugeTime, setCentrifugeTime] = React.useState(0);
  let [centrifugeBuyable, setCentrifugeBuyable] = React.useState(false);
  let [centrifugeBought, setCentrifugeBought] = React.useState(0);
  let [centrifugeCost, setCentrifugeCost] = React.useState(0);
  let [centrifugeUnlock, setCentrifugeUnlock] = React.useState(false);
  /* Reactor */

  let [reactorFuel, setReactorFuel] = React.useState(zero);
  let [reactorFuelEnrichment, setReactorFuelEnrichment] = React.useState(false);
  let [reactorFuelUsage, setReactorFuelUsage] = React.useState(zero);
  let [reactorBuyable, setReactorBuyable] = React.useState(false);
  let [reactorBought, setReactorBought] = React.useState(0);
  let [reactorAmount, setReactorAmount] = React.useState(zero);
  let [reactorCost, setReactorCost] = React.useState(zero);
  let [reactorMultiplier, setReactorMultiplier] = React.useState(zero);
  React.useEffect(function () {
    lwf.current = player.fuels.light_water;
    lwc.current = player.centrifuges.light_water;
    lwr.current = player.reactors.light_water;
    /* Fuel and Mine */

    setFuelRegular(lwf.current.regular);
    setFuelEnriched(lwf.current.enriched);
    setMineBought(lwf.current.mine.bought);
    /* Centrifuge */

    setCentrifugeBought(lwc.current.bought);
    /* Reactor */

    setReactorBought(lwr.current.bought);
    setReactorAmount(lwr.current.bought);
    let update_loop = setInterval(function () {
      lwf.current = player.fuels.light_water;
      lwc.current = player.centrifuges.light_water;
      lwr.current = player.reactors.light_water;
      /* Fuel and Mine */

      setFuelEnriched(lwf.current.enriched);
      setMineBuyable(lwf.current.mine.buyable);
      /* Centrifuge */

      setCentrifugeUnlock(function (prevState) {
        return prevState || player.unlocked.light_water.centrifuge;
      });
      setCentrifugeFuelStored(player.centrifuges.light_water.fuel);
      setCentrifugeBuyable(lwc.current.buyable);
      setCentrifugeTime(lwc.current.time);
      /* Reactor */

      setReactorFuel(lwr.current.fuel);
      setReactorFuelEnrichment(lwr.current.fuel_enriched);
      setReactorBuyable(lwr.current.buyable); // setReactorAmount(lwr.current.amount);
    }, 50);
    return function () {
      clearInterval(update_loop);
    };
  }, []);
  /* Fuel and Mine */

  React.useEffect(function () {
    setMineCost(lwf.current.mine.cost);
  }, [mineBought]);
  /* Centrifuge */

  React.useEffect(function () {
    setCentrifugeCost(lwc.current.cost);
    setCentrifugeEnrichment(lwc.current.enrichment);
  }, [centrifugeBought]);
  /* Reactor */

  React.useEffect(function () {
    setReactorCost(lwr.current.cost);
    setReactorMultiplier(lwr.current.multiplier);
    setReactorFuelUsage(lwr.current.fuel_usage);
  }, [reactorBought]);
  React.useEffect(function () {
    setReactorFuelUsage(lwr.current.fuel_usage);
  }, [reactorFuel, centrifugeEnrichment]);
  /* Fuel and Mine */

  function mine_fuel() {
    player.fuels.light_water.mine_fuel();
    setFuelRegular(player.fuels.light_water.regular);
  }

  function buy_mine() {
    player.fuels.light_water.mine.buy();
    setMineBought(player.fuels.light_water.mine.bought);
  }
  /* Centrifuge */


  function load_fuel_lwc() {
    player.centrifuges.light_water.load_fuel();
    setFuelRegular(zero);
  }

  function buy_centrifuge() {
    player.centrifuges.light_water.buy();
    setCentrifugeBought(player.centrifuges.light_water.bought);
  }
  /* Reactor */


  function load_fuel_lwr() {
    player.reactors.light_water.load_fuel();
    setReactorFuel(player.reactors.light_water.fuel);

    if (!reactorFuelEnrichment) {
      setFuelRegular(zero);
    } else {
      setFuelEnriched(zero);
    }
  }

  function buy_lwr() {
    player.reactors.light_water.buy();
    setReactorBought(player.reactors.light_water.bought);
    setReactorAmount(player.reactors.light_water.amount);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center vh-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w-25 pa1"
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
  }, /*#__PURE__*/React.createElement("span", null, "Mine Upgrades: ", notation(mineBought)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Uranium Fuel: ", notation(fuelRegular)), /*#__PURE__*/React.createElement("br", null), centrifugeUnlock ? /*#__PURE__*/React.createElement("span", null, "Enriched Fuel: ", notation(fuelEnriched)) : /*#__PURE__*/React.createElement(React.Fragment, null)))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: mine_fuel
  }, "Mine Uranium Fuel"), /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: buy_mine
  }, "Upgrade Mining for ", notation(mineCost), " Energy")))))), centrifugeUnlock ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w-25 pa1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-mid-gray"
  }, "Centrifuge"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Centrifuge Upgrades: ", notation(centrifugeBought)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Stored Uranium Fuel: ", notation(centrifugeFuelStored))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: load_fuel_lwc
  }, "Load Uranium Fuel"), /*#__PURE__*/React.createElement("button", {
    className: "h-50 w-100 bg-moon-gray b--green pa1",
    onClick: buy_centrifuge
  }, "Upgrade Centrifuges for ", notation(centrifugeCost), " Energy")))))) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-100 w-25 pa1"
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
  }, /*#__PURE__*/React.createElement("span", null, "Reactor Upgrades: ", notation(reactorAmount)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Loaded Fuel: ", notation(reactorFuel))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "w-100 bg-moon-gray b--green pa1",
    onClick: load_fuel_lwr
  }, "Load ", reactorFuelEnrichment ? "Enriched" : "Uranium", " Fuel"), /*#__PURE__*/React.createElement("button", {
    className: "w-100 bg-moon-gray b--green pa1",
    onClick: buy_lwr
  }, "Upgrade Reactors for ", notation(reactorCost), " Energy")))))));
}