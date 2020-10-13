function PebblebedFuelHandlingAutomationComponent(props) {
  const [unlocked, setUnlocked] = React.useState(false);
  const [unlockedUpgrade, setUnlockedUpgrade] = React.useState(false);
  const [activeHandling, setActiveHandling] = React.useState(false);
  const [intervalHandling, setIntervalHandling] = React.useState(null);
  const [cooldownHandling, setCooldownHandling] = React.useState(0);
  const [costHandling, setCostHandling] = React.useState(zero);
  const [activeReprocessing, setActiveReprocessing] = React.useState(null);
  const [intervalReprocessing, setIntervalReprocessing] = React.useState(null);
  const [cooldownReprocessing, setCooldownReprocessing] = React.useState(0);
  const [costReprocessing, setCostReprocessing] = React.useState(zero);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setUnlocked(function (prevUnlocked) {
        return prevUnlocked || player.energy.gte(player.reactors.pebblebeds[props.tier].mul(1e9));
      });
      setUnlockedUpgrade(player.prestiges > 1);
      setActiveHandling(player.automation.reactors.pebblebeds.fuel[props.tier].active);
      setIntervalHandling(player.automation.reactors.pebblebeds.fuel[props.tier].interval);
      setCooldownHandling(min(1, player.automation.reactors.pebblebeds.fuel[props.tier].cooldown / player.automation.reactors.pebblebeds.fuel[props.tier].interval));
      setCostHandling(new Decimal(1000));
      setActiveReprocessing(player.automation.fuels.triso[props.tier].active);
      setIntervalReprocessing(player.automation.fuels.triso[props.tier].interval);
      setCooldownReprocessing(min(1, player.automation.fuels.triso[props.tier].cooldown / player.automation.fuels.triso[props.tier].interval));
      setCostReprocessing(new Decimal(1000));
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function toggleHandling() {
    player.automation.reactors.pebblebeds.fuel[props.tier].active = !player.automation.reactors.pebblebeds.fuel[props.tier].active;
  }

  function decreaseIntervalHandling() {
    player.automation.reactors.pebblebeds.fuel[props.tier].interval = max(25, player.automation.reactors.pebblebeds.fuel[props.tier].interval * 0.95);
  }

  function toggleReprocessing() {
    player.automation.fuels.triso[props.tier].active = !player.automation.fuels.triso[props.tier].active;
  }

  function decreaseIntervalReprocessing() {
    player.automation.fuels.triso[props.tier].interval = max(25, player.automation.fuels.triso[props.tier].interval * 0.95);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex-col fuelhandlingautomationdiv"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Pebblebed Reactor Fuel Handling")), /*#__PURE__*/React.createElement("div", null, "Interval: ", intervalHandling, " ms"), /*#__PURE__*/React.createElement("div", {
    className: "cooldown"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: cooldownHandling * 100 + "%"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex-col"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: toggleHandling,
    className: activeHandling ? "active" : "inactive"
  }, activeHandling ? "Deactivate" : "Activate", " Automation")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: unlockedUpgrade ? "" : "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: decreaseIntervalHandling,
    className: "fuelhandlingautomationbtn"
  }, "Decrease Automation Interval for ", notation(costHandling))))));
}