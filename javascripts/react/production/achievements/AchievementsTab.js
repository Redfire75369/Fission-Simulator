class AchievementsTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "achievements_tab"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex__col",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex__row"
    }, /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 11
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 12
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 13
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 14
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 15
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 16
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 17
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 18
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex__row"
    }, /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 21
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 22
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 23
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 24
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 25
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 26
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 27
    }), /*#__PURE__*/React.createElement(AchievementComponent, {
      id: 28
    })));
  }

}