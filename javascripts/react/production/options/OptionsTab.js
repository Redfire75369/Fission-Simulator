class OptionsTabComponent extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.naviTab === "options_tab"
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-col options"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement(NotationOptionsButtonComponent, null), /*#__PURE__*/React.createElement(ThemeOptionsButtonComponent, null)), /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save
    }, "Save"), /*#__PURE__*/React.createElement("button", {
      onClick: load
    }, "Load")), /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: importSave
    }, "Import Save"), /*#__PURE__*/React.createElement("button", {
      onClick: exportSave
    }, "Export Save")), /*#__PURE__*/React.createElement("div", {
      className: "flex-row"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: hardReset
    }, "Hard Reset"), /*#__PURE__*/React.createElement("button", {
      onClick: enableCheatsTab
    }, "Stuff")));
  }

}