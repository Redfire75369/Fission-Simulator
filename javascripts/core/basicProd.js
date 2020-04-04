const mineCostVar = {
	cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e4"), new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24")],
	costMult: [new Decimal("1e3"), new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e10"), new Decimal("1e12"), new Decimal("1e15")],
	pre308: [102, 76, 60, 50, 37, 29, 24, 18]
}
const reactorCostVar = {
	cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e4"), new Decimal("1e6"), new Decimal("1e9"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24")],
	costMult: [new Decimal("1e3"), new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e10"), new Decimal("1e12"), new Decimal("1e15")],
	pre308: [102, 76, 60, 50, 37, 29, 24, 18]
}

function resetMines() {
	player.mine = getDefaultData().mine;
}
function resetReactors() {
	player.reactor = getDefaultData().reactor;
}

function getMineCost(tier) {
	return mineCostVar.cost[tier].mul(mineCostVar.costMult[tier].pow(player.mine.bought[tier])).mul(Decimal.pow(10 - 0.5 * player.meltdown.breakUps[0], Decimal.max(0, player.mine.bought[tier] - mineCostVar.pre308[tier] - 1).mul(player.mine.bought[tier] - mineCostVar.pre308[tier]).div(2)));
}
function getReactorCost(tier) {
	return reactorCostVar.cost[tier].mul(reactorCostVar.costMult[tier].pow(player.reactor.bought[tier])).mul(Decimal.pow(10 - 0.5 * player.meltdown.breakUps[0], Decimal.max(0, player.reactor.bought[tier] - reactorCostVar.pre308[tier] - 1).mul(player.reactor.bought[tier] - reactorCostVar.pre308[tier]).div(2)));
}

function canBuyMine(tier) {
	return player.energy.gte(getMineCost(tier));
}
function canBuyReactor(tier) {
	return player.energy.gte(getReactorCost(tier));
}

function buyMine(tier) {
	if (canBuyMine(tier)) {
		player.energy = player.energy.sub(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
	}
}
function buyReactor(tier) {
	if (canBuyReactor(tier)) {
		player.energy = player.energy.sub(getReactorCost(tier));
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].add(1);
	}
}

function buyBulkMine(tier, bulk) {
	for (let i = 0; i < bulk + 1 && canBuyMine(tier); i++) {
		player.energy = player.energy.sub(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
	}
}
function buyBulkReactor(tier, bulk) {
	for (let i = 0; i < bulk + 1 && canBuyReactor(tier); i++) {
		player.energy = player.energy.sub(getReactorCost(tier));
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].add(1);
	}
}

function buyMaxMine(tier) {
	while (canBuyMine(tier)) {
		player.energy = player.energy.sub(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].add(1);
	}
}
function buyMaxReactor(tier) {
	while (canBuyReactor(tier)) {
		player.energy = player.energy.sub(getReactorCost(tier));
		player.reactor.bought[tier] += 1;
		player.reactor.amount[tier] = player.reactor.amount[tier].add(1);
	}
}

function buyMaxAll() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		buyMaxMine(tier);
		buyMaxReactor(tier);
	}
	buyMaxEff();
}

function getTotalMineMult(tier) {
	let mult = new Decimal(1);
	let perBuyMult = new Decimal(2);
	let nucleoMult = (player.nanites.ups[31] == 1) ? new Decimal(2.2) : new Decimal(2);
	mult = mult.mul(perBuyMult.pow(player.mine.bought[tier])).mul(nucleoMult.pow(max(0, player.nucleosynthesis - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier));
	mult = mult.mul((player.import42) ? 2 : 1);
	return Decimal.max(1, mult);
}
function getTotalReactorMult(tier) {
	let mult = new Decimal(1);
	let perBuyMult = new Decimal(2);
	let nucleoMult = (player.nanites.ups[31] == 1) ? new Decimal(2.2) : new Decimal(2);
	mult = mult.mul(perBuyMult.pow(player.reactor.bought[tier])).mul(nucleoMult.pow(max(0, player.nucleosynthesis - tier)));
	mult = mult.mul(getTotalNaniteUpMult(tier));
	mult = mult.mul((player.import42) ? 2 : 1);
	return Decimal.max(1, mult);
}

function getMineGain(tier) {
	return tier < 7 ? player.mine.amount[tier + 1].mul(getTotalMineMult(tier + 1)).mul(getEff()) : zero;
}
function getReactorGain(tier) {
	if (tier < 7) {
		return getMineGain(tier);
	} else {
		return new Decimal(0);
	}
}

function simulateMines(tickInterval = 50) {
	for (let tier = min(7, player.nucleosynthesis + 3); tier >= 0; tier--) {
		player.mine.amount[tier] = player.mine.amount[tier].add(getMineGain(tier).mul(tickInterval / 1000));
	}
}
function simulateReactors(tickInterval = 50) {
	for (let tier = min(7, player.nucleosynthesis + 3); tier >= 0; tier--) {
		player.reactor.amount[tier] = player.reactor.amount[tier].add(getReactorGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIMines() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById(mining[tier] + "Mine").innerText = notation(player.mine.amount[tier]) + " (" + player.mine.bought[tier] + ")";
		document.getElementById(mining[tier] + "MineCost").innerText = notation(getMineCost(tier));
		document.getElementById(mining[tier] + "BuySingle").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "BuyMax").className = canBuyMine(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(mining[tier] + "MineMult").innerText = notation(getTotalMineMult(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("mineRow" + (tier + 1)).style.display = (player.nucleosynthesis + 4 > tier && player.mine.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}
function updateUIReactors() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById(fissile[tier] + "Reactor").innerText = notation(player.reactor.amount[tier]) + " (" + player.reactor.bought[tier] + ")";
		document.getElementById(fissile[tier] + "ReactorCost").innerText = notation(getReactorCost(tier));
		document.getElementById(fissile[tier] + "BuySingle").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(fissile[tier] + "BuyMax").className = canBuyReactor(tier) ? "btnbuy" : "btnlocked";
		document.getElementById(fissile[tier] + "ReactorMult").innerText = notation(getTotalReactorMult(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("reactorRow" + (tier + 1)).style.display = (player.nucleosynthesis + 4 > tier && player.reactor.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}