/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

//const moderators = ["Water", "Graphite"];

function getLimit() {
	if (player.moderator < 32) {
		return infinity.pow(Decimal.pow(2, player.moderator));
	}
	return new Decimal(Infinity);
}
