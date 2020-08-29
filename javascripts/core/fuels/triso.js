var reprocessing = [false, false, false];

class TRISOFuel {
	constructor(tier) {
		this.tier = tier;
		this.enriched = zero;
		this.depleted = zero;
	}

	get lifetime() {
		let mul = Decimal.pow(1.8, player.reactors.pebblebeds[this.tier].bought);
		mul = mul.mul(player.reactors.pebblebeds[this.tier].amount.add(9));
		return Decimal.pow(14.4, this.tier).mul(250).div(mul);
	}
	get reprocessingTime() {
		return 1000 * pow(3, this.tier + 1);
	}
	get reprocessEnergyCost() {
		if (this.tier === 2) {
			return this.depleted.pow(4.2).mul("1e20");
		}
		return this.depleted.mul(Decimal.pow(120, 3 * this.tier + 1));
	}
	get canReprocessDepleted() {
		return this.depleted.gte(this.tier === 2 ? "2.5e2" : "1") && player.energy.gt(this.reprocessEnergyCost) && !document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).disabled;
	}
	get energyPerPellet() {
		return Decimal.pow(150, 3* this.tier + 1);
	}

	reprocessDepleted() {
		if (this.canReprocessDepleted) {
			let reprocessElement = document.getElementById("fuel_triso_reprocess" + (this.tier + 1));
			reprocessing[this.tier] = true;
			reprocessElement.disabled = true;

			player.energy = player.energy.sub(this.reprocessEnergyCost);
			let depleted = this.depleted;
			let tier = this.tier;

			this.depleted = zero;
			setTimeout(function() {
				reprocessElement.disabled = false;
				reprocessing[tier] = !reprocessing[tier];

				if (this.tier === 2) {
					player.prestige.americium = depleted.log(12) / 3;
					return;
				}
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
		return player.mines.effective.mul(player.mines.tier - tier + 1).div(0.08 * pow(250, tier + 1));
	}
	return zero;
}

function simulateTRISOFuel(tickInterval = 50) {
	player.unlocked.fuelReprocessing |= player.reactors.pebblebeds[1].bought > 0;

	for (let tier = 0; tier < 3; tier++) {
		player.fuels.triso[tier].enriched = player.fuels.triso[tier].enriched.add(getTRISOFuelGain(tier).mul(tickInterval / 1000));
	}
}
