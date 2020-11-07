/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function updateUIHowToPlay() {
	document.getElementById("how_to_play_reactor_pebblebed_span1").style.display = player.unlocked.mines ? "" : "none";

	document.getElementById("how_to_play_fuel_triso").style.display = player.unlocked.mines ? "" : "none";
	document.getElementById("how_to_play_mines").style.display = player.unlocked.mines ? "" : "none";
	document.getElementById("how_to_play_fuel_triso_span1").style.display = player.unlocked.fuelReprocessing ? "" : "none";
}
