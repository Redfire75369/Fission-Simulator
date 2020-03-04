function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function getEnergyPerSecond() {
	let x = 0;
	for (let a = 0; a < 8; a++) {
		if (player.reactor.amount[a].gt(0)) {
			x++;
		}
	}
	return player.reactor.amount[0].mul(getTotalReactorMult(0)).mul(player.eff.mult).mul(((3 ** x) - 1)/2);
}

function simulateEnergy(tickInterval = 50) {
	player.energy = player.energy.add(getEnergyPerSecond().mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.plus(getEnergyPerSecond().mul(tickInterval / 1000));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energyPerSecond").innerText = notation(getEnergyPerSecond());
}