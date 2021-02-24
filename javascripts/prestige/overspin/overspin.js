/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function overspin() {
	if (player.centrifuges.light_water.bought > 4 && player.centrifuges.light_water.fuel.gte(1e2)) {
		player.energy = getDefaultData().energy;
		player.fuels.light_water.reset();
		player.reactors.light_water.reset();
		player.centrifuges.light_water.reset();

		player.reactors.light_water.fuel_enriched = false;
		player.unlocked.overspin.overspin = true;
		cache.light_water.rerender = true;
	}
}
