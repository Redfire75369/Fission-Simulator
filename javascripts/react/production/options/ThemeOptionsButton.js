class ThemeOptionsButtonComponent extends ReactStateComponent {
  tick() {
    this.setState({
      theme: player.options.theme
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: themeChange
    }, "Theme: ", this.state.theme);
  }

}