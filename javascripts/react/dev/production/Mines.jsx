const mineTypes = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];

class MinesComponent extends ReactStateComponent {
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
			construction: getMineGain(),
			constructionCost: player.mines.constructionCost,
			type: player.mines.tier < 0 ? "None" : mineTypes[player.mines.tier],
			upgradeText: player.mines.tier === -1 ? "Buy a mine" : "Upgrade mines to use " + this.state.type + " Drills",
			cost: player.mines.upCost,
			upgradable: player.mines.upgradable,
			canSalvage: player.mines.depleted.gt(0),
			softcapped: player.mines.amount.gte(mineSoftCaps[this.state.tier])
		});
	}

	render() {
		return (
			<div style={{display: this.state.active ? "" : "none"}}>
				<div style={{display: this.state.requirementUnlocked ? "" : "none", fontSize: "200%"}}>Obtain 500 Energy to unlock</div>
				<div className="minesdiv" style={{display: this.state.unlocked ? "" : "none"}}>
					<div style={{display: this.state.bought ? "" : "none"}}>
						<div className="flex-row info">
							<div className="flex-col horizontal-center">
								<div><b>Information</b></div>
								<div>Active: {notation(this.state.activeMines)}</div>
								<div>Depleted: {notation(this.state.depleted)}</div>
							</div>
						</div>

						<div className="body">
							<div className="flex-col horizontal-center">
								<div>Metal Extraction: {notation(this.state.extraction)}/s</div>
								<div>Mine Construction: {notation(this.state.construction)}/s ({notation(this.state.constructionCost)} per Mine)</div><br/>
								<div>Drill Tier: {this.state.type}</div>
							</div>
						</div>
					</div>

					<div className="flex-col actions">
						<button onClick={function() {player.mines.upgrade();}} className={this.state.upgradable ? "storebtn buy" : "storebtn locked"} style={{display: this.state.atMaxTier ? "none" : ""}}>
							{this.state.upgradeText}<br/>
							Cost: {notation(this.state.cost)} Energy
						</button>
						<button onClick={function() {player.mines.salvage();}} className={this.state.canSalvage ? "storebtn buy" : "storebtn locked"} style={{display: this.state.bought ? "" : "none"}}>
							Salvage depleted mines into new mines
						</button>
					</div>
				</div>
			</div>
		);
	}
}
