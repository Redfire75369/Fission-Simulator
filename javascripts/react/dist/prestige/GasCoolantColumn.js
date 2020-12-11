/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
function GasCoolantColumnComponent(props) {
  const [percentage, setPercentage] = React.useState(1 / 40);
  const [research, setResearch] = React.useState(1);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setPercentage(log(max(player.prestige.researches[0], player.prestige.researches[1], player.prestige.researches[2], player.prestige.researches[3]) + 1, 2) / 40);
      setResearch(player.prestige.researches[props.type]);
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);

  function assignResearch() {
    assignResearch(props.type);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-bottom",
    style: {
      maxHeight: "min(48vw, 40vh)",
      minHeight: "min(48vw, 48vh)",
      width: "min(20vw, 30vh)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: assignResearch,
    style: {
      marginBottom: "min(2vw, 2vh)",
      maxHeight: "min(6vw, 6vh)",
      minHeight: "min(6vw, 6vh)",
      width: "min(6vw, 6vh)"
    }
  }, "\u25B2"), /*#__PURE__*/React.createElement("div", {
    className: "flex-col vertical-bottom",
    style: {
      maxHeight: "min(40vw, 40vh)",
      minHeight: "min(40vw, 40vh)",
      width: "min(20vw, 20vh)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundColor: props.colour,
      maxHeight: "min(" + log(research, 2) / percentage + "vh, " + log(research, 2) / percentage + "vw)",
      minHeight: "min(" + log(research, 2) / percentage + "vh, " + log(research, 2) / percentage + "vw)",
      width: "min(18vw, 18vh)"
    }
  })), /*#__PURE__*/React.createElement("span", null, props.name));
}