function getReactorCost(tier) {
	return getDefaultData().reactor.cost[tier].multiply(player.reactor.costMult[tier].pow(player.reactor.bought[tier]));
}

function resetReactors() {
	player.reactor = getDefaultData().reactor;
}
function canBuyReactor(tier) {
	return player.energy.gte(getReactorCost(tier));
}

function buyReactor(tier) {
	if (canBuyReactor(tier)) {
		player.energy = player.energy.minus(player.reactor.cost[tier]);
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].plus(1);
		player.reactor.cost[tier]= player.reactor.cost[tier].multiply(player.reactor.costMult[tier]);
		if (player.reactor.cost[tier].gte(new Decimal("1e+308"))) {
			player.reactor.costMult[tier] = player.reactor.costMult[tier].multiply(player.reactor.costMultMult);
		}
	}
}

function buyMaxReactor(tier) {
	while (canBuyReactor(tier)) {
		player.energy = player.energy.minus(player.reactor.cost[tier]);
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].plus(1);
		player.reactor.cost[tier] = player.reactor.cost[tier].multiply(player.reactor.costMult[tier]);
		player.reactor.mult[tier] = player.reactor.mult[tier].multiply(player.reactor.multMult);
		if (player.reactor.cost[tier].gte(new Decimal("1e+308"))) {
			player.reactor.costMult[tier] = player.reactor.costMult[tier].multiply(player.reactor.costMultMult);
		}
	}
}

function getTotalReactorMult(tier) {
	return player.reactor.mult.multiply(player.meteor.meteorMult.pow(min(0, player.meteor.shower - tier)));
}

function getReactorPerSecond(tier) {
	if (tier < 7) {
		return player.reactor.amount[tier + 1].multiply(getTotalReactorMult(tier + 1)).multiply(player.eff.mult);
	} else {
		return new Decimal(0);
	}
}

function updateReactors() {
	for (let tier = 0; tier < min(player.meteor.shower + 4, 8); tier++) {
		player.reactor.amount[tier] = player.reactor.amount[tier].plus(getReactorPerSecond(tier).multiply(20 / 1000));
		document.getElementById(elements[tier] + "Reactor").innerText = notation(player.reactor.amount[tier]) + " (" + player.reactor.bought[tier] + ")";
		document.getElementById(elements[tier] + "ReactorCost").innerText = notation(player.reactor.cost[tier]);
		document.getElementById(elements[tier] + "BuySingle").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(elements[tier] + "BuyMax").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(elements[tier] + "ReactorMult").innerText = notation(getTotalReactorMult(tier));
	}
	for (let tier = 0; tier < 8; tier++) {
		if (tier != 0) { 
			if (((player.meteor.shower + 4) > tier) & (player.reactor.bought[tier - 1] > 0)) {
				document.getElementById("row" + (tier + 1)).style.display="table-row";
			} else {
				document.getElementById("row" + (tier + 1)).style.display="none";
			}
		}
	}
}