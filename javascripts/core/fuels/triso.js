class TRISOFuel {
	constructor(tier) {
		this.tier = tier;
		this.enriched = zero;
		this.depleted = zero;
	}

	get lifetime() {
		let mul = Decimal.pow(1.4, player.reactors.pebblebeds[this.tier].bought);
		mul = mul.mul(player.reactors.pebblebeds[this.tier].amount);
		return Decimal.pow(4, this.tier).mul(8000).div(mul);
	}
	get reprocessingTime() {
		return 1000 * pow(3, this.tier + 1);
	}
	get reprocessEnergyCost() {
		return this.depleted.mul(Decimal.pow(80, this.tier + 1));
	}
	get canReprocessDepleted() {
		return this.depleted.gt(0) && this.tier < 2 && player.energy.gt(this.reprocessEnergyCost) && !document.getElementById("fuel_triso_reprocess" + (this.tier + 1)).disabled;
	}
	get efficiency() {
		return new Decimal(1);
	}
	get energyPerPellet() {
		return this.efficiency.mul(Decimal.pow(120, this.tier + 1));
	}

	reprocessDepleted() {
		if (this.canReprocessDepleted) {
			var reprocesselement = document.getElementById("fuel_triso_reprocess" + (this.tier + 1));
			reprocesselement.children[0].style.transition = this.reprocessingTime / 1000 + "s width linear";
			reprocesselement.children[0].style.width = "100%";
			reprocesselement.children[0].height = reprocesselement.height;
			reprocesselement.disabled = true;
			console.log(reprocesselement.children[0].style.width);

			player.energy = player.energy.sub(this.reprocessEnergyCost);
			let depleted = this.depleted;
			let tier = this.tier;
			this.depleted = zero;
			setTimeout(function() {
				reprocesselement.children[0].style.transition = "";
				reprocesselement.children[0].style.width = "0";
				reprocesselement.disabled = false;

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
		return player.mines.effective.mul(player.mines.tier - tier + 1).div(20);
	}
	return zero;
}

function simulateTRISOFuel(tickInterval = 50) {
	player.unlocked.fuelReprocessing |= player.reactors.pebblebeds[1].bought > 0;

	for (let tier = 0; tier < 3; tier++) {
		player.fuels.triso[tier].enriched = player.fuels.triso[tier].enriched.add(getTRISOFuelGain(tier).mul(tickInterval / 1000));
	}
}
