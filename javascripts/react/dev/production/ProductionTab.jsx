class ProductionTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "production_tab",
			unlockedMines: player.unlocked.mines || player.energy.gt(250),
			unlockedPrestige: player.unlocked.prestige,
			canPrestige: player.americium > 1,
			americium: player.americium
		});
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<div className="navigation subtab">
					<ProductionMinesNavigationButton tab={"mines"} text={"Mines"}/>
					<ProductionNavigationButton tab={"reactors"} text={"Reactors"}/>
				</div>

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
