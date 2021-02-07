/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class LightWaterCentrifuge extends GenericCentrifuge {
	constructor() {
		super(1e12, 1e3, 25);
		this.fuel = zero;
		this.time = 0;
	}

	get enrichment() {
		if (this.bought > 6) {
			return new Decimal(0.35);
		} else {
			return new Decimal(0.1 + 0.1 * this.bought);
		}
	}

	get max_fuel_enriched() {
		return Decimal.pow(10, 4 + this.bought);
	}

	load_fuel() {
		this.fuel = this.fuel.add(player.fuels.light_water.regular);
		player.fuels.light_water.regular = zero;

		if (this.time === 0) {
			this.time = 8000;
		}
	}
}

function simulate_light_water_centrifuge(tick_interval = 50) {
	if (player.unlocked.light_water.centrifuge) {
		let lwc = player.centrifuges.light_water;

		let fuel_enriched = lwc.fuel.min(lwc.max_fuel_enriched);


		player.centrifuges.light_water.time = Math.max(0, lwc.time - tick_interval);


		if (lwc.time === 0) {
			player.fuels.light_water.enriched = player.fuels.light_water.enriched.add(fuel_enriched);
			player.centrifuges.light_water.fuel = lwc.fuel.sub(fuel_enriched);

			if (lwc.fuel.gt(0) && lwc.time < 0) {
				lwc.time = 8000;
			}
		}
	} else {
		player.unlocked.light_water.centrifuge |= player.energy.e >= 12;
		player.reactors.light_water.fuel_enriched = true;
	}
}
