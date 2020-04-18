function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}
function resetFuel() {
	player.fuel = getDefaultData().fuel;
}

function getMinFuel(tier) {
	let minFuelReduction = player.meltdown.ups[31] == 1 ? 1/1.05 : 1;
	return player.reactor.amount[tier].mul(8 - tier);
}
function getFuelReactorIncrement(tier) {
	return Decimal.max(1, getTotalFuelGain(tier).sub(getMinFuel(tier)).log(1.1));
}

function getMaxEnergyGain(tier) {
	return player.reactor.amount[0].mul(getTotalReactorMult(0)).mul(getEff()).mul(3 ** tier);
}
function getEnergyGain(tier) {
	return getTotalFuelGain(tier).gt(getMinFuel(tier)) ? getMaxEnergyGain(tier).mul(getFuelReactorIncrement(tier)) : getTotalFuelGain(tier).mul(getFuelReactorIncrement(tier));
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

function getFuelDecayGain(tier) {
	if (tier == 7) {
		return zero;
	}
	return getFuelMineGain(tier + 1).div(2);
}
function getTotalFuelGain(tier) {
	return getFuelMineGain(tier).add(getFuelDecayGain(tier));
}


function simulateEnergy(tickInterval = 50) {
	player.energy = player.energy.add(getTotalEnergyGain().mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.plus(getTotalEnergyGain().mul(tickInterval / 1000));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energy_gain").innerText = notation(getTotalEnergyGain());
}
function updateUIFuel() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("fuel_totalgain" + (tier + 1)).innerText = notation(getTotalFuelGain(tier));
		document.getElementById("fuel_minegain" + (tier + 1)).innerText = notation(getFuelMineGain(tier));
		document.getElementById("fuel_decaygain" + (tier + 1)).innerText = notation(getFuelDecayGain(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("fuel_row" + (tier + 1)).style.display= player.nucleosynthesis + 4 > tier && player.mine.bought[tier - 1] > 0 ? "table-row" : "none";
	}
}