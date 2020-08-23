class GenericEnergyProducer extends GenericProducer {
	constructor(start, scale, secScale = 10, scalePrice = 308) {
		super(start, scale, secScale, scalePrice);
	}

	get buyable() {
		return player.energy.gte(this.cost) && this.cost.lt(getLimit());
	}

	get maxBuyable() {
		if (player.energy.lt(this.scaleStartCost)) {
			return floor((player.energy.log10() - this.startCost.log10()) / this.scaleCost.log10());
		}
		let start = this.startCost.log10(); // a
		let scale = this.scaleCost.log10(); // b
		let secScale = log(this.secScaleCost, 10); // c
		let preSecScale = this.preSecScale; // d

		// (c(1+2d) - 2b + √(8cy + 4b^2 + c^2 - 8ac - 4bc(2d + 1))) / 2c
		return floor(secScale * (1 + 2 * preSecScale) - (scale * 2) + sqrt(8 * secScale * player.energy.log10() + pow(scale, 2) * 2 + pow(secScale, 2) - 8 * start * secScale - 4 * scale * secScale * (2 * preSecScale - 1)) / (secScale * 2)) - this.bought;
	}
	get maxCost() {
		return this.startCost.mul(this.scaleCost.pow(this.bought)).mul(Decimal.pow(this.secScaleCost, Decimal.max(0, this.maxBuyable - this.preSecScale - 1).mul(this.maxBuyable - this.preSecScale).div(2)));
	}

	bulkBuyable(bulk) {
		if (player.energy.lt(this.scaleStartCost)) {
			return min(this.bought + bulk, floor((player.energy.log10() - this.startCost.log10()) / this.scaleCost.log10()));
		}
		let start = this.startCost.log10(); // a
		let scale = this.scaleCost.log10(); // b
		let secScale = this.secScaleCost; // c
		let preSecScale = this.preSecScale; // d

		// (c(1+2d) - 2b + √(8cy + 4b^2 + c^2 - 8ac - 4bc(2d + 1))) / 2c
		return min(this.bought + bulk, floor(secScale * (1 + 2 * preSecScale) - (scale * 2) + sqrt(8 * secScale * player.energy.log10() + pow(scale, 2) * 2 + pow(secScale, 2) - 8 * start * secScale - 4 * scale * secScale * (2 * preSecScale - 1)) / (secScale * 2))) - this.bought;
	}
	bulkCost(bulk) {
		return this.startCost.mul(this.scaleCost.pow(this.bought)).mul(Decimal.pow(this.secScaleCost, Decimal.max(0, this.bulkBuyable(bulk) - this.preSecScale - 1).mul(this.bulkBuyable(bulk) - this.preSecScale).div(2)));
	}

	buy() {
		if (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.amount = this.amount.add(1);
			this.bought++;
		}
	}
	buyMax() {
		if (this.buyable) {
			player.energy = player.energy.sub(this.maxCost);
			this.amount = this.amount.add(this.maxBuyable);
			this.bought += this.maxBuyable;
		}
	}
	buyBulk(bulk) {
		if (this.buyable) {
			player.energy = player.energy.sub(this.bulkCost(bulk));
			this.amount = this.amount.add(this.bulkBuyable(bulk));
			this.bought += this.bulkBuyable(bulk);
		}
	}
}
