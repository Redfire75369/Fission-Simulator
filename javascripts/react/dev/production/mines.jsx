class MinesComponent extends ReactStateComponent {
	constructor(props) {
		super(props);

		this.upgrade = this.upgrade.bind(this);
		this.salvage = this.salvage.bind(this);
	}

	tick() {
		this.setState({
			active: player.navigation.production === "mines",
			requirementUnlocked: player.energy.gt(250) && !player.unlocked.mines,
			unlocked: player.unlocked.mines,
			bought: player.mines.tier >= 0,
			atMaxTier: player.mines.tier >= 7,
			activeMines: player.mines.amount.sub(player.mines.depleted),
			depleted: player.mines.depleted,
			extraction: player.mines.metalExtraction,
			ore: player.mines.totalOre,
			construction: getMineGain(),
			constructionCost: player.mines.constructionCost,
			type: player.mines.tier < 0 ? "None" : mineTypes[player.mines.tier],
			upgradeText: player.mines.tier == -1 ? "Buy a mine" : "Upgrade mines to use " + this.state.type + " Drills",
			cost: player.mines.upCost,
			upgradable: player.mines.upgradable,
			canSalvage: player.mines.depleted.gt(0)
		});
	}

	upgrade() {
		player.mines.upgrade();
	}
	salvage() {
		player.mines.salvage();
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<div style={{display: this.state.requirementUnlocked ? "" : "none", fontSize: "40px"}}>Obtain 500 Energy to unlock</div>
				<div className="minesdiv" style={{display: this.state.unlocked ? "" : "none"}}>
					<div style={{display: this.state.bought ? "" : "none"}}>
						<div className="info">
							<div className="flex__col">
								<div><b>Information</b></div>
								<div>Active: {notation(this.state.activeMines)}</div>
								<div>Depleted: {notation(this.state.depleted)}</div>
								{/*<div>Effective: {this.state.effective}</div>*/}
							</div>
						</div>

						<div className="body">
							<div className="flex__col">
								<div>Metal Extraction: {notation(this.state.extraction)}/s ({notation(this.state.ore)} Total)</div>
								<div>Mine Construction: {notation(this.state.construction)}/s ({notation(this.state.constructionCost)} per Mine)</div><br/>
								<div>Drill Tier: {this.state.type}</div>
							</div>
						</div>
					</div><br/><br/>

					<div className="flex__col actions">
						<button onClick={this.upgrade} className={this.state.upgradable ? "storebtn buy" : "storebtn locked"} style={{display: this.state.atMaxTier ? "none" : ""}}>
							{this.state.upgradeText}<br/>
							Cost: {notation(this.state.cost)} Energy
						</button>
						<button onClick={this.salvage} className={this.state.canSalvage ? "storebtn buy" : "storebtn locked"} style={{display: this.state.bought ? "" : "none"}}>
							Salvage depleted mines into new mines
						</button>
					</div>
				</div><br/>
			</div>
		);
	}
}
