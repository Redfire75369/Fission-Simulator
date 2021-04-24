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
		return new Decimal(Math.log(this.bought + 1) * this.bought / (16 * Math.log(1.1)));
	}
}

class LightWaterFuel {
	constructor() {
		this.regular = zero;
		this.enriched = zero;
		this.mine = new LightWaterMine();
	}

	reset() {
		this.regular = zero;
		this.enriched = zero;
		this.mine.reset();
	}

	mine_fuel() {
		this.regular = this.regular.add(this.mine.fuel_extraction);
	}
}
