class GenericUpgrade {
	constructor(cost, tiers = 1, scale = 1) {
		this.startCost = cost;
		this.tiers = tiers;
		this.scaleCost = scale;
		this.bought = 0;
	}

	get cost() {
		return this.startCost.mul(this.scaleCost.pow(this.bought));
	}
	get mult() {
		return new Decimal(1);
	}
}
