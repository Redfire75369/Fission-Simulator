/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import EnergyBuyable from "./energy-buyable.js";
import {zero} from "../constants.js";
import {player} from "../data.js";

class Reactor extends EnergyBuyable {
	constructor(start, scale, secScale = 10, scalePrice = 308) {
		super(start, scale, secScale, scalePrice);
		this.amount = zero;
	}

	reset() {
		this.bought = 0;
		this.amount = zero;
	}

	buy() {
		if (this.buyable) {
			player.energy = player.energy.sub(this.cost);
			this.amount = this.amount.add(1);
			this.bought++;
		}
	}

	// buy_max() {
	// 	if (this.buyable) {
	// 		player.energy = player.energy.sub(this.cost_max);
	// 		this.amount = this.amount.add(this.buyable_max);
	// 		this.bought += this.buyable_max;
	// 	}
	// }

	// buy_bulk(bulk) {
	// 	if (this.buyable) {
	// 		player.energy = player.energy.sub(this.bulkCost(bulk));
	// 		this.amount = this.amount.add(this.bulkBuyable(bulk));
	// 		this.bought += this.bulkBuyable(bulk);
	// 	}
	// }
}

export default Reactor;
