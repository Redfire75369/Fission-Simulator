function resetMines() {
	player.mine = getDefaultData().mine;
}

function canBuyMine(tier) {
	return player.energy.gte(player.mine.cost[tier]);
}

function buyMine(tier) {
	if (canBuyMine(tier)) {
		player.energy = player.energy.sub(player.mine.cost[tier]);
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
		player.mine.cost[tier]= player.mine.cost[tier].mul(player.mine.costMult[tier]);
		player.mine.mult[tier] = player.mine.mult[tier].mul(player.mine.multMult);
		if (player.mine.cost[tier].gte(infinity)) {
			player.mine.costMult[tier] = player.mine.costMult[tier].mul(player.mine.costMultMult);
		}
	}
}

function buyMaxMine(tier) {
	while (canBuyMine(tier)) {
		player.energy = player.energy.sub(player.mine.cost[tier]);
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
		player.mine.cost[tier] = player.mine.cost[tier].mul(player.mine.costMult[tier]);
		player.mine.mult[tier] = player.mine.mult[tier].mul(player.mine.multMult);
		if (player.mine.cost[tier].gte(infinity)) {
			player.mine.costMult[tier] = player.mine.costMult[tier].mul(player.mine.costMultMult);
		}
	}
}

function getTotalMineMult(tier) {
	let mult = player.mine.mult[tier];
	mult = mult.mul(player.meteor.meteorMult.pow(max(0, player.meteor.shower - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier, "m"));
	return mult;
}

function getMineGain(tier) {
	return tier < 7 ? player.mine.amount[tier + 1].mul(getTotalMineMult(tier + 1)).mul(player.eff.mult) : zero;
}

function simulateMines(tickInterval = 50) {
	for (let tier = min(7, player.meteor.shower + 3); tier >= 0; tier--) {
		player.mine.amount[tier] = player.mine.amount[tier].add(getMineGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIMines() {
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		document.getElementById(mining[tier] + "Mine").innerText = notation(player.mine.amount[tier]) + " (" + player.mine.bought[tier] + ")";
		document.getElementById(mining[tier] + "MineCost").innerText = notation(player.mine.cost[tier]);
		document.getElementById(mining[tier] + "BuySingle").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "BuyMax").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "MineMult").innerText = notation(getTotalMineMult(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("mineRow" + (tier + 1)).style.display = (player.meteor.shower + 4 > tier && player.mine.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}