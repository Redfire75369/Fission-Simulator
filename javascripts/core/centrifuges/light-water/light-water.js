/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class LightWaterCentrifuge extends GenericCentrifuge {
	constructor() {
		super(1e12, 4e4, 25);
		this.fuel = zero;
		this.time = 0;
	}

	reset() {
		this.bought = 0;
		this.fuel = zero;
		this.time = 0;
	}

	get enrichment() {
		if (player.overspin.upgrades[3].bought) {
			if (player.overspin.upgrades[3].multiplier.add(4).gt(this.bought)) {
				return new Decimal(1 - 1/this.bought);
			} else {
				return new Decimal(1 - 1/player.overspin.upgrades[3].multiplier.add(4));
			}
		} else {
			if (this.bought > 4) {
				return new Decimal(0.1 + 0.1 * 4);
			} else {
				return new Decimal(0.1 + 0.1 * this.bought);
			}
		}
	}

	get enrichment_time() {
		return player.overspin.upgrades[1].bought ? 5000 : 8000;
	}

	get max_fuel_enriched() {
		return Decimal.pow(5, 3 + this.bought);
	}

	load_fuel() {
		this.fuel = this.fuel.add(player.fuels.light_water.regular);
		player.fuels.light_water.regular = zero;

		if (this.time === 0) {
			this.time = this.enrichment_time;
		}
	}
}

function simulate_light_water_centrifuge(tick_interval = 50) {
	if (player.unlocked.light_water.centrifuge) {
		let lwc = player.centrifuges.light_water;

		if (lwc.bought > 4 && lwc.fuel.gte(1e3) && !player.unlocked.overspin.overspin) {
			overspin();
			return;
		}

		let fuel_enriched = lwc.fuel.min(lwc.max_fuel_enriched);

		player.centrifuges.light_water.time = Math.max(0, lwc.time - tick_interval);


		if (lwc.time === 0) {
			player.reactors.light_water.fuel_enriched = true;
			player.fuels.light_water.enriched = player.fuels.light_water.enriched.add(fuel_enriched);
			player.centrifuges.light_water.fuel = lwc.fuel.sub(fuel_enriched);

			if (lwc.fuel.gt(0) && lwc.time < 0) {
				lwc.time = lwc.enrichment_time;
			}
		}
	} else {
		player.unlocked.light_water.centrifuge |= player.energy.e >= 12;
	}
}
