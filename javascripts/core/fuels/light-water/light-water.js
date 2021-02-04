/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class LightWaterMine extends GenericMine {
	constructor() {
		super(20, 3, 5);
	}

	get fuel_extraction() {
		return Math.log(this.bought + 1) / Math.log(1.1) / 4;
	}
}

class LightWaterFuel {
	constructor() {
		this.regular = zero;
		this.enriched = zero;
		this.enrichment = new Decimal(0.01);
		this.mine = new LightWaterMine();
	}

	mine_fuel() {
		this.regular = this.regular.add(this.mine.fuel_extraction);
	}
}
