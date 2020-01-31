function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function getEnergyPerSecond() {
	return player.reactor.amount[0].multiply(getTotalReactorMult(0)).multiply(player.eff.mult);
}

function updateEnergy() {
	player.energy = player.energy.plus(getEnergyPerSecond().multiply(0.05));
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energyPerSecond").innerText = notation(getEnergyPerSecond());
}