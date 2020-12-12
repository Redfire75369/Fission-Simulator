/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
const achievementTexts = {
  11: "Thorium Power: Buy one TBU Pebblebed Reactor.",
  12: "Minecraft 2: Buy a Mine with an iron-tipped drill.",
  13: "Thoranium: Reprocess Depleted TBU Fuel into Enriched LEU-235 Fuel.",
  14: "Capacity Overload: Reach a total capacity of 2500 LEU-235 Fuel in LEU-235 Pebblebed Reactors.",
  15: "",
  16: "",
  17: "",
  18: "",
  21: "",
  22: "",
  23: "",
  24: "",
  25: "",
  26: "",
  27: "",
  28: ""
};

class AchievementComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(function () {
      this.setState({
        completed: player.achievements[this.props.id]
      });
    }.bind(this), 50);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col align horizontal-center tooltip " + (this.state.completed ? "achcomplete" : "achlocked")
    }, /*#__PURE__*/React.createElement("img", {
      src: "resources/images/achievements/" + this.props.id + ".png",
      alt: "Achievement " + this.props.id + achievementTexts[this.props.id].split(":")[0]
    }), /*#__PURE__*/React.createElement("span", {
      className: "tooltiptext"
    }, achievementTexts[this.props.id].split(":")[0], /*#__PURE__*/React.createElement("br", null), achievementTexts[this.props.id].split(":")[1].substr(1)));
  }

}