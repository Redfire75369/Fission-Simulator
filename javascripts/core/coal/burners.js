class CoalBurner {
	constructor() {
		this.criticality = 0.00001;
	}

	get cost() {
		return this.bought
	}
	get buyable() {
		return player.energy.gt(this.cost);
	}
	
	buy() {
		if (this.buyable) {
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}

	get burnRate() {
		return this.amount.mul(0.02);
	}
}

function simulateCoalBurners(tickInterval = 50) {
	if (player.coal.burners.burnRate.gt(0)) {
		player.coal.fuel = player.coal.fuel.sub(player.coal.burners.burnRate.mul(tickInterval / 1000));
	}
}
	