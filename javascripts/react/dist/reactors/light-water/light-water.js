/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function LightWaterComponent(props) {
  let lwf = React.useRef(player.fuels.light_water);
  let lwc = React.useRef(player.centrifuges.light_water);
  let lwr = React.useRef(player.reactors.light_water);
  let [rerender, setRerender] = React.useState(false);
  /* Fuel and Mine */

  let [fuelRegular, setFuelRegular] = React.useState(zero);
  let [fuelEnriched, setFuelEnriched] = React.useState(zero);
  let [mineBuyable, setMineBuyable] = React.useState(false);
  let [mineBought, setMineBought] = React.useState(0);
  let [mineCost, setMineCost] = React.useState(zero);
  /* Centrifuge */

  let [centrifugeFuelStored, setCentrifugeFuelStored] = React.useState(lwc.current.fuel);
  let [centrifugeTime, setCentrifugeTime] = React.useState(lwc.current.time);
  let [centrifugeBuyable, setCentrifugeBuyable] = React.useState(lwc.current.buyable);
  let [centrifugeBought, setCentrifugeBought] = React.useState(lwc.current.bought);
  let [centrifugeCost, setCentrifugeCost] = React.useState(lwc.current.cost);
  /* Reactor */

  let [reactorFuel, setReactorFuel] = React.useState(lwr.current.fuel);
  let [reactorFuelEnrichment, setReactorFuelEnrichment] = React.useState(lwr.current.fuel_enriched);
  let [reactorBuyable, setReactorBuyable] = React.useState(lwr.current.buyable);
  let [reactorBought, setReactorBought] = React.useState(lwr.current.bought);
  let [reactorAmount, setReactorAmount] = React.useState(lwr.current.amount);
  let [reactorCost, setReactorCost] = React.useState(lwr.current.cost);
  React.useEffect(function () {
    let update_loop_id = setInterval(function () {
      setRerender(cache.reactors.light_water.rerender);
      update_loop();
    }, 50);
    return function () {
      clearInterval(update_loop_id);
    };
  }, []);

  function update_once() {
    lwf.current = player.fuels.light_water;
    lwc.current = player.centrifuges.light_water;
    lwr.current = player.reactors.light_water;
    /* Fuel and Mine */

    setFuelRegular(lwf.current.regular);
    setFuelEnriched(lwf.current.enriched);
    setMineBought(lwf.current.mine.bought);
    /* Centrifuge */

    setCentrifugeTime(lwc.current.time);
    setCentrifugeBought(lwc.current.bought);
    /* Reactor */

    setReactorBought(lwr.current.bought);
    setReactorAmount(lwr.current.bought);
  }

  function update_loop() {
    lwf.current = player.fuels.light_water;
    lwc.current = player.centrifuges.light_water;
    lwr.current = player.reactors.light_water;
    /* Fuel and Mine */

    setFuelEnriched(lwf.current.enriched);
    setMineBuyable(lwf.current.mine.buyable);
    /* Centrifuge */

    setCentrifugeFuelStored(player.centrifuges.light_water.fuel);
    setCentrifugeBuyable(lwc.current.buyable);
    setCentrifugeTime(lwc.current.time);
    /* Reactor */

    setReactorFuel(lwr.current.fuel);
    setReactorFuelEnrichment(lwr.current.fuel_enriched);
    setReactorBuyable(lwr.current.buyable); // setReactorAmount(lwr.current.amount);
  }

  React.useEffect(function () {
    if (rerender) {
      update_once();
      update_loop();
      cache.reactors.light_water.rerender = false;
    }
  }, [rerender]);
  /* Fuel and Mine */

  React.useEffect(function () {
    setMineCost(lwf.current.mine.cost);
  }, [mineBought]);
  /* Centrifuge */

  React.useEffect(function () {
    setCentrifugeCost(lwc.current.cost);
  }, [centrifugeBought]);
  /* Reactor */

  React.useEffect(function () {
    setReactorCost(lwr.current.cost);
  }, [reactorBought]);
  /* Fuel and Mine */

  function mine_fuel() {
    player.fuels.light_water.mine_fuel();
    setFuelRegular(player.fuels.light_water.regular);
  }

  function buy_mine() {
    player.fuels.light_water.mine.buy();
    setMineBought(player.fuels.light_water.mine.bought);
  }

  let FuelMineComponent = /*#__PURE__*/React.createElement("div", {
    className: "bg-washed-yellow b--dark-gray b--solid br2 bw1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom"
  }, "Uranium Fuel"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Mine Upgrades: ", notation(mineBought)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Uranium Fuel: ", notation(fuelRegular)), /*#__PURE__*/React.createElement("br", null), props.unlocked.light_water.centrifuge ? /*#__PURE__*/React.createElement("span", null, "Enriched Fuel: ", notation(fuelEnriched)) : /*#__PURE__*/React.createElement(React.Fragment, null)))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mb1 pa1 bg-green b--dark-green br1 bw1",
    onClick: mine_fuel
  }, "Mine Uranium Fuel")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mt1 pa1 " + (mineBuyable ? "bg-green b--dark-green" : "bg-light-red b--dark-red") + " br1 bw1",
    onClick: buy_mine
  }, "Upgrade Mining for ", notation(mineCost), " Energy"))))));
  /* Centrifuge */

  function load_fuel_lwc() {
    player.centrifuges.light_water.load_fuel();
    setFuelRegular(zero);
  }

  function buy_centrifuge() {
    player.centrifuges.light_water.buy();
    setCentrifugeBought(player.centrifuges.light_water.bought);
  }

  const CentrifugeComponent = /*#__PURE__*/React.createElement("div", {
    className: "bg-washed-yellow b--dark-gray b--solid br2 bw1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom"
  }, "Centrifuge"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Centrifuge Upgrades: ", notation(centrifugeBought)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Stored Uranium Fuel: ", notation(centrifugeFuelStored))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center mt3",
    style: {
      minWidth: "90%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start bg-red b--dark-gray b--solid br2 bw1",
    style: {
      minHeight: "2em",
      minWidth: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-green br1 bw1",
    style: {
      minHeight: "1.75em",
      minWidth: centrifugeTime / 80 + "%"
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mb1 pa1 bg-green b--dark-green br1 bw1",
    onClick: load_fuel_lwc
  }, "Load Uranium Fuel")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mt1 pa1 " + (centrifugeBuyable ? "bg-green b--dark-green" : "bg-light-red b--dark-red") + " br1 bw1",
    onClick: buy_centrifuge
  }, "Upgrade Centrifuges for ", notation(centrifugeCost), " Energy"))))));
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

  const ReactorComponent = /*#__PURE__*/React.createElement("div", {
    className: "bg-washed-yellow b--dark-gray b--solid br2 bw1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom"
  }, "Light Water Reactor"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center h4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tc"
  }, /*#__PURE__*/React.createElement("span", null, "Reactor Upgrades: ", notation(reactorAmount)), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "Loaded Fuel: ", notation(reactorFuel))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center ma2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mb1 pa1 bg-green b--dark-green br1 bw1",
    onClick: load_fuel_lwr
  }, "Load ", reactorFuelEnrichment ? "Enriched" : "Uranium", " Fuel")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "w-100 mt1 pa1 " + (reactorBuyable ? "bg-green b--dark-green" : "bg-light-red b--dark-red") + " br1 bw1",
    onClick: buy_lwr
  }, "Upgrade Reactors for ", notation(reactorCost), " Energy"))))));
  return !mobile ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, centrifugeBought > 4 && centrifugeFuelStored.gt(1e3) ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bg-light-green b--dark-green b--solid br1 bw1 f2",
    onClick: overspin
  }, "Overspin")) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center vh-50 w-100"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center h-100 w-25"
  }, FuelMineComponent), props.unlocked.light_water.centrifuge ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center h-100 w-25 pa1"
  }, CentrifugeComponent) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center h-100 w-25 pa1"
  }, ReactorComponent))) : /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center pa1"
  }, FuelMineComponent)), props.unlocked.light_water.centrifuge ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center pa1"
  }, CentrifugeComponent)) : /*#__PURE__*/React.createElement(React.Fragment, null), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-column items-center justify-center pa1"
  }, ReactorComponent)));
}