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
	return player.reactors[tier].amount.mul(8 - tier);
}
function getFuelReactorIncrement(tier) {
	return Decimal.max(1, getTotalFuelGain(tier).sub(getMinFuel(tier)).log(1.1));
}

function getMaxSteamGain(tier) {
	return player.reactors[0].amount.mul(player.reactors[0].totalMult).mul(player.eff.eff).mul(3 ** tier);
}
function getSteamGain(tier) {
	return getTotalFuelGain(tier).gt(getMinFuel(tier)) ? getMaxSteamGain(tier).mul(getFuelReactorIncrement(tier)) : getTotalFuelGain(tier).mul(getFuelReactorIncrement(tier));
}
function getTotalSteamGain(tier) {
	let ret = zero;
	for (let i = 0; i < 8; i++) {
		if (player.reactors[i].enabled) {
			ret = ret.add(getSteamGain(i));
		}
	}
	return ret;
}

function getFuelMineGain(tier) {
	let x = 0;
	for (let a = tier; a < 8; a++) {
		if (player.mines[a].amount.gt(0)) {
			x++;
		}
	}
	return player.mines[tier].amount.mul(player.mines[tier].totalMult).mul(((3 ** x) - 1)/2);
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

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
}
function updateUIFuel() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("fuel_totalgain" + (tier + 1)).innerText = notation(getTotalFuelGain(tier));
		document.getElementById("fuel_minegain" + (tier + 1)).innerText = notation(getFuelMineGain(tier));
		document.getElementById("fuel_decaygain" + (tier + 1)).innerText = notation(getFuelDecayGain(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("fuel_row" + (tier + 1)).style.display= player.nucleosynthesis + 4 > tier && player.mines[tier - 1].bought > 0 ? "" : "none";
	}
}