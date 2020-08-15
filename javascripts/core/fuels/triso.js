const trisoFuels = ["Thorium-229", "Uranium-235", "Plutonium-239"];

class TRISOFuel {
	constructor(tier) {
		this.tier = tier;
		this.enriched = zero;
		this.spent = zero;
	}

	get lifetime() {
		return 10000 * Decimal.pow(4, this.tier);
	}
	get reprocessingTime() {
		return 1000 * Decimal.pow(3, this.tier + 1);
	}
	get reprocessEnergyCost() {
		return this.spent.mul(Decimal.pow(225, this.tier + 1));
	}
	get canReprocessSpent() {
		return this.spent.gt(0) && this.tier < 2 && player.energy.gt(this.reprocessEnergyCost);
	}
	get efficiency() {
		return new Decimal(1);
	}
	get energyPerPellet() {
		return this.efficiency.mul(Decimal.pow(250, this.tier + 1));
	}

	reprocessSpent() {
		if (this.canReprocessSpent) {
			document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).children[0].style.width = "100%";
			document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).children[0].style.transition = this.reprocessingTime / 1000 + "s all linear";

			player.energy = player.energy.sub(this.reprocessEnergyCost);
			let spent = this.spent;
			let tier = this.tier;
			this.spent = zero;
			setTimeout(function() {
				document.getElementById("fuel_triso_reprocess" + (tier + 1)).children[0].style.width = "0";
				document.getElementById("fuel_triso_reprocess" + (tier + 1)).children[0].style.transition = "";

				player.fuels.triso[tier + 1].enriched = player.fuels.triso[tier + 1].enriched.add(spent.mul(0.01));
			}, this.reprocessingTime);
		}
	}
}

function resetTRISOFuel() {
	player.fuels.triso = getDefaultData().fuels.triso;
}

function getTRISOFuelGain(tier) {
	if (player.mines.tier >= tier) {
		return player.mines.effective.mul(player.mines.tier - tier + 1).div(60);
	} else {
		return zero;
	}
}

/*function getTRISOFuelPebblebedReactorIncrement(tier) {
	return Decimal.max(player.reactors.pebblebeds[tier].fuel.log(1.1));
}*/

function simulateTRISOFuel(tickInterval = 50) {
	for (let tier = 0; tier < 3; tier++) {
		player.fuels.triso[tier].enriched = player.fuels.triso[tier].enriched.add(getTRISOFuelGain(tier).mul(tickInterval / 1000));
	}
}

function updateUITRISOFuel() {
	for (let tier = 0; tier < 3; tier++) {
		document.getElementById("fuel_triso_enriched" + (tier + 1)).innerText = notation(player.fuels.triso[tier].enriched);
		document.getElementById("fuel_triso_depleted" + (tier + 1)).innerText = notation(player.fuels.triso[tier].spent);
		document.getElementById("fuel_triso_lifetime" + (tier + 1)).innerText = notation(player.fuels.triso[tier].lifetime / 1000);
		document.getElementById("fuel_triso_reprocess" + (tier + 1)).className = player.fuels.triso[tier].canReprocessSpent ? "storebtn buy" : "storebtn locked";
		document.getElementById("fuel_triso_reprocesscost" + (tier + 1)).innerText = notation(player.fuels.triso[tier].reprocessEnergyCost);
	}
}
