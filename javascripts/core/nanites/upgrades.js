let naniteUpgradeCost = [new Decimal(1), new Decimal(2), new Decimal(2)];

function canBuyNaniteUpgrade(id) {
	return (player.nanites.nanites.gte(naniteUpgradeCost[id]) & player.nanites.ups[id]);
}

function buyNaniteUpgrade(id) {
	if (canBuyNaniteUpgrade(id) & !player.nanites.ups[id]) {
		if (id == 0) {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[id]);
			player.eff.multMult = player.eff.multMult.multiply(1.1);
			player.eff.mult = player.eff.multMult.pow(player.eff.bought);
			player.nanites.nanites[id] += 1;
		} else {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpgradeCost[id]);
			player.nanites.nanites[id] += 1;
		}
	}
}

function getNaniteUpgradeMult(id) {
	switch(id) {
		case 0:
			return;
		case 1:
			return [8, max(1, log(player.time, 16))];
		case 2:
			return [8, max(1, 1)];
		default:
	}
}

function getTotalNaniteUpgradeMult(tier) {
	let ret = new Decimal(1);
	for (let a = 1; a < 8; a++) {
		if (player.nanites.ups[a]) {
			if (getNaniteUpgradeMult(a)[0].equals(tier)|getNaniteUpgradeMult(a)[0].equals(8)) {
				ret.multiply(getNaniteUpgradeMult(a)[1]);
			}
		}
	}
	return ret;
}

function updateNaniteUps() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	
	for (let id = 0; id < player.nanites.ups.length; id++) {
		if (id != 0) {
			document.getElementById("naniteupgmult" + id).innerText = notation(getNaniteUpgradeMult(id)[1]);
		}
		if (player.nanites.ups[id] == true) {
			document.getElementById("naniteupg" + id).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteupg" + id).className = canBuyNaniteUpgrade(id) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}