function AchievementsTabComponent() {
  const [active, setActive] = React.useState(false);
  React.useEffect(function () {
    const timerID = setInterval(function () {
      setActive(player.navigation.naviTab === "achievements_tab");
    }, 50);
    return function () {
      clearInterval(timerID);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-col",
    style: {
      display: active ? "" : "none"
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