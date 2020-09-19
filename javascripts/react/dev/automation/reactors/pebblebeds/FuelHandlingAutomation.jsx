class PebblebedFuelHandlingAutomationComponent extends ReactStateComponent {
	tick() {
		this.setState({
			unlockedUpgrade: player.prestiges > 1,
			active: player.automation.reactors.pebblebeds.fuel[this.props.tier].active,
			interval: player.automation.reactors.pebblebeds.fuel[this.props.tier].interval,
			cooldownPercentage: min(1, player.automation.reactors.pebblebeds.fuel[this.props.tier].cooldown / player.automation.reactors.pebblebeds.fuel[this.props.tier].interval),
			cost: new Decimal(1000),
			reprocessActive: player.automation.fuels.triso[this.props.tier].active,
			reprocessInterval: player.automation.fuels.triso[this.props.tier].interval,
			reprocessCooldownPercentage: min(1, player.automation.fuels.triso[this.props.tier].cooldown / player.automation.fuels.triso[this.props.tier].interval),
			reprocessCost: new Decimal(1000)
		});
	}

	toggle() {
		player.automation.reactors.pebblebeds.fuel[this.props.tier].active = !player.automation.reactors.pebblebeds.fuel[this.props.tier].active;
	}
	decreaseInterval() {
		player.automation.reactors.pebblebeds.fuel[this.props.tier].interval = max(25, player.automation.reactors.pebblebeds.fuel[this.props.tier].interval * 0.95);
	}

	reprocessToggle() {
		player.automation.fuels.triso[this.props.tier].active = !player.automation.fuels.triso[this.props.tier].active;
	}
	decreaseReprocessInterval() {
		player.automation.fuels.triso[this.props.tier].interval = max(25, player.automation.fuels.triso[this.props.tier].interval * 0.95);
	}

	render() {
		return (
			<div className="flex-col fuelhandlingautomationdiv">
				<div className="flex-row">
					<div className="flex-col">
						<div><b>Pebblebed Reactor Fuel Handling</b></div>
						<div>Interval: {this.state.interval} ms</div>
						<div className="cooldown">
							<div style={{width: this.state.cooldownPercentage * 100 + "%"}}/>
						</div>
					</div>
					<div className="flex-col">
						<div>
							<button onClick={this.toggle.bind(this)} className={this.state.active ? "active" : "inactive"}>{this.state.active ? "Deactivate" : "Activate"} Automation</button>
						</div>
						<div style={{display: this.state.unlockedUpgrade ? "" : "none"}}>
							<button onClick={this.decreaseInterval.bind(this)} className="fuelhandlingautomationbtn">Decrease Automation Interval for {notation(this.state.cost)}</button>
						</div>
					</div>
				</div>

				<div className="flex-row">
					<div className="flex-col">
						<div><b>TRISO Fuel Reprocessing</b></div>
						<div>Interval: {this.state.reprocessInterval} ms</div>
						<div className="cooldown">
							<div style={{width: this.state.reprocessCooldownPercentage * 100 + "%"}}/>
						</div>
					</div>
					<div className="flex-col">
						<div>
							<button onClick={this.reprocessToggle.bind(this)} className={this.state.reprocessActive ? "active" : "inactive"}>{this.state.reprocessActive ? "Deactivate" : "Activate"} Automation</button>
						</div>
						<div style={{display: this.state.unlockedUpgrade ? "" : "none"}}>
							<button onClick={this.decreaseReprocessInterval.bind(this)} className="fuelhandlingautomationbtn">Decrease Automation Interval for {notation(this.state.reprocessCost)}</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
