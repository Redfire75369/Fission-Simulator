class GasCoolantStatsComponent extends ReactStateComponent {
	constructor(props) {
		super(props);

		this.state = {
			tier: this.props.tier
		};
	}

	tick() {
		this.setState({
			heatCapacity: gasCoolants[this.state.tier].heatCapacity,
			flowRate: gasCoolants[this.state.tier].flowRate,
			nobility: gasCoolants[this.state.tier].nobility,
			fuelEfficiency: gasCoolants[this.state.tier].fuelEfficiency
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
