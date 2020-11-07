/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class PebblebedFuelAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.reactors.pebblebeds[tier].ejectWaste();
			player.reactors.pebblebeds[tier].loadFuel();
		}, interval);
		this.tier = tier;
	}
}
