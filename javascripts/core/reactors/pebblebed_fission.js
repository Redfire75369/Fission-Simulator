/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class PebblebedFissionReactor extends GenericEnergyProducer {
	constructor(tier, start, scale) {
		super(start, scale, 10, 308);
		this.tier = tier;
		this.fuel = tier === 0 ? new Decimal(10) : zero;
		this.spent = zero;
	}

	reset() {
		this.bought = 0;
		this.amount = zero;
		this.fuel = this.tier === 0 ? new Decimal(10) : zero;
		this.spent = zero;
	}

	mineFuel() {
		if (player.reactors.pebblebeds[this.tier].bought > 0 && this.totalCapacity.gte(this.fuel.add(this.spent).add(1))) {
			const minedFuel = this.amount.eq(1) ? 1 : this.amount.add(2).pow(1.3);
			this.fuel = this.fuel.add(minedFuel).min(this.totalCapacity.sub(this.spent));
		}
	}
	loadFuel() {
		if (player.reactors.pebblebeds[this.tier].bought > 0 && this.totalCapacity.gte(this.fuel.add(this.spent).add(1))) {
			const addedFuel = player.fuels.triso[this.tier].enriched.min(this.totalCapacity.sub(this.fuel.add(this.spent)));
			player.fuels.triso[this.tier].enriched = player.fuels.triso[this.tier].enriched.sub(addedFuel);
			this.fuel = this.fuel.add(addedFuel);
		}
	}
	ejectWaste() {
		if (this.spent.gte(1)) {
			if (player.unlocked.mines) {
				player.fuels.triso[this.tier].depleted = player.fuels.triso[this.tier].depleted.add(this.spent);
			}
			this.spent = zero;
		}
	}

	get totalCapacity() {
		return this.amount.mul(25)
			.mul(player.unlocked.prestige ? Decimal.pow(1.4, 6 + Decimal.log(player.prestige.researches[1], 1.4) * 2) : 1);
	}
	get constructionCost() {
		return Decimal.pow(25, 4 * this.tier + 1);
	}

	get burnRate() {
		if (player.reactors.pebblebeds[this.tier].bought < 1) {
			return zero;
		}
		return Decimal.pow(intermediaryVariables.burnRateBoughtMul, this.bought + this.tier + 1)
			.mul(this.amount)
			.div(player.fuels.triso[this.tier].lifetime);
	}

	get heating() {
		if (!player.unlocked.prestige) {
			return new Decimal(-1);
		}
		return this.amount.mul(this.totalCapacity).mul(0.1).pow(1 + this.tier / 4);
	}
}

function resetPebblebedFissionReactors() {
	for (let tier = 0; tier < 3; tier++) {
		player.reactors.pebblebeds[tier].reset();
	}
}

function pebblebedFissionFuelUsage(tier) {
	return player.reactors.pebblebeds[tier].fuel.min(player.reactors.pebblebeds[tier].burnRate).max(0);
}

function pebblebedFissionEnergyGain(tier) {
	if (player.unlocked.prestige) {
		return player.reactors.pebblebeds[tier].amount.mul(player.fuels.triso[tier].energyPerPellet).mul(coolingEfficiency(tier)).mul(pebblebedFissionFuelUsage(tier));
	}
	return player.reactors.pebblebeds[tier].amount.mul(player.fuels.triso[tier].energyPerPellet).mul(pebblebedFissionFuelUsage(tier));
}
function pebblebedFissionTotalEnergyGain() {
	return player.reactors.pebblebeds.reduce(function(accumulated, current) {
		return accumulated.add(current.bought > 0 ? pebblebedFissionEnergyGain(current.tier) : zero);
	}, zero);
}

function simulatePebblebedReactors(tickInterval = 50) {
	player.energy = player.energy.add(pebblebedFissionTotalEnergyGain().mul(tickInterval / 1000));

	for (let tier = 0; tier < 3; tier++) {
		if (player.reactors.pebblebeds[tier].fuel.gt(0)) {
			player.reactors.pebblebeds[tier].spent = player.reactors.pebblebeds[tier].spent.add(pebblebedFissionFuelUsage(tier).mul(tickInterval / 1000));
			player.reactors.pebblebeds[tier].fuel = player.reactors.pebblebeds[tier].fuel.sub(pebblebedFissionFuelUsage(tier).mul(tickInterval / 1000)).max(0);
		}
	}

	if (player.energy.gte(5e8) && !player.unlocked.mines) {
		player.unlocked.mines = true;
		showNaviTab("production_tab");
		player.navigation.production = "mines";
	}
	if (player.energy.gte(1e10) && !player.unlocked.automation) {
		player.unlocked.automation = true;
		showNaviTab("automation_tab");
	}
}
