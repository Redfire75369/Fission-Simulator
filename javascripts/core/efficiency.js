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
		player.energy = player.energy.sub(player.eff.cost);
		player.eff.bought += 1;
		player.eff.cost = player.eff.cost.mul(player.eff.costMult);
		player.eff.mult = player.eff.mult.mul(player.eff.multMult);
		if (player.eff.cost.gte(infinity)) {
			player.eff.costMult = player.eff.costMult.mul(player.eff.costMultMult);
		}
	}
}

function buyMaxEff() {
	while (canBuyEff()) {
		player.energy = player.energy.sub(player.eff.cost);
		player.eff.bought += 1;
		player.eff.cost = player.eff.cost.mul(player.eff.costMult);
		player.eff.mult = player.eff.mult.mul(player.eff.multMult);
		if (player.eff.cost.gte(infinity)) {
			player.eff.costMult = player.eff.costMult.mul(player.eff.costMultMult);
		}
	}
}

function updateUIEff() {
	document.getElementById("effCost").innerText = notation(player.eff.cost);
	document.getElementById("eff").innerText = notation(player.eff.mult);
	document.getElementById("effMult").innerText = round((player.eff.multMult - 1) * 100, 2);
	document.getElementById("effBuySingle").className = canBuyEff() ? "btnbuy" : "btnlocked";
	document.getElementById("effBuyMax").className = canBuyEff() ? "btnbuy" : "btnlocked";
}