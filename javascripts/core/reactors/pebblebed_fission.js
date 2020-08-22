//const gasCoolants = ["Nitrogen", "Carbon Dioxide", "Helium"];

class PebblebedFissionReactor extends GenericEnergyProducer {
	constructor(tier, start, scale) {
		super(start, scale, 10, 308);
		this.tier = tier;
		this.fuel = tier == 0 ? new Decimal(10) : zero;
		this.spent = zero;
	}

	loadFuel() {
		if (player.reactors.pebblebeds[this.tier].bought > 0) {
			let addedFuel = player.fuels.triso[this.tier].enriched.min(this.totalCapacity.sub(this.fuel.add(this.spent)));
			player.fuels.triso[this.tier].enriched = player.fuels.triso[this.tier].enriched.sub(addedFuel);
			this.fuel = this.fuel.add(addedFuel);
		}
	}
	ejectWaste() {
		player.fuels.triso[this.tier].depleted = player.fuels.triso[this.tier].depleted.add(this.spent);
		this.spent = zero;
	}

	get totalCapacity() {
		return this.amount.mul(25);
	}
	get constructionCost() {
		return Decimal.pow(25, 4 * this.tier + 1);
	}

	get efficiency() {
		let eff = Decimal.pow(2, this.bought);
		eff = eff.mul(this.fuel.sub(10).max(1.1).log(1.1));
		return eff.max(1);
	}
}

function resetPebblebedReactors() {
	player.reactors.pebblebeds = getDefaultData().reactors.pebblebeds;
}

function simulatePebblebedReactors(tickInterval = 50) {
	let startEnergy = player.energy;

	for (let tier = 0; tier < 3; tier++) {
		if (player.reactors.pebblebeds[tier].fuel.gt(0) && player.reactors.pebblebeds[tier].bought > 0) {
			let fuelUsage = player.reactors.pebblebeds[tier].fuel.min(Decimal.div(tickInterval, player.fuels.triso[tier].lifetime));
			player.reactors.pebblebeds[tier].fuel = player.reactors.pebblebeds[tier].fuel.sub(fuelUsage);
			player.reactors.pebblebeds[tier].spent = player.reactors.pebblebeds[tier].spent.add(fuelUsage);

			player.energy = player.energy.add(player.reactors.pebblebeds[tier].amount.mul(player.reactors.pebblebeds[tier].efficiency).mul(player.fuels.triso[tier].energyPerPellet).mul(fuelUsage));
		}
	}

	document.getElementById("energy_gain").innerText = notation(player.energy.sub(startEnergy).mul(1000 / tickInterval));
}
