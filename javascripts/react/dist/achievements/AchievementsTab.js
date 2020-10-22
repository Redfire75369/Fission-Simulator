class AchievementsTabComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount() {
    this.timerID = setInterval(function () {
      this.setState({
        active: player.navigation.naviTab === "achievements_tab"
      });
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col",
      style: {
        display: this.state.active ? "" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
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
      className: "flex-row"
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