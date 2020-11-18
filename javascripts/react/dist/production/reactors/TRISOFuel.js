/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const trisoFuelTypes = ["TBU", "LEU-235", "LEP-239"];

function TRISOFuelComponent(props) {
  const [type, setType] = React.useState(trisoFuelTypes[props.tier]);
  const [unlocked, setUnlocked] = React.useState(false);
  const [unlockedReprocessing, setUnlockedReprocessing] = React.useState(false);
  const [hasFuel, setHasFuel] = React.useState(false);
  const [enriched, setEnriched] = React.useState(zero);
  const [enrichedPercentage, setEnrichedPercentage] = React.useState(0);
  const [depleted, setDepleted] = React.useState(zero);
  const [canReprocess, setCanReprocess] = React.useState(false);
  const [reprocessCost, setReprocessCost] = React.useState(zero);
  const [reprocessing, setReprocessing] = React.useState(false);
  const [gain, setGain] = React.useState(zero);
  const [goal, setGoal] = React.useState(zero);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setUnlocked(function (prevUnlocked) {
        return prevUnlocked || player.mines.tier > -1 && (props.tier === 0 || player.energy.gte(player.reactors.pebblebeds[props.tier].startCost));
      });
      setUnlockedReprocessing(player.mines.tier > 0);
      setHasFuel(player.fuels.triso[props.tier].enriched.add(player.fuels.triso[props.tier].depleted).gt(0));
      setEnriched(player.fuels.triso[props.tier].enriched);
      setEnrichedPercentage(player.fuels.triso[props.tier].enriched.div(player.fuels.triso[props.tier].enriched.add(player.fuels.triso[props.tier].depleted)).toNumber());
      setDepleted(player.fuels.triso[props.tier].depleted);
      setCanReprocess(player.fuels.triso[props.tier].canReprocessDepleted);
      setReprocessCost(player.fuels.triso[props.tier].reprocessEnergyCost);
      setReprocessing(reprocessing[props.tier]);
      setGain(getTRISOFuelGain(props.tier));

      if (props.tier === 2) {
        setGoal(prestigeGoal());
      }
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function reprocessDepleted() {
    player.fuels.triso[props.tier].reprocessDepleted();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "trisodiv",
    style: {
      display: unlocked ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row title"
  }, /*#__PURE__*/React.createElement("div", {
    className: "type"
  }, /*#__PURE__*/React.createElement("b", null, type, " TRISO Fuel")), /*#__PURE__*/React.createElement("div", {
    className: "tooltip info"
  }, "i", /*#__PURE__*/React.createElement("div", {
    className: "tooltiptext",
    style: {
      fontSize: "90%",
      maxWidth: "15vw",
      minWidth: "15vw",
      padding: "1vw"
    }
  }, "Mines are producing ", notation(gain), " Enriched ", type, " Fuel per second.", /*#__PURE__*/React.createElement("br", null), props.tier !== 2 ? /*#__PURE__*/React.createElement("span", null, "Depleted ", type, " Fuel can be reprocessed into Enriched ", trisoFuelTypes[props.tier + 1], " Fuel") : /*#__PURE__*/React.createElement("span", null, "Reprocessing ", notation(goal), " Depleted LEP-239 Fuel will result in a prestige")))), /*#__PURE__*/React.createElement("div", {
    className: "flex-row body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-top fuelinfo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bold"
  }, "Fuel Pebbles"), /*#__PURE__*/React.createElement("div", null, "Enriched: ", notation(enriched)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(depleted))), /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-top reprocess",
    style: {
      display: unlockedReprocessing ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Fuel Handling:"), /*#__PURE__*/React.createElement("button", {
    onClick: reprocessDepleted,
    className: canReprocess ? "trisobtn buy" : "trisobtn locked",
    id: "fuel_triso_reprocess" + (props.tier + 1)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transition: reprocessing ? player.fuels.triso[props.tier].reprocessingTime / 1000 + "s width linear" : "",
      width: reprocessing ? "100%" : "0"
    }
  }), "Reprocess Depleted ", type, " Fuel Pebbles for ", notation(reprocessCost), " Energy"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-row horizontal-center fuelbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: hasFuel ? "100%" : "0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: enrichedPercentage * 100 + "%"
    }
  })))))));
}
