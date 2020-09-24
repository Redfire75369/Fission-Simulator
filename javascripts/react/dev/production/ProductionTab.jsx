class ProductionTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "production_tab"
		});
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<div>
					<MinesComponent/>
				</div>

				<div>
					<FissionReactorsSubTabComponent/>
				</div>
			</div>
		);
	}
}
