/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class LightWaterReactor extends GenericReactor {
	constructor() {
		super(10, 4, 5);
		this.fuel = zero;
		this.fuel_enriched = false;
	}

	get multiplier() {
		return Decimal.pow(2.8, this.amount - 1);
	}

	get fuel_usage() {
		if (this.fuel.gt(0)) {
			return Decimal.min(this.fuel, this.amount.add(1).log(1.06) / 2);
		}
		return zero;
	}

	get energy_production() {
		if (!this.fuel_enriched) {
			return this.amount.mul(this.multiplier).mul(this.fuel_usage);
		} else {
			return this.amount.mul(this.multiplier).mul(this.fuel_usage).mul(Decimal.pow(12, player.centrifuges.light_water.enrichment.mul(10)));
		}
	}

	load_fuel() {
		if (!this.fuel_enriched) {
			this.fuel = this.fuel.add(player.fuels.light_water.regular);
			player.fuels.light_water.regular = zero;
		} else {
			this.fuel = this.fuel.add(player.fuels.light_water.enriched);
			player.fuels.light_water.enriched = zero;
		}
	}
}

function simulate_light_water_reactor(tick_interval = 50) {
	let lwr = player.reactors.light_water;

	player.energy = player.energy.add(lwr.energy_production.mul(tick_interval / 1000));

	if (lwr.fuel.gt(0)) {
		player.reactors.light_water.fuel = lwr.fuel.sub(lwr.fuel_usage.mul(tick_interval / 1000)).max(0);
	}
}
