function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
}
