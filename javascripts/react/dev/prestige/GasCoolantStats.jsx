class GasCoolantStatsComponent extends ReactStateComponent {
	tick() {
		this.setState({
			heatCapacity: gasCoolants[this.props.tier].heatCapacity,
			flowRate: gasCoolants[this.props.tier].flowRate,
			nobility: gasCoolants[this.props.tier].nobility,
			fuelEfficiency: gasCoolants[this.props.tier].fuelEfficiency
		});
	}

	render() {
		return (
			<div className="flex-col vertical-top" style={{margin: "4vw"}}>
				<div>Coolant Stats</div>
				<div>Heat Capacity: {notation(this.state.heatCapacity)}</div>
				<div>Flow Rate: {notation(this.state.flowRate)}</div>
				<div>Nobility: {notation(this.state.nobility)}</div>
				<div>Fuel Efficiency: {notation(this.state.fuelEfficiency)}</div>
			</div>
		);
	}
}
