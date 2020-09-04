class ProductionMinesNavigationSubtabButton extends ProductionNavigationSubtabButton {
  tick() {
    this.setState({
      active: player.navigation.production === this.state.text.toLowerCase(),
      unlocked: player.unlocked.mines || player.energy.gt(250)
    });
  }

}