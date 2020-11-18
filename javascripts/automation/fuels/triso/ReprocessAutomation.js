/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class TRISOReprocessAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.fuels.triso[tier].reprocessDepleted();
		}, interval);
		this.tier = tier;
	}
}

function simulateTRISOAutomation(tickInterval = 50) {
	for (let i = 0; i < 3; i++) {
		player.automation.fuels.triso[i].automate(tickInterval);
	}
}
