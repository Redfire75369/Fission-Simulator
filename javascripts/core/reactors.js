function resetReactors() {
	player.reactor = getDefaultData().reactor;
}
function canBuyReactor(tier) {
	return player.energy.gte(player.reactor.cost[tier]);
}

function buyReactor(tier) {
	if (canBuyReactor(tier)) {
		player.energy = player.energy.sub(player.reactor.cost[tier]);
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].add(1);
		player.reactor.cost[tier]= player.reactor.cost[tier].mul(player.reactor.costMult[tier]);
		player.reactor.mult[tier] = player.reactor.mult[tier].mul(player.reactor.multMult);
		if (player.reactor.cost[tier].gte(new Decimal("1e+308"))) {
			player.reactor.costMult[tier] = player.reactor.costMult[tier].mul(player.reactor.costMultMult);
		}
	}
}

function buyMaxReactor(tier) {
	while (canBuyReactor(tier)) {
		player.energy = player.energy.sub(player.reactor.cost[tier]);
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].add(1);
		player.reactor.cost[tier] = player.reactor.cost[tier].mul(player.reactor.costMult[tier]);
		player.reactor.mult[tier] = player.reactor.mult[tier].mul(player.reactor.multMult);
		if (player.reactor.cost[tier].gte(new Decimal("1e+308"))) {
			player.reactor.costMult[tier] = player.reactor.costMult[tier].mul(player.reactor.costMultMult);
		}
	}
}

function buyMaxAllReactorEff() {
	for (let tier = 0; tier < min(8, max(4, player.meteor.shower + 4)); tier++) {
		buyMaxReactor(tier);
	}
	buyMaxEff();
}

function getTotalReactorMult(tier) {
	let mult = player.reactor.mult[tier];
	mult = mult.mul(player.meteor.meteorMult.pow(max(0, player.meteor.shower - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier));
	return mult;
}

function getReactorPerSecond(tier) {
	if (tier < 7) {
		return player.reactor.amount[tier + 1].mul(getTotalReactorMult(tier + 1)).mul(player.eff.mult);
	} else {
		return new Decimal(0);
	}
}

function updateReactors(tickInterval = 50) {
	for (let tier = Math.min(7, player.meteor.shower + 3); tier >= 0; tier--) {
		player.reactor.amount[tier] = player.reactor.amount[tier].add(getReactorPerSecond(tier).mul(tickInterval / 1000));
	}
	
}

function updateUIReactors() {
	for (let tier = 0; tier < Math.min(8, player.meteor.shower + 4); tier++) {
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