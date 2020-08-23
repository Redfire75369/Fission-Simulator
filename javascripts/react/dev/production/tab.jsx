class TRISOFuelsComponent extends React.Component {
	render() {
		return (
			<div className={"flex__row"}>
				<TRISOFuelComponent tier={0}/>
				<TRISOFuelComponent tier={1}/>
				<TRISOFuelComponent tier={2}/>
			</div>
		);
	}
}

class PebblebedReactorsComponent extends React.Component {
	render() {
		return (
			<div className={"flex__row"}>
				<PebblebedReactorComponent tier={0}/>
				<PebblebedReactorComponent tier={1}/>
				<PebblebedReactorComponent tier={2}/>
			</div>
		);
	}
}


class PebblebedReactorsSubSubTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.production === "reactors"
		});
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<TRISOFuelsComponent/>
				<div className="flex__row" style={{minHeight: "2vh"}}></div>
				<PebblebedReactorsComponent/>
			</div>
		);
	}
}

class ProductionTab extends ReactStateComponent {
	tick() {
		this.setState({
			unlockedMines: player.unlocked.mines || player.energy.gt(250)
		});
	}

	render() {
		return (
			<div>
				<div className="navigation subtab">
					<ProductionMinesNavigationButton tab={"mines"} text={"Mines"}/>
					<ProductionNavigationButton tab={"reactors"} text={"Reactors"}/>
				</div>

				<div>
					<MinesComponent/>
				</div>

				<div>
					<PebblebedReactorsSubSubTabComponent/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<ProductionTab/>, document.getElementById("production_tab"));
