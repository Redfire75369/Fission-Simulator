function getMineCost(tier) {
	return getDefaultData().mine.cost[tier].multiply(player.mine.costMult[tier].pow(player.mine.bought[tier]));
}

function resetMines() {
	player.mine = getDefaultData().mine;
}
function canBuyMine(tier) {
	if (player.fuel.gte(getMineCost(tier))) {
		return true;
	} else {
		return false;
	}
}

function buyMine(tier) {
	if (canBuyMine(tier)) {
		player.fuel = player.fuel.minus(getMineCost(tier));
		player.mine.bought[tier] += 1;
		player.mine.amount[tier] = player.mine.amount[tier].plus(1);
	}
}

function buyMaxMine(tier) {
	if (canBuyMine(tier)) {
		max = floor(player.fuel.dividedBy(defaultData.mine.cost[tier]).log(player.mine.costMult));
		player.mine.amount[tier] = player.mine.amount[tier].plus(max - player.mine.bought[tier]);
		player.mine.bought[tier] = max;
	}
}

function getTotalMineMult(tier) {
	if (player.meteor >= tier) {
		return getDefaultData().mine.mult[tier].multiply(player.multMult.pow(player.mine.bought[tier])).multiply(player.meteorMult.pow(player.meteor - tier));
	} else {
		return getDefaultData().mine.mult[tier].multiply(player.multMult.pow(player.mine.bought[tier]));
	}
}

function getMinePerSecond(tier) {
	if (tier < 7) {
		return player.mine.amount[tier + 1].multiply(getTotalMineMult(tier + 1)).multiply(player.eff.mult);
	} else {
		return new Decimal(0);
	}
}

function updateMines() {
	for (let tier = 0; tier < min(player.meteor + 4, 8); tier++) {
		player.mine.amount[tier] = player.mine.amount[tier].plus(getMinePerSecond(tier).multiply(20 / 1000));
		document.getElementById(elements[tier] + "Mine").innerText = notation(player.mine.amount[tier]);
		document.getElementById(elements[tier] + "MineCost").innerText = "Cost: " + notation(getMineCost(tier));
		document.getElementById(elements[tier] + "MineCost").className = canBuyMine(tier) ? "minebtnbuy" : "minebtnlocked";
		document.getElementById(elements[tier] + "MineMult").innerText = elements[tier] + " Mine ×" + notation(getTotalMineMult(tier));
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