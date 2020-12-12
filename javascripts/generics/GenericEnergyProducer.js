/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class GenericEnergyProducer extends GenericProducer {
	constructor(start, scale, secScale = 10, scalePrice = 308) {
		super(start, scale, secScale, scalePrice);
	}

	get buyable() {
		return player.energy.gte(this.cost) && this.cost.lt(getLimit());
	}

	get maxBuyable() {
		if (player.energy.min(getLimit()).lt(this.scaleStartCost)) {
			return floor((player.energy.min(getLimit()).log10() - this.startCost.log10()) / this.scaleCost.log10()) + 1 - this.bought;
		}
		const start = this.startCost.log10(); // a
		const scale = this.scaleCost.log10(); // b
		const secScale = log(this.secScaleCost, 10); // c
		const preSecScale = this.preSecScale; // d

		// (c(2d + 1) - 2b + √(8cy + 4b^2 + c^2 - 8bc - 4bc(2d + 1))) / (2c)
		return floor((secScale * (2 * preSecScale + 1) - (2 * scale) + sqrt(8 * secScale * player.energy.min(getLimit()).log10() + 4 * pow(scale, 2) + pow(secScale, 2) - 8 * start * secScale - 4 * scale * secScale * (2 * preSecScale + 1))) / (2 * secScale)) + 1 - this.bought;
	}
	get maxCost() {
		return this.startCost.mul(this.scaleCost.pow(this.maxBuyable + this.bought)).mul(Decimal.pow(this.secScaleCost, Decimal.max(0, this.maxBuyable + this.bought - this.preSecScale - 1).mul(this.maxBuyable + this.bought - this.preSecScale).div(2)));
	}

	buy() {
		if (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.amount = this.amount.add(1);
			this.bought++;
		}
	}
	buyMax() {
		while (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.amount = this.amount.add(1);
			this.bought++;
		}
	}
	/*buyBulk(bulk) {
		if (this.buyable) {
			player.energy = player.energy.sub(this.bulkCost(bulk));
			this.amount = this.amount.add(this.bulkBuyable(bulk));
			this.bought += this.bulkBuyable(bulk);
		}
	}*/
}
