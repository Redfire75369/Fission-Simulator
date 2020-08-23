class ProductionNavigationButton extends ReactStateComponent {
	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text,
			tab: this.props.tab,
			unlocked: true
		};
		this.showProductionTab = this.showProductionTab.bind(this);
	}

	tick() {
		this.setState({
			active: player.navigation.production == this.state.text.toLowerCase()
		});
	}

	showProductionTab() {
		player.navigation.production = this.state.tab;
	}

	render() {
		return /*#__PURE__*/React.createElement("button", {
			onClick: this.showProductionTab,
			className: this.state.active ? "navigation--active" : "",
			style: {
				display: this.state.unlocked ? "" : "none"
			}
		}, this.state.text);
	}

}

class ProductionMinesNavigationButton extends ProductionNavigationButton {
	tick() {
		this.setState({
			active: player.navigation.production == this.state.text.toLowerCase(),
			unlocked: player.unlocked.mines || player.energy.gt(250)
		});
	}

}
