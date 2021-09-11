/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";

import {player} from "../data.js";
import {get_limit} from "../notations.js";

class EnergyBuyable {
	constructor(start, scale, secScale = 10, scalePrice = 308) {
		this.start = new Decimal(start);
		this.scale = new Decimal(scale);
		this.sec_scale = secScale;
		this.scale_start = Decimal.pow(10, scalePrice);
		this.bought = 0;
	}

	get pre_sec_scale() {
		return Math.floor(this.scale_start.div(this.start).log10() / this.scale.log10());
	}

	get cost() {
		return this.start.mul(this.scale.pow(this.bought)).mul(Decimal.pow(this.sec_scale, Decimal.max(0, this.bought - this.pre_sec_scale - 1).mul(this.bought - this.pre_sec_scale).div(2)));
	}

	get buyable() {
		return player.energy.gte(this.cost) && this.cost.lt(get_limit());
	}

	get buyable_max() {
		if (player.energy.min(get_limit()).lt(this.scale_start)) {
			return Math.floor((player.energy.min(get_limit()).log10() - this.start.log10()) / this.scale.log10()) + 1 - this.bought;
		}
		const start = this.start.log10(); // a
		const scale = this.scale.log10(); // b
		const sec_scale = Math.log10(this.sec_scale); // c
		const pre_sec_scale = this.pre_sec_scale; // d

		// (c(2d + 1) - 2b + √(8cy + 4b^2 + c^2 - 8bc - 4bc(2d + 1))) / (2c)
		return Math.floor((sec_scale * (2 * pre_sec_scale + 1) - (2 * scale) + Math.sqrt(8 * sec_scale * player.energy.min(get_limit()).log10() + 4 * Math.pow(scale, 2) + Math.pow(sec_scale, 2) - 8 * start * sec_scale - 4 * scale * sec_scale * (2 * pre_sec_scale + 1))) / (2 * sec_scale)) + 1 - this.bought;
	}

	get cost_max() {
		return this.start.mul(this.scale.pow(this.buyable_max + this.bought)).mul(Decimal.pow(this.sec_scale, Decimal.max(0, this.buyable_max + this.bought - this.pre_sec_scale - 1).mul(this.buyable_max + this.bought - this.pre_sec_scale).div(2)));
	}
}

export default EnergyBuyable;
