class GenericEnergyProducer extends GenericProducer {
	constructor(start, scale, secScale = 10, scalePrice = 308) {
		super(start, scale, secScale, scalePrice);
	}

	get buyable() {
		return player.energy.gte(this.cost) && this.cost.lt(getLimit());
	}

	buy() {
		if (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}
	buyBulk(bulk) {
		for (let i = 0; i < bulk + 1 && this.buyable; i++) {
			player.energy = player.energy.sub(this.cost);
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}
	buyMax() {
		while (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}
}
