/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
