/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";

import OverspinCoolantUpgrade from "./upgrades.js";
import {player} from "../../../data.js";

class OverspinCoolant {
	constructor() {
		this.tier = 0;
		this.upgrades = [
			new OverspinCoolantUpgrade(200),
			new OverspinCoolantUpgrade(480),
			new OverspinCoolantUpgrade(262144)
		];
	}

	get cost() {
		return Decimal.pow(16, 3 + this.tier).div(2);
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

export default OverspinCoolant;
