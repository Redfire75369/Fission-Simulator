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
	document.getElementById("energy").innerText = "You have " + notation(player.energy) + " Energy.";
	document.getElementById("energyPerSecond").innerText = "You are gaining " + notation(getEnergyPerSecond()) + " Energy per second.";
}