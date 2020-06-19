class NaniteUpgrade extends GenericUpgrade {
	constructor(up, cost) {
		constructor(up, cost, 1, 0);
	}
	constructor(up, cost, tiers, scale) {
		this.up = up;
		super(cost, tiers, scale);
	}

	get buyable() {
		return player.nanites.nanites.gte(this.cost) && this.bought < this.tiers;
	}

	buy() {
		if (this.buyable) {
			player.nanites.nanites = player.nanites.nanites.sub(this.cost);
			this.bought++;
		}
	}

	get mult() {
		return new Decimal(1);
	}
}