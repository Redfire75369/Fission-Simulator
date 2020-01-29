function getReactorCost(tier) {
	return getDefaultData().reactor.cost[tier].multiply(player.reactor.costMult[tier].pow(player.reactor.bought[tier]));
}

function resetReactors() {
	player.reactor = getDefaultData().reactor;
}
function canBuyReactor(tier) {
	if (player.energy.gte(getReactorCost(tier))) {
		return true;
	} else {
		return false;
	}
}

function buyReactor(tier) {
	if (canBuyReactor(tier)) {
		player.energy = player.energy.minus(player.reactor.cost[tier]);
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].plus(1);
		player.reactor.cost = player.reactor.cost[tier].multiply(player.reactor.costMult[tier]);
		player.reactor.costMult[tier] = player.reactor.costMult[tier].multiply(player.costMultMult);
	}
}

function buyMaxReactor(tier) {
	while (canBuyReactor(tier)) {
			player.energy = player.energy.minus(player.reactor.cost[tier]);
			player.reactor.bought[tier] += 1;
			player.reactor.amount[tier] = player.reactor.amount[tier].plus(1);
			player.reactor.cost[tier] = player.reactor.cost[tier].multiply(player.reactor.costMult[tier]);
			player.reactor.costMult[tier] = player.reactor.costMult[tier].multiply(player.costMultMult);
	}
}

function getTotalReactorMult(tier) {
	if (player.meteor >= tier) {
		return getDefaultData().reactor.mult[tier].multiply(player.multMult.pow(player.reactor.bought[tier])).multiply(player.meteorMult.pow(player.meteor - tier));
	} else {
		return getDefaultData().reactor.mult[tier].multiply(player.multMult.pow(player.reactor.bought[tier]));
	}
}

function getReactorPerSecond(tier) {
	if (tier < 7) {
		return player.reactor.amount[tier + 1].multiply(getTotalReactorMult(tier + 1)).multiply(player.eff.mult);
	} else {
		return new Decimal(0);
	}
}

function updateReactors() {
	for (let tier = 0; tier < min(player.meteor + 4, 8); tier++) {
		player.reactor.amount[tier] = player.reactor.amount[tier].plus(getReactorPerSecond(tier).multiply(20 / 1000));
		document.getElementById(elements[tier] + "Reactor").innerText = notation(player.reactor.amount[tier]) + " (" + player.reactor.bought[tier] + ")";
		document.getElementById(elements[tier] + "BuySingle").innerText = "Cost: " + notation(player.reactor.cost[tier]);
		document.getElementById(elements[tier] + "BuySingle").className = canBuyReactor(tier) ? "reactorbtnbuy" : "reactorbtnlocked";
		document.getElementById(elements[tier] + "BuyMax").className = canBuyReactor(tier) ? "reactorbtnbuy" : "reactorbtnlocked";
		document.getElementById(elements[tier] + "ReactorMult").innerText = isotopes[tier] + " Reactor ×" + notation(getTotalReactorMult(tier));
	}

	if (player.meteor == 0) {
		document.getElementById("row5").style.display = "none";
		document.getElementById("row6").style.display = "none";
		document.getElementById("row7").style.display = "none";
		document.getElementById("row8").style.display = "none";
	} else if (player.meteor == 1) {
		document.getElementById("row5").style.display = "table-row";
		document.getElementById("row6").style.display = "none";
		document.getElementById("row7").style.display = "none";
		document.getElementById("row8").style.display = "none";
	} else if (player.meteor == 2) {
		document.getElementById("row5").style.display = "table-row";
		document.getElementById("row6").style.display = "table-row";
		document.getElementById("row7").style.display = "none";
		document.getElementById("row8").style.display = "none";
	} else if (player.meteor == 3) {
		document.getElementById("row5").style.display = "table-row";
		document.getElementById("row6").style.display = "table-row";
		document.getElementById("row7").style.display = "table-row";
		document.getElementById("row8").style.display = "none";
	} else if (player.meteor >= 4) {
		document.getElementById("row5").style.display = "table-row";
		document.getElementById("row6").style.display = "table-row";
		document.getElementById("row7").style.display = "table-row";
		document.getElementById("row8").style.display = "table-row";
	}
}