/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function simulatePebblebedAutomation(tickInterval = 50) {
	for (let i = 0; i < 3; i++) {
		player.automation.reactors.pebblebeds.buy[i].automate(tickInterval);
		player.automation.reactors.pebblebeds.fuel[i].automate(tickInterval);
	}
}
