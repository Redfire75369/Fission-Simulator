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
	return player.reactor.amount[0].multiply(getTotalReactorMult(0)).multiply(player.eff.mult).multiply((3 ** (x + 1) - 1)/2);
}

function updateEnergy() {
	player.energy = player.energy.plus(getEnergyPerSecond().multiply(0.05));
	player.totalEnergy = player.totalEnergy.plus(getEnergyPerSecond().multiply(0.05));
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energyPerSecond").innerText = notation(getEnergyPerSecond());
}