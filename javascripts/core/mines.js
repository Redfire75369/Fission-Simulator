const mineCostVar = {
	cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e4"), new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24")],
	costMult: [new Decimal("1e3"), new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e10"), new Decimal("1e12"), new Decimal("1e15")],
	pre308: [102, 76, 60, 50, 37, 29, 24, 18]
}

function resetMines() {
	player.mine = getDefaultData().mine;
}

function getMineCost(tier) {
	return mineCostVar.cost[tier].mul(mineCostVar.costMult[tier].pow(player.mine.bought[tier])).mul(Decimal.pow(10 - 0.5 * player.meltdown.breakUps[0], Decimal.max(0, player.mine.bought[tier] - mineCostVar.pre308[tier] - 1).mul(player.mine.bought[tier] - mineCostVar.pre308[tier]).div(2)));
}

function canBuyMine(tier) {
	return player.energy.gte(getMineCost(tier));
}

function buyMine(tier) {
	if (canBuyMine(tier)) {
		player.energy = player.energy.sub(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
		player.mine.mult[tier] = player.mine.mult[tier].mul(player.mine.multMult);
	}
}

function buyMaxMine(tier) {
	while (canBuyMine(tier)) {
		player.energy = player.energy.sub(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
		player.mine.mult[tier] = player.mine.mult[tier].mul(player.mine.multMult);
	}
}

function getTotalMineMult(tier) {
	let mult = player.mine.mult[tier];
	mult = mult.mul(player.meteor.meteorMult.pow(max(0, player.meteor.shower - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier));
	return mult;
}

function getMineGain(tier) {
	return tier < 7 ? player.mine.amount[tier + 1].mul(getTotalMineMult(tier + 1)).mul(getEff()) : zero;
}

function simulateMines(tickInterval = 50) {
	for (let tier = min(7, player.meteor.shower + 3); tier >= 0; tier--) {
		player.mine.amount[tier] = player.mine.amount[tier].add(getMineGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIMines() {
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		document.getElementById(mining[tier] + "Mine").innerText = notation(player.mine.amount[tier]) + " (" + player.mine.bought[tier] + ")";
		document.getElementById(mining[tier] + "MineCost").innerText = notation(getMineCost(tier));
		document.getElementById(mining[tier] + "BuySingle").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "BuyMax").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "MineMult").innerText = notation(getTotalMineMult(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("mineRow" + (tier + 1)).style.display = (player.meteor.shower + 4 > tier && player.mine.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}