class FissionReactorsSubTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.production === "reactors"
		});
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<div className="flex-row">
					<TRISOFuelComponent tier={0}/>
					<TRISOFuelComponent tier={1}/>
					<TRISOFuelComponent tier={2}/>
				</div>
				<div className="flex-row">
					<PebblebedFissionReactorComponent tier={0}/>
					<PebblebedFissionReactorComponent tier={1}/>
					<PebblebedFissionReactorComponent tier={2}/>
				</div>
			</div>
		);
	}
}
