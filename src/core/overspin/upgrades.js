/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {player} from "../../data.js";

class OverspinUpgrade {
	constructor(cost, multiplier) {
		this.bought = false;
		this.cost = cost;
		this.method = multiplier;
	}

	get buyable() {
		return !this.bought && player.overspin.uranium.gte(this.cost);
	}

	get multiplier() {
		return this.method();
	}

	buy() {
		if (this.buyable) {
			player.overspin.uranium = player.overspin.uranium.sub(this.cost);
			this.bought = true;
		}
	}
}

export default OverspinUpgrade;
