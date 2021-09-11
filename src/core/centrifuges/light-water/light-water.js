/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";

import Centrifuge from "../../centrifuge.js";
import {zero} from "../../../constants.js";
import {player} from "../../../data.js";
import overspin from "../../../prestige/overspin/overspin.js";

class LightWaterCentrifuge extends Centrifuge {
	constructor() {
		super(1e12, 4e4, 25);
		this.fuel = zero;
		this.time = 0;
	}

	get enrichment() {
		if (player.overspin.upgrades[3].bought) {
			return Decimal.sub(1, 1 / player.overspin.upgrades[3].multiplier.add(4).min(this.bought));
		} else {
			return new Decimal(0.1 + 0.1 * Math.min(4, this.bought));
		}
	}

	get enrichment_time() {
		return player.overspin.upgrades[1].bought ? 5000 : 8000;
	}

	get max_fuel_enriched() {
		return Decimal.pow(5, 3 + this.bought);
	}

	reset() {
		this.bought = 0;
		this.fuel = zero;
		this.time = 0;
	}

	load_fuel() {
		this.fuel = this.fuel.add(player.fuels.light_water.regular);
		player.fuels.light_water.regular = zero;

		if (this.time === 0) {
			this.time = this.enrichment_time;
		}
	}
}

export function simulate_light_water_centrifuge(tick_interval = 50) {
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
		if (!player.unlocked.light_water.centrifuge && player.energy.e >= 12) {
			player.unlocked.light_water.centrifuge = true;
			player.centrifuges.light_water.bought = 1;
		}
	}
}

export default LightWaterCentrifuge;
