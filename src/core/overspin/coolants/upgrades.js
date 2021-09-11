/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";

import {player} from "../../../data.js";

class OverspinCoolantUpgrade {
	constructor(start) {
		this.start = start;
		this.bought = 0;
	}

	get cost() {
		return Decimal.pow(this.start.neq(262144) ? (1.7 + 0.01 * this.bought) : (2.1 + 0.02 * this.bought), this.bought - 1).mul(this.start);
	}

	get buyable() {
		return player.overspin.uranium.gte(this.cost);
	}

	buy() {
		if (this.buyable) {
			player.overspin.uranium = player.overspin.uranium.sub(this.cost);
			this.bought = true;
		}
	}
}

export default OverspinCoolantUpgrade;
