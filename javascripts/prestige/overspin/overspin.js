/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function uranium_gain() {
	if (player.overspin.overspins < 6) {
		return new Decimal(1);
	}
	return new Decimal(player.centrifuges.light_water.fuel.log(10)).div(3).mul(player.centrifuges.light_water.bought - 3).floor().max(0);
}

function overspin() {
	if (player.centrifuges.light_water.bought > 4 && player.centrifuges.light_water.fuel.gte(1e3)) {
		if (!player.unlocked.overspin.overspin) {
			cache.popups.push("Your centrifuges have overspun and destroyed your facilities. However, the destruction produced 1 Weapon-Grade Uranium.\n\nReach 5 Centrifuge Upgrades and enrich 1000 fuel to Overspin again.");
		}

		player.overspin.uranium = player.overspin.uranium.add(uranium_gain());
		player.overspin.overspins += 1;

		player.energy = get_default_data().energy;
		player.fuels.light_water.reset();
		player.reactors.light_water.reset();
		player.centrifuges.light_water.reset();

		player.reactors.light_water.fuel_enriched = false;
		player.unlocked.light_water.centrifuge = false;
		player.unlocked.overspin.overspin = true;

		cache.navigation.rerender = true;
		cache.reactors.light_water.rerender = true;
	}
}
