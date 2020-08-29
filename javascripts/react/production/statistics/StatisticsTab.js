class StatisticsTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "statistics_tab",
      totalTime: player.time,
      totalEnergy: player.totalEnergy,
      totalNanites: player.nanites.total,
      unlockedMeltdown: player.unlocked.meltdown,
      bestMeltdownTime: player.meltdown.bestTime
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col statistics",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", null, "Total time played: ", formatTime(this.state.totalTime)), /*#__PURE__*/React.createElement("div", null, "Total energy generated: ", notation(this.state.totalEnergy)), /*#__PURE__*/React.createElement("div", null, "Total nanites researched: ", notation(this.state.totalNanites)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.unlockedMeltdown ? "" : "none"
      }
    }, "Fastest Meltdown Time: ", formatTime(this.state.bestMeltdownTime)));
  }

}