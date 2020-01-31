let naniteUpgradeCost = [new Decimal(2)];

function canBuyNaniteUpgrade(num) {
	return (player.nanites.nanites.gte(naniteUpgradeCost[num]));
}

function upgradeEffMult() {
	player.nanites.nanites -= 1;
	player.eff.multMult = new Decimal(1.21);
}

function buyNaniteUpgrade(num) {
	if (canBuyNaniteUpgrade(num)) {
		player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[num]);
		player.nanites.naniteUpg[num] = true;
	}
}

function getNaniteBoost(num) {
	switch(num) {
		case 0:
			return player.nanites.nanites.plus(1);
		default:
	}
}

function updateNaniteUpgrades() {
	document.getElementById("naniteCount").innerText = notation(player.nanites.nanites);
	document.getElementById("naniteupg1").innerText = notation(getNaniteBoost(0));
	
	for (let num = 0; num < 1; num++) {
		if (player.nanites.naniteUpg[num] == true) {
			document.getElementById("naniteupg" + (num + 1)).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteupg" + (num + 1)).className = canBuyNaniteUpgrade(num) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}