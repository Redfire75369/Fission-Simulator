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

	loadFuel() {
		if (player.reactors.pebblebeds[this.tier].bought > 0 && this.totalCapacity.gte(this.fuel.add(this.spent).add(1))) {
			let addedFuel = player.fuels.triso[this.tier].enriched.min(this.totalCapacity.sub(this.fuel.add(this.spent)));
			player.fuels.triso[this.tier].enriched = player.fuels.triso[this.tier].enriched.sub(addedFuel);
			this.fuel = this.fuel.add(addedFuel);
		}
	}
	ejectWaste() {
		if (this.spent.gte(1)) {
			player.fuels.triso[this.tier].depleted = player.fuels.triso[this.tier].depleted.add(this.spent);
			this.spent = zero;
		}
	}

	get totalCapacity() {
		return this.amount.mul(25);
	}
	get constructionCost() {
		return Decimal.pow(25, 4 * this.tier + 1);
	}

	get burnRate() {
		if (player.reactors.pebblebeds[this.tier].bought < 1) {
			return zero;
		}
		let rate = Decimal.pow(1.4, this.bought);
		let factor = this.tier === 0 ? 2.1 : this.tier === 1 ? 1.005 : 1.001;
		rate = rate.mul(this.fuel.max(factor).log(factor));
		rate = rate.max(1).div(player.fuels.triso[this.tier].lifetime);
		return rate;
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
	return player.reactors.pebblebeds[tier].fuel.min(player.reactors.pebblebeds[tier].burnRate);
}

function pebblebedFissionEnergyGain(tier) {
	if (player.unlocked.prestige) {
		return player.reactors.pebblebeds[tier].amount.mul(player.fuels.triso[tier].energyPerPellet).mul(coolingEfficiency(tier)).mul(pebblebedFissionFuelUsage(tier));
	}
	return player.reactors.pebblebeds[tier].amount.mul(player.fuels.triso[tier].energyPerPellet).mul(pebblebedFissionFuelUsage(tier));
}
function pebblebedFissionTotalEnergyGain() {
	let energy = zero;
	for (let tier = 0; tier < 3; tier++) {
		if (player.reactors.pebblebeds[tier].bought > 0) {
			energy = energy.add(pebblebedFissionEnergyGain(tier));
		}
	}
	return energy;
}

function simulatePebblebedReactors(tickInterval = 50) {
	player.energy = player.energy.add(pebblebedFissionTotalEnergyGain().mul(tickInterval / 1000));
	for (let tier = 0; tier < 3; tier++) {
		if (player.reactors.pebblebeds[tier].fuel.gt(0)) {
			player.reactors.pebblebeds[tier].spent = player.reactors.pebblebeds[tier].spent.add(pebblebedFissionFuelUsage(tier).mul(tickInterval / 1000));
			player.reactors.pebblebeds[tier].fuel = player.reactors.pebblebeds[tier].fuel.sub(pebblebedFissionFuelUsage(tier).mul(tickInterval / 1000));
		}
	}

	player.unlocked.mines |= player.energy.gte("5e2");
}
