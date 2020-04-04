function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}
function resetFuel() {
	player.fuel = getDefaultData().fuel;
}

function getMaxEnergyGain(tier) {
	return player.reactor.amount[0].mul(getTotalReactorMult(0)).mul(getEff()).mul(3 ** tier).mul(JkgLEF[tier]);
}
function getEnergyGain(tier) {
	return (getTotalFuelGain(tier).mul(JkgLEF[tier]).gt(getMaxEnergyGain(tier))) ? getMaxEnergyGain(tier) : getTotalFuelGain(tier).mul(JkgLEF[tier]);
}
function getTotalEnergyGain() {
	let ret = zero;
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		ret = ret.add(getEnergyGain(tier));
	}
	return ret;
}

function getFuelMineGain(tier) {
	let x = 0;
	for (let a = tier; a < 8; a++) {
		if (player.mine.amount[a].gt(0)) {
			x++;
		}
	}
	return player.mine.amount[tier].mul(getTotalMineMult(tier)).mul(getEff()).mul(((3 ** x) - 1)/2).div(tier + 1);
}
function getFuelReactorGain(tier) {
	if (tier == 7) {
		return zero;
	}
	let y = 0;
	for (let a = tier; a < 8; a++) {
		if (player.reactor.amount[a].gt(0)) {
			y++;
		}
	}
	return player.reactor.amount[tier + 1].mul(getTotalReactorMult(tier + 1)).mul(getEff()).mul(((3 ** y) - 1)/2);
	
}
function getFuelDecayGain(tier) {
	if (tier == 7) {
		return zero;
	}
	return getFuelMineGain(tier + 1).pow(0.8);
}
function getTotalFuelGain(tier) {
	return getFuelMineGain(tier).add(getFuelReactorGain(tier)).add(getFuelDecayGain(tier));
}


function simulateEnergy(tickInterval = 50) {
	player.energy = player.energy.add(getTotalEnergyGain().mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.plus(getTotalEnergyGain().mul(tickInterval / 1000));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energyGain").innerText = notation(getTotalEnergyGain());
}
function updateUIFuel() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById(LEF[tier] + "Gain").innerText = notation(getTotalFuelGain(tier));
		document.getElementById(LEF[tier] + "GainMine").innerText = notation(getFuelMineGain(tier));
		document.getElementById(LEF[tier] + "GainReactor").innerText = notation(getFuelReactorGain(tier));
		document.getElementById(LEF[tier] + "GainDecay").innerText = notation(getFuelDecayGain(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById(LEF[tier] + "Row").style.display= (player.nucleosynthesis + 4 > tier && player.mine.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}