let naniteUpgradeCost = [new Decimal(1), new Decimal(2)];

function canBuyNaniteUpgrade(num) {
	return (player.nanites.nanites.gte(naniteUpgradeCost[num]));
}

function buyNaniteUpgrade(num) {
	if (canBuyNaniteUpgrade(num)) {
		if (num == 0) {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[num]);
			player.eff.multMult = player.eff.multMult.multiply(1.1);
		} else {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[num]);
			player.nanites.naniteUpg[num] = true;
		}
	}
}

function getNaniteUpgradeMult(num) {
	switch(num) {
		case 0:
			return;
		case 1:
			return player.nanites.nanites.plus(1);
		default:
	}
}

function updateNaniteUpgrades() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	document.getElementById("naniteupgmult1").innerText = notation(getNaniteUpgradeMult(1));
	
	for (let num = 0; num < player.nanites.naniteUpg.length; num++) {
		if (player.nanites.naniteUpg[num] == true) {
			document.getElementById("naniteupg" + num).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteupg" + num).className = canBuyNaniteUpgrade(num) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}