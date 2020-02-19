let naniteUpgradeCost = [new Decimal(1), new Decimal(2), new Decimal(2)];

function canBuyNaniteUpgrade(num) {
	return (player.nanites.nanites.gte(naniteUpgradeCost[num]));
}

function buyNaniteUpgrade(num) {
	if (canBuyNaniteUpgrade(num) & !player.nanites.upgrades[num]) {
		if (num == 0) {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[num]);
			player.eff.multMult = player.eff.multMult.multiply(1.1);
			player.nanites.nanites[num] += 1;
		} else {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[num]);
			player.nanites.nanites[num] = true;
		}
	}
}

function getNaniteUpgradeMult(num) {
	switch(num) {
		case 0:
			return;
		case 1:
			return [8, new Decimal(max(1, 2 * log(player.time, 256) - 1))];
		case 2:
			return [8, new Decimal(player.meteor.shower / 4 + 1)];
		default:
	}
}

function getTotalNaniteUpgradeMult(tier) {
	let ret = new Decimal(1);
	for (let a = 1; a < 8; a++) {
		if (player.nanites.upgrades[a]) {
			if (getNaniteUpgradeMult(a)[0].equals(tier)|getNaniteUpgradeMult(a)[0].equals(8)) {
				ret.multiply(getNaniteUpgradeMult(a)[1]);
			}
		}
	}
	return ret;
}

function updateNaniteUpgrades() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	
	for (let num = 0; num < player.nanites.upgrades.length; num++) {
		if (num != 0) {
			document.getElementById("naniteupgmult" + num).innerText = notation(getNaniteUpgradeMult(num)[1]);
		}
		if (player.nanites.upgrades[num] == true) {
			document.getElementById("naniteupg" + num).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteupg" + num).className = canBuyNaniteUpgrade(num) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}