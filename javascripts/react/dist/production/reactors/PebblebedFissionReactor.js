const pebblebedReactorTypes = ["TBU", "LEU-235", "LEP-239"];

function PebblebedFissionReactorComponent(props) {
  const [type, setType] = React.useState(pebblebedReactorTypes[props.tier]);
  const [unlocked, setUnlocked] = React.useState(false);
  const [unlockedFuelHandling, setUnlockedFuelHandling] = React.useState(false);
  const [unlockedMines, setUnlockedMines] = React.useState(false);
  const [amount, setAmount] = React.useState(zero);
  const [bought, setBought] = React.useState(0);
  const [canLoadFuel, setCanLoadFuel] = React.useState(false);
  const [canEjectWaste, setCanEjectWaste] = React.useState(false);
  const [fuel, setFuel] = React.useState(zero);
  const [fuelPercentage, setFuelPercentage] = React.useState(0);
  const [spent, setSpent] = React.useState(zero);
  const [spentPercentage, setSpentPercentage] = React.useState(zero);
  const [buyable, setBuyable] = React.useState(false);
  const [cost, setCost] = React.useState(zero);
  const [burnRate, setBurnRate] = React.useState(zero);
  const [totalCapacity, setTotalCapacity] = React.useState(zero);
  const [gain, setGain] = React.useState(zero);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setUnlocked(props.tier === 0 || player.reactors.pebblebeds[props.tier - 1].bought > 0);
      setUnlockedFuelHandling(function (prevUnlockedFuelHandling) {
        return prevUnlockedFuelHandling || player.energy.gte(600);
      });
      setUnlockedMines(player.mines.tier + 1 > props.tier);
      setAmount(player.reactors.pebblebeds[props.tier].amount);
      setBought(player.reactors.pebblebeds[props.tier].bought);
      setCanLoadFuel(player.fuels.triso[props.tier].enriched.gte(1) && player.reactors.pebblebeds[props.tier].fuel.add(player.reactors.pebblebeds[props.tier].spent).add(1).lt(player.reactors.pebblebeds[props.tier].totalCapacity));
      setCanEjectWaste(player.reactors.pebblebeds[props.tier].spent.gte(1));
      setFuel(player.reactors.pebblebeds[props.tier].fuel);
      setFuelPercentage(player.reactors.pebblebeds[props.tier].fuel.div(player.reactors.pebblebeds[props.tier].totalCapacity).toNumber() * 100);
      setSpent(player.reactors.pebblebeds[props.tier].spent);
      setSpentPercentage(player.reactors.pebblebeds[props.tier].fuel.add(player.reactors.pebblebeds[props.tier].spent).div(player.reactors.pebblebeds[props.tier].totalCapacity).toNumber());
      setBuyable(player.reactors.pebblebeds[props.tier].buyable);
      setCost(player.reactors.pebblebeds[props.tier].cost);
      setBurnRate(player.reactors.pebblebeds[props.tier].burnRate);
      setTotalCapacity(player.reactors.pebblebeds[props.tier].totalCapacity);
      setGain(getReactorGain(props.tier));
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function mineFuel() {
    player.reactors.pebblebeds[props.tier].mineFuel();
  }

  function loadFuel() {
    player.reactors.pebblebeds[props.tier].loadFuel();
  }

  function ejectWaste() {
    player.reactors.pebblebeds[props.tier].ejectWaste();
  }

  function buy() {
    player.reactors.pebblebeds[props.tier].buy();
  }

  function buyMax() {
    player.reactors.pebblebeds[props.tier].buyMax();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "pebblebeddiv",
    style: {
      display: unlocked ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "type bold"
  }, type, " Pebblebed Reactor"), /*#__PURE__*/React.createElement("div", {
    className: "tooltip info"
  }, "i", /*#__PURE__*/React.createElement("div", {
    className: "tooltiptext",
    style: {
      fontSize: "90%",
      maxWidth: "15vw",
      minWidth: "15vw",
      padding: "1vw"
    }
  }, type, " Pebblebed Reactors convert Enriched fuel into Spent Fuel, producing energy.", /*#__PURE__*/React.createElement("br", null), unlockedMines ? /*#__PURE__*/React.createElement(React.Fragment, null, "Your mines are producing ", notation(gain), " ", type, " reactors every second.") : /*#__PURE__*/React.createElement(React.Fragment, null)))), /*#__PURE__*/React.createElement("div", {
    className: "flex-row body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-top info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bold"
  }, "Reactor Information"), /*#__PURE__*/React.createElement("div", null, "Amount: ", notation(amount), " (", bought, " Bought)"), /*#__PURE__*/React.createElement("div", {
    className: "bold"
  }, "Fuel Information"), /*#__PURE__*/React.createElement("div", null, "Capacity: ", notation(totalCapacity)), /*#__PURE__*/React.createElement("div", null, "Fuel Usage: ", notation(burnRate), "/s"), /*#__PURE__*/React.createElement("div", null, "Enriched: ", notation(fuel)), /*#__PURE__*/React.createElement("div", null, "Spent: ", notation(spent))), /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-top fuelhandling",
    style: {
      display: unlockedFuelHandling ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
    onClick: mineFuel,
    className: bought > 0 ? "pebblebedbtn buy" : "pebblebedbtn locked",
    style: {
      display: unlockedMines ? "none" : ""
    }
  }, "Mine Enriched ", type, " Pellets"), /*#__PURE__*/React.createElement("button", {
    onClick: loadFuel,
    className: canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked",
    style: {
      display: unlockedMines ? "" : "none"
    }
  }, "Load Enriched ", type, " Pellets"), /*#__PURE__*/React.createElement("button", {
    onClick: ejectWaste,
    className: canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"
  }, "Eject Spent ", type, " Pellets"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-row fuelbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: spentPercentage * 100 + "%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: fuelPercentage / spentPercentage + "%"
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-row buying"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: buy,
    className: buyable ? "pebblebedbtn buy buysingle" : "pebblebedbtn locked buysingle"
  }, "Buy for ", notation(cost), " Energy"), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: "5%",
      maxWidth: "5%"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: buyMax,
    className: buyable ? "pebblebedbtn buy buymax" : "pebblebedbtn locked buymax"
  }, "Buy Max")));
}