function resetEff() {
	let effMultMult = player.eff.multMult;
	player.eff = getDefaultData().eff;
	player.eff.multMult = effMultMult;
}

function canBuyEff() {
	return player.energy.gte(player.eff.cost);
}

function buyEff() {
	if (canBuyEff()) {
		player.energy = player.energy.minus(player.eff.cost);
		player.eff.bought += 1;
		player.eff.cost = player.eff.cost.multiply(player.eff.costMult);
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
		if (player.eff.cost.gte(new Decimal("1e+308"))) {
			player.eff.costMult = player.eff.costMult.multiply(player.eff.costMultMult);
		}
	}
}

function buyMaxEff() {
	while (canBuyEff()) {
		player.energy = player.energy.minus(player.eff.cost);
		player.eff.bought += 1;
		player.eff.cost = player.eff.cost.multiply(player.eff.costMult);
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
		if (player.eff.cost.gte(new Decimal("1e+308"))) {
			player.eff.costMult = player.eff.costMult.multiply(player.eff.costMultMult);
		}
	}
}

function updateEff() {
	document.getElementById("effCost").innerText = notation(player.eff.cost);
	document.getElementById("eff").innerText = notation(player.eff.mult);
	document.getElementById("effMult").innerText = round((player.eff.multMult - 1) * 100, 2);
	document.getElementById("effBuySingle").className = canBuyEff() ? "btnbuy" : "btnlocked";
	document.getElementById("effBuyMax").className = canBuyEff() ? "btnbuy" : "btnlocked";
}