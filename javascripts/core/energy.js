function setEnergy(num) {
	player.energy = new Decimal(num);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function getMinFuel(tier) {
	let minFuelReduction = player.meltdown.ups[31] == 1 ? 1/1.05 : 1;
	return player.reactors[tier].amount.mul(8 - tier);
}
function getFuelReactorIncrement(tier) {
	return Decimal.max(1, getFuelGain(tier).sub(getMinFuel(tier)).log(1.1));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
}
