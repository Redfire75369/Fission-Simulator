/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {simulate_light_water_reactor} from "./core/reactors/light-water/light-water.js";
import {simulate_light_water_centrifuge} from "./core/centrifuges/light-water/light-water.js";
import {player} from "./data.js";

function update_game(tick_interval = 50) {
	simulate_light_water_reactor(tick_interval);
	simulate_light_water_centrifuge(tick_interval);
}

export function simulate_time(seconds, actual) {
	let ticks = seconds * 20;
	let tick_interval = 50;
	if (ticks > 1000 && !actual) {
		tick_interval += (ticks - 1000) / 20;
		ticks = 1000;
	}

	// const start = Object.assign({}, player);
	for (let complete = 0; complete < ticks; complete++) {
		update_game(tick_interval);
		player.last_update = Date.now();
	}

	player.time += seconds * 1000;
}
