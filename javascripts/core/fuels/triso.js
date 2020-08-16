const trisoFuels = ["Thorium-229", "Uranium-235", "Plutonium-239"];

class TRISOFuel {
	constructor(tier) {
		this.tier = tier;
		this.enriched = zero;
		this.depleted = zero;
	}

	get lifetime() {
		return 8000 * Decimal.pow(4, this.tier);
	}
	get reprocessingTime() {
		return 1000 * Decimal.pow(3, this.tier + 1);
	}
	get reprocessEnergyCost() {
		return this.depleted.mul(Decimal.pow(80, this.tier + 1));
	}
	get canReprocessDepleted() {
		return this.depleted.gt(0) && this.tier < 2 && player.energy.gt(this.reprocessEnergyCost);
	}
	get efficiency() {
		return new Decimal(1);
	}
	get energyPerPellet() {
		return this.efficiency.mul(Decimal.pow(120, this.tier + 1));
	}

	reprocessDepleted() {
		if (this.canReprocessDepleted) {
			document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).children[0].style.width = "100%";
			document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).children[0].style.transition = this.reprocessingTime / 1000 + "s all linear";

			player.energy = player.energy.sub(this.reprocessEnergyCost);
			let depleted = this.depleted;
			let tier = this.tier;
			this.depleted = zero;
			setTimeout(function() {
				document.getElementById("fuel_triso_reprocess" + (tier + 1)).children[0].style.width = "0";
				document.getElementById("fuel_triso_reprocess" + (tier + 1)).children[0].style.transition = "";

				player.fuels.triso[tier + 1].enriched = player.fuels.triso[tier + 1].enriched.add(depleted.mul(0.01));
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

function simulateTRISOFuel(tickInterval = 50) {
	for (let tier = 0; tier < 3; tier++) {
		player.fuels.triso[tier].enriched = player.fuels.triso[tier].enriched.add(getTRISOFuelGain(tier).mul(tickInterval / 1000));
	}
}

function updateUITRISOFuel() {
	for (let tier = 0; tier < 3; tier++) {
		document.getElementById("fuel_triso_enriched" + (tier + 1)).innerText = notation(player.fuels.triso[tier].enriched);
		document.getElementById("fuel_triso_depleted" + (tier + 1)).innerText = notation(player.fuels.triso[tier].depleted);
		document.getElementById("fuel_triso_lifetime" + (tier + 1)).innerText = notation(player.fuels.triso[tier].lifetime / 1000);
		document.getElementById("fuel_triso_reprocess" + (tier + 1)).className = player.fuels.triso[tier].canReprocessDepleted ? "storebtn buy" : "storebtn locked";
		document.getElementById("fuel_triso_reprocesscost" + (tier + 1)).innerText = notation(player.fuels.triso[tier].reprocessEnergyCost);
	}
	for (let tier = 1; tier < 3; tier++) {
		document.getElementById("fuel_triso_enriched" + (tier + 1)).parentElement.parentElement.style.display = player.fuels.triso[tier - 1].enriched.add(player.fuels.triso[tier - 1].spent).gt(0) || player.fuels.triso[tier].enriched.add(player.fuels.triso[tier].spent).gt(0) ? "" : "none";
	}
}
