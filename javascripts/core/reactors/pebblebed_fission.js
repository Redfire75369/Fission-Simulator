class PebblebedFissionReactor extends GenericEnergyProducer {
	constructor(tier, start, scale) {
		super(start, scale, 10, 308);
		this.tier = tier;
		this.fuel = tier == 0 ? new Decimal(10) : zero;
		this.spent = zero;
	}

	reset() {
		this.bought = 0;
		this.amount = zero;
		this.fuel = this.tier == 0 ? new Decimal(10) : zero;
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
		let rate = Decimal.pow(1.4, this.bought);
		let factor = this.tier === 0 ? 2.1 : this.tier === 1 ? 1.005 : 1.001;
		rate = rate.mul(this.fuel.max(factor).log(factor));
		rate = rate.div(player.fuels.triso[this.tier].lifetime);
		return rate.max(1);
	}

	get heatReleased() {
		if (!player.unlocked.prestige) {
			return new Decimal(-1);
		}
		return this.amount.mul(this.burnRate).pow(1 + this.tier / 4);
	}
}

function resetPebblebedFissionReactors() {
	for (let tier = 0; tier < 3; tier++) {
		player.reactors.pebblebeds[tier].reset();
	}
}

function simulatePebblebedReactors(tickInterval = 50) {
	let startEnergy = player.energy;

	for (let tier = 0; tier < 3; tier++) {
		if (player.reactors.pebblebeds[tier].fuel.gt(0) && player.reactors.pebblebeds[tier].bought > 0) {
			let fuelUsage = player.reactors.pebblebeds[tier].fuel.min(player.reactors.pebblebeds[tier].burnRate.mul(tickInterval / 1000));
			player.reactors.pebblebeds[tier].fuel = player.reactors.pebblebeds[tier].fuel.sub(fuelUsage);
			player.reactors.pebblebeds[tier].spent = player.reactors.pebblebeds[tier].spent.add(fuelUsage);

			player.energy = player.energy.add(player.reactors.pebblebeds[tier].amount.mul(player.reactors.pebblebeds[tier].burnRate).mul(player.fuels.triso[tier].energyPerPellet).mul(fuelUsage));
		}
	}

	document.getElementById("energy_gain").innerText = notation(player.energy.sub(startEnergy).mul(1000 / tickInterval));

	player.unlocked.mines |= player.energy.gte("5e2");
}
