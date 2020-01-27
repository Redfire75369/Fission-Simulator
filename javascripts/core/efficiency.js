function getEffCost() {
	return getDefaultData().eff.cost.multiply(player.eff.costMult.pow(player.eff.bought));
}

function resetEff() {
	player.eff = getDefaultData().eff;
}

function canBuyEff() {
	if (player.fuel.gte(getEffCost())) {
		return true;
	} else {
		return false;
	}
}

function buyEff() {
	if (canBuyEff()) {
		player.fuel = player.fuel.minus(getEffCost());
		player.eff.bought += 1;
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
	}
}

function updateEff() {
	document.getElementById("effCost").innerText = "Cost: " + notation(getEffCost());
	document.getElementById("eff").innerText = "Efficiency: " + notation(player.eff.mult);
}