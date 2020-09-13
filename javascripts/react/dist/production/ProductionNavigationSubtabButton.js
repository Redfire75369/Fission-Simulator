class ProductionNavigationSubtabButton extends ReactStateComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      tab: this.props.tab
    };
  }

  tick() {
    this.setState({
      active: player.navigation.production === this.state.text.toLowerCase(),
      unlocked: player.unlocked.mines || player.energy.gt(250)
    });
  }

  showProductionTab() {
    player.navigation.production = this.state.tab;
  }

  render() {
    return /*#__PURE__*/React.createElement("button", {
      onClick: this.showProductionTab.bind(this),
      className: this.state.active ? "navigation--active" : "",
      style: {
        display: this.state.unlocked ? "" : "none"
      }
    }, this.state.text);
  }

}
