/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class LightWaterReactor extends GenericReactor {
	constructor() {
		super(10, 5, 5);
		this.fuel = {
			regular: zero,
			enriched: zero
		};
	}

	get multiplier() {
		return Decimal.pow(2.5, this.amount - 1);
	}

	get fuel_usage() {
		if (this.fuel.regular.gt(0)) {
			return Decimal.min(this.fuel.regular, Decimal.max(1, this.amount.log10()).div(20));
		} else if (this.fuel.enriched.gt(0)) {
			return Decimal.min(this.fuel.enriched, Decimal.pow(this.amount, 2.5 + player.fuels.light_water.enrichment.log(3)));
		}
		return zero;
	}

	get energy_production() {
		return this.amount.mul(this.multiplier).mul(this.fuel_usage);
	}
	
	load_fuel() {
		
	}
}

class LightWaterMine extends GenericMine {
	constructor() {
		super(20, 3, 5);
	}
	
	get fuel_extraction() {
		return Decimal.pow(1.5, this.bought);
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

function simulate_light_water_reactor(tick_interval = 50) {
	let lwr = player.reactors.light_water;

	player.energy = player.energy.add(lwr.energy_production.mul(tick_interval / 1000));

	if (lwr.fuel.regular.gt(0)) {
		player.reactors.light_water.fuel.regular = lwr.fuel.regular.sub(lwr.fuel_usage.mul(tick_interval / 1000));
	} else if (lwr.fuel.enriched.gt(0)) {
		player.reactors.light_water.fuel.enriched = lwr.fuel.enriched.sub(lwr.fuel_usage.mul(tick_interval / 1000));
	}
}
