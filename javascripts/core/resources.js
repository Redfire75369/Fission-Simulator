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
	return Decimal.max(1, getFuelGain(tier).sub(getMinFuel(tier)).log(1.1));
}

function getMaxSteamGain(tier) {
	return player.reactors[0].amount.mul(player.reactors[0].totalMult).mul(player.eff.eff).mul(3 ** tier);
}
function getSteamGain(tier) {
	return getFuelGain(tier).gt(getMinFuel(tier)) ? getMaxSteamGain(tier).mul(getFuelReactorIncrement(tier)) : getFuelGain(tier).mul(getFuelReactorIncrement(tier));
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

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
}
function updateUIFuel() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("fuel_gain" + (tier + 1)).innerText = notation(getFuelGain(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("fuel_row" + (tier + 1)).style.display= player.nucleosynthesis + 4 > tier ? "" : "none";
	}
}