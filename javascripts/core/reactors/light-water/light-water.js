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
		return Decimal.pow(2.8, this.amount - 1);
	}

	get fuel_usage() {
		if (this.fuel.regular.gt(0)) {
			return Decimal.min(this.fuel.regular, this.amount.add(1).log(1.11) / 10);
		}
		return zero;
	}

	get energy_production() {
		return this.amount.mul(this.multiplier).mul(this.fuel_usage);
	}

	load_fuel() {
		this.fuel.regular = this.fuel.regular.add(player.fuels.light_water.regular);
		player.fuels.light_water.regular = zero;
	}
}

function simulate_light_water_reactor(tick_interval = 50) {
	let lwr = player.reactors.light_water;

	player.energy = player.energy.add(lwr.energy_production.mul(tick_interval / 1000));

	if (lwr.fuel.regular.gt(0)) {
		// alert(tick_interval)
		player.reactors.light_water.fuel.regular = lwr.fuel.regular.sub(lwr.fuel_usage.mul(tick_interval / 1000)).max(0);
	} else if (lwr.fuel.enriched.gt(0)) {
		player.reactors.light_water.fuel.enriched = lwr.fuel.enriched.sub(lwr.fuel_usage.mul(tick_interval / 1000)).max(0);
	}
}
