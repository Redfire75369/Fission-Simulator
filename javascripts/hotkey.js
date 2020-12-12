/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

for (let tier = 0; tier < 3; tier++) {
	Mousetrap.bind((tier+1).toString(), function() {
		player.reactors.pebblebeds[tier].buyMax();
	});

	Mousetrap.bind("shift+" + (tier + 1).toString(), function() {
		if (player.mines.tier + 1 > tier) {
			player.reactors.pebblebeds[tier].loadFuel();
		} else {
			player.reactors.pebblebeds[tier].mineFuel();
		}
	});
	Mousetrap.bind("shift+ctrl+" + (tier + 1).toString(), function() {
		player.reactors.pebblebeds[tier].ejectWaste();
	});
}
