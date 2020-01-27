function setFuel(num) {
	player.fuel = new Decimal(num);
}

function resetFuel() {
	player.fuel = getDefaultData().fuel;
}

function getFuelPerSecond() {
	return player.mine.amount[0].multiply(getTotalMineMult(0)).multiply(player.eff.mult);
}

function updateFuel() {
	player.fuel = player.fuel.plus(getFuelPerSecond().multiply(0.05));
	document.getElementById("fuel").innerText = "You have " + notation(player.fuel) + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + notation(getFuelPerSecond()) + " Nuclear Fuel per second.";
}