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
		if (player.reactor.cost[tier].gte(new Decimal("1e308"))) {
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
		if (player.reactor.cost[tier].gte(new Decimal("1e308"))) {
			player.reactor.costMult[tier] = player.reactor.costMult[tier].mul(player.reactor.costMultMult);
		}
	}
}

function buyMaxAllReactorEff() {
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		buyMaxReactor(tier);
	}
	buyMaxEff();
}

function getTotalReactorMult(tier) {
	let mult = player.reactor.mult[tier];
	mult = mult.mul(player.meteor.meteorMult.pow(max(0, player.meteor.shower - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier, "r"));
	return mult;
}

function getReactorGain(tier) {
	if (tier < 7) {
		return getMineGain(tier).sqrt();
	} else {
		return new Decimal(0);
	}
}

function simulateReactors(tickInterval = 50) {
	for (let tier = min(7, player.meteor.shower + 3); tier >= 0; tier--) {
		player.reactor.amount[tier] = player.reactor.amount[tier].add(getReactorGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIReactors() {
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		document.getElementById(fissile[tier] + "Reactor").innerText = notation(player.reactor.amount[tier]) + " (" + player.reactor.bought[tier] + ")";
		document.getElementById(fissile[tier] + "ReactorCost").innerText = notation(player.reactor.cost[tier]);
		document.getElementById(fissile[tier] + "BuySingle").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(fissile[tier] + "BuyMax").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(fissile[tier] + "ReactorMult").innerText = notation(getTotalReactorMult(tier));
	}
	for (let tier = 0; tier < 8; tier++) {
		if (tier != 0) { 
			if (((player.meteor.shower + 4) > tier) && (player.reactor.bought[tier - 1] > 0)) {
				document.getElementById("reactorRow" + (tier + 1)).style.display="table-row";
			} else {
				document.getElementById("reactorRow" + (tier + 1)).style.display="none";
			}
		}
	}
}