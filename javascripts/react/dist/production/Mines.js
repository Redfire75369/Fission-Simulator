const mineTypes = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];

function MinesComponent() {
  const [active, setActive] = React.useState(false);
  const [unlockedRequirement, setUnlockedRequirement] = React.useState(false);
  const [unlocked, setUnlocked] = React.useState(false);
  const [unlockedSalvage, setUnlockedSalvage] = React.useState(false);
  const [bought, setBought] = React.useState(false);
  const [maxTier, setMaxTier] = React.useState(false);
  const [activeMines, setActiveMines] = React.useState(zero);
  const [depleted, setDepleted] = React.useState(zero);
  const [extraction, setExtraction] = React.useState(zero);
  const [construction, setConstruction] = React.useState(zero);
  const [type, setType] = React.useState("");
  const [upgradeText, setUpgradeText] = React.useState("");
  const [cost, setCost] = React.useState(zero);
  const [canUpgrade, setCanUpgrade] = React.useState(false);
  const [canSalvage, setCanSalvage] = React.useState(false);
  const [softcapped, setSoftcapped] = React.useState(false);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setActive(player.navigation.production === "mines");
      setUnlockedRequirement(player.energy.gt(1e580) && !player.unlocked.mines);
      setUnlocked(player.unlocked.mines);
      setUnlockedSalvage(player.mines.tier > 0);
      setBought(player.mines.tier > -1);
      setMaxTier(player.mines.tier > 6);
      setActiveMines(player.mines.amount.sub(player.mines.depleted));
      setDepleted(player.mines.depleted);
      setExtraction(player.mines.metalExtraction);
      setConstruction(getMineGain());
      setType(player.mines.tier < 0 ? "None" : mineTypes[player.mines.tier]);
      setUpgradeText(player.mines.tier === -1 ? "Buy a mine" : "Upgrade mines to use " + mineTypes[player.mines.tier + 1] + " Drills");
      setCost(player.mines.upCost);
      setCanUpgrade(player.mines.upgradable);
      setCanSalvage(player.mines.depleted.gt(0));
      setSoftcapped(player.mines.amount.gte(mineSoftCaps[player.mines.tier]));
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: active ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: unlockedRequirement ? "" : "none",
      fontSize: "200%"
    }
  }, "Obtain 500 Energy to unlock"), /*#__PURE__*/React.createElement("div", {
    className: "minesdiv",
    style: {
      display: unlocked ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: bought ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col horizontal-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bold"
  }, "Information"), /*#__PURE__*/React.createElement("div", null, "Active: ", notation(activeMines)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(depleted)))), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col horizontal-center"
  }, /*#__PURE__*/React.createElement("div", null, "Metal Extraction: ", notation(extraction), "/s"), /*#__PURE__*/React.createElement("div", null, "Mine Construction: ", notation(construction), "/s"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "Drill Tier: ", type)))), /*#__PURE__*/React.createElement("div", {
    className: "flex-col actions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      player.mines.upgrade();
    },
    className: canUpgrade ? "storebtn buy" : "storebtn locked",
    style: {
      display: maxTier ? "none" : ""
    }
  }, upgradeText, /*#__PURE__*/React.createElement("br", null), "Cost: ", notation(cost), " Energy"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      player.mines.salvage();
    },
    className: canSalvage ? "storebtn buy" : "storebtn locked",
    style: {
      display: unlockedSalvage ? "" : "none"
    }
  }, "Salvage depleted mines into new mines"))));
}