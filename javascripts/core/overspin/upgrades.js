class OverspinUpgrade {
	constructor(cost, multiplier) {
		this.bought = false;
		this.cost = cost;
		this.method = multiplier;
	}

	get buyable() {
		return player.overspin.uranium.gte(this.cost);
	}

	buy() {
		if (this.buyable) {
			player.overspin.uranium = player.overspin.uranium.sub(this.cost);
			this.bought = true;
		}
	}

	get multiplier() {
		return this.method();
	}
}
