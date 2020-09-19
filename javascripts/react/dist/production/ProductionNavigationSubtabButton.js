class ProductionNavigationSubtabButton extends ReactStateComponent {
  tick() {
    this.setState({
      active: player.navigation.production === this.props.text.toLowerCase(),
      unlocked: player.unlocked.mines || player.energy.gt(250)
    });
  }

  showProductionTab() {
    player.navigation.production = this.props.tab;
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: this.showProductionTab.bind(this),
      className: this.state.active ? "navigation--active" : "",
      style: {
        display: this.state.unlocked ? "" : "none"
      }
    }, this.props.text);
  }

}
