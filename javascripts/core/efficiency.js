function getEffCost() {
	return getDefaultData().eff.cost.multiply(player.eff.costMult.pow(player.eff.bought));
}

function resetEff() {
	player.eff = getDefaultData().eff;
}

function canBuyEff() {
	return player.energy.gte(getEffCost());
}

function buyEff() {
	if (canBuyEff()) {
		player.energy = player.energy.minus(getEffCost());
		player.eff.bought += 1;
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
	}
}

function buyMaxEff() {
	while (canBuyEff()) {
		player.energy = player.energy.minus(getEffCost());
		player.eff.bought += 1;
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
	}
}

function updateEff() {
	document.getElementById("effBuySingle").innerText = "Cost: " + notation(getEffCost());
	document.getElementById("eff").innerText = "Efficiency: " + notation(player.eff.mult);
	document.getElementById("effBuySingle").className = canBuyEff() ? "btnbuy" : "btnlocked";
	document.getElementById("effBuyMax").className = canBuyEff() ? "btnbuy" : "btnlocked";
}