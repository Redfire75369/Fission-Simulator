/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var gasCoolantBaseHeatCapacity = [
	new Decimal(1.008),
	new Decimal(4.032),
	new Decimal(16.128)
];

class GasCoolant {
	constructor(tier) {
		this.tier = tier;
	}

	get flowRate() {
		if (player.prestige.researches[1] === 0) {
			return zero;
		}
		return Decimal.pow(1.4, 3 + Decimal.log(player.prestige.researches[1], 1.4));
	}
	get heatCapacity() {
		return Decimal.mul(gasCoolantBaseHeatCapacity[this.tier], Decimal.pow(Decimal.log(player.prestige.researches[1] + 1, 1.2 + this.tier / 12), 2.4));
	}
	get nobility() {
		return Decimal.pow(1.5, Decimal.log(1 + player.prestige.researches[2], 2.1));
	}
	get fuelEfficiency() {
		return new Decimal(1);
	}

	get cooling() {
		if (!player.unlocked.prestige) {
			return new Decimal(-1);
		}
		return player.reactors.pebblebeds[this.tier].amount.mul(this.flowRate).mul(this.heatCapacity).pow(this.nobility.log(3 + 2 * this.tier) * 0.63);
	}
}

var gasCoolants = [
	new GasCoolant(0),
	new GasCoolant(1),
	new GasCoolant(2)
];

function pebblebedFissionNetHeating(tier) {
	return player.reactors.pebblebeds[tier].heating.sub(gasCoolants[tier].cooling);
}

function coolingEfficiency(tier) {
	if (pebblebedFissionNetHeating(tier).gte(0)) {
		return Decimal.add(1, pebblebedFissionNetHeating(tier).div(player.reactors.pebblebeds[tier].amount).add(1).log(4.2));
	}
	return Decimal.add(1.2, pebblebedFissionNetHeating(tier).div(player.reactors.pebblebeds[tier].amount).mul(-1).add(1).log(2.7));
}
