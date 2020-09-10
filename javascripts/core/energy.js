function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("energy_gain").innerText = notation(pebblebedFissionTotalEnergyGain());

	document.getElementById("prestige_tabbtn").style.display = player.unlocked.prestige ? "" : "none";
}
