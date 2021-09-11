/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";

import {zero} from "./constants.js";
import LightWaterCentrifuge from "./core/centrifuges/light-water/light-water.js";
import {LightWaterFuel} from "./core/fuels/light-water/light-water.js";
import OverspinCoolant from "./core/overspin/coolants/coolants.js";
import OverspinUpgrade from "./core/overspin/upgrades.js";
import LightWaterReactor from "./core/reactors/light-water/light-water.js";

export let player = get_default_data();
export let cache = get_default_cache();
export let persistent_cache = get_default_persistent_cache();

export function get_default_data() {
	return {
		version: {
			major: 0,
			minor: 1,
			hotfix: 5
		},
		navigation: {
			primary: "reactors",
			overspin: "upgrades"
		},
		options: {
			notation: 0
		},
		unlocked: {
			light_water: {
				centrifuge: false
			},
			overspin: {
				overspin: false,
				coolants: false
			}
		},
		last_update: Date.now(),
		energy: new Decimal(100),
		total_energy: zero,
		fuels: {
			light_water: new LightWaterFuel()
		},
		reactors: {
			light_water: new LightWaterReactor()
		},
		centrifuges: {
			light_water: new LightWaterCentrifuge()
		},
		overspin: {
			uranium: zero,
			overspin: 0,
			upgrades: [
				new OverspinUpgrade(1, function() {
					return player.reactors.light_water.amount.max(1).pow(1.5);
				}),
				new OverspinUpgrade(3, function() {}),
				new OverspinUpgrade(8, function() {
					return new Decimal(player.energy.max(15).log(15));
				}),
				new OverspinUpgrade(18, function() {
					return player.overspin.uranium.div(6);
				}),
				new OverspinUpgrade(120, function() {})
			],
			coolant: new OverspinCoolant()
		},

		reset() {
			player = get_default_data();
		}

	};
}

export function get_default_cache() {
	return {
		popups: [],
		navigation: {
			rerender: false
		},
		reactors: {
			light_water: {
				rerender: false
			}
		},
		overspin: {
			upgrades: {
				rerender: false
			},
			coolants: {
				rerender: false
			}
		},

		reset() {
			cache = get_default_cache();
		}

	};
}

export function get_default_persistent_cache() {
	return {
		save_game_loop: NaN,
		errored: false,
		mobile: is_mobile_portrait()
	};
}

export function is_mobile_portrait() {
	return window.matchMedia("only (max-height: 8.5in) and (max-width: 4in) and (orientation: portrait)").matches;
}
