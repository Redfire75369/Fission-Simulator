class ProductionNavigationSubtabButton extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text,
			tab: this.props.tab,
			unlocked: true
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
		return (
			<button onClick={this.showProductionTab.bind(this)} className={this.state.active ? "navigation--active" : ""} style={{display: this.state.unlocked ? "" : "none"}}>{this.state.text}</button>
		);
	}
}
