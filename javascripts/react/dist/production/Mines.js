const mineTypes = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];

class MinesComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.production === "mines",
      requirementUnlocked: player.energy.gt(250) && !player.unlocked.mines,
      unlocked: player.unlocked.mines,
      unlockedSalvage: player.mines.tier > 0,
      bought: player.mines.tier > -1,
      atMaxTier: player.mines.tier > 6,
      activeMines: player.mines.amount.sub(player.mines.depleted),
      depleted: player.mines.depleted,
      extraction: player.mines.metalExtraction,
      construction: getMineGain(),
      constructionCost: player.mines.constructionCost,
      type: player.mines.tier < 0 ? "None" : mineTypes[player.mines.tier],
      upgradeText: player.mines.tier === -1 ? "Buy a mine" : "Upgrade mines to use " + mineTypes[player.mines.tier + 1] + " Drills",
      cost: player.mines.upCost,
      upgradable: player.mines.upgradable,
      canSalvage: player.mines.depleted.gt(0),
      softcapped: player.mines.amount.gte(mineSoftCaps[this.state.tier])
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.requirementUnlocked ? "" : "none",
        fontSize: "200%"
      }
    }, "Obtain 500 Energy to unlock"), /*#__PURE__*/React.createElement("div", {
      className: "minesdiv",
      style: {
        display: this.state.unlocked ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: this.state.bought ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-row info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col horizontal-center"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Information")), /*#__PURE__*/React.createElement("div", null, "Active: ", notation(this.state.activeMines)), /*#__PURE__*/React.createElement("div", null, "Depleted: ", notation(this.state.depleted)))), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-col horizontal-center"
    }, /*#__PURE__*/React.createElement("div", null, "Metal Extraction: ", notation(this.state.extraction), "/s"), /*#__PURE__*/React.createElement("div", null, "Mine Construction: ", notation(this.state.construction), "/s"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, "Drill Tier: ", this.state.type)))), /*#__PURE__*/React.createElement("div", {
      className: "flex-col actions"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        player.mines.upgrade();
      },
      className: this.state.upgradable ? "storebtn buy" : "storebtn locked",
      style: {
        display: this.state.atMaxTier ? "none" : ""
      }
    }, this.state.upgradeText, /*#__PURE__*/React.createElement("br", null), "Cost: ", notation(this.state.cost), " Energy"), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        player.mines.salvage();
      },
      className: this.state.canSalvage ? "storebtn buy" : "storebtn locked",
      style: {
        display: this.state.unlockedSalvage ? "" : "none"
      }
    }, "Salvage depleted mines into new mines"))));
  }

}