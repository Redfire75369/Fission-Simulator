function setEnergy(num) {
	player.energy = infinity;
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function getMaxEnergyGain(tier) {
	return player.reactor.amount[0].mul(getTotalReactorMult(0)).mul(player.eff.mult).mul(3 ** tier).mul(4);
}
function getEnergyGain(tier) {
	return (player.fuel[tier].mul(JkgLEF[tier]).gt(getMaxEnergyGain(tier))) ? getMaxEnergyGain(tier) : player.fuel[tier].mul(JkgLEF[tier]);
}
function getTotalEnergyGain() {
	let ret = zero;
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		ret = ret.add(getEnergyGain(tier));
	}
	return ret;
}

function simulateEnergy(tickInterval = 50) {
	player.energy = player.energy.add(getTotalEnergyGain().mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.plus(getTotalEnergyGain().mul(tickInterval / 1000));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("netEnergy").innerText = notation(getTotalEnergyGain());
	document.getElementById("energy2").innerText = notation(player.energy);
	document.getElementById("energyGain").innerText = notation(getTotalEnergyGain());
}