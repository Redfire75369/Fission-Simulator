/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {persistent_cache, player} from "./data.js";
import {load_save, save_game} from "./save-load.js";
import {simulate_time} from "./simulation.js";

export function pre_load() {}

export function post_load() {}

export function init_game() {
	pre_load();
	load_save();
	post_load();

	if (Date.now() > player.last_update + 1000) {
		simulate_time((Date.now() - player.last_update) / 1000);
	}

	/*Game Loops*/
	persistent_cache.save_game_loop = setInterval(function() {
		save_game();
	}, 15000);

	setInterval(function() {
		try {
			if (player.last_update === undefined) {
				player.last_update = Date.now();
			}
			if (Date.now() > player.last_update && document.visibilityState === "visible") {
				simulate_time((Date.now() - player.last_update) / 1000);
			}
		} catch (e) {
			if (!persistent_cache.errored) {
				alert("The game has encountered a fatal error. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
				alert("--DEBUG Information--\n" + e.stack);
				console.error(e);
				persistent_cache.errored = true;
			}
		}
	}, 25);
}
