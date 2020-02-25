let naniteUpCost = [new Decimal(1), new Decimal(1), new Decimal(1)];

function canBuyNaniteUp(id) {
	if (id == 0 & player.nanites.ups < 2) {
		return player.nanites.nanites.gte(naniteUpCost[id]);
	}
	return (player.nanites.nanites.gte(naniteUpCost[id]) & player.nanites.ups[id]==0);
}

function buyNaniteUp(id) {
	if (canBuyNaniteUp(id)) {
		if (id == 0) {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpCost[id]);
			let effUpg = 0;
			if (effUpg <= 2) {
				player.eff.multMult = new Decimal(1.1 + 0.02 * effUpg);
			} else {
				player.eff.multMult = new Decimal(1.25).multiply(new Decimal(1.036).pow(effUpg - 2));
			}
		} else {
			player.nanites.nanites = player.nanites.nanites.minus(naniteUpCost[id]);
			player.nanites.ups[id] += 1;
		}
	}
}

function getNaniteUpMult(id) {
	switch(id) {
		case 0:
			return [9, 1];
		case 1:
			return [8, max(1, log(player.time, 16) - 1)];
		case 2:
			return [8, max(1, player.meteor.shower / 4 + 1)];
		case 3:
			return [8, max(1, 1)];
		default:
	}
}

function getTotalNaniteUpMult(tier) {
	let ret = new Decimal(1);
	for (let id = 1; id < 8; id++) {
		if (player.nanites.ups[id] == 1) {
			if (getNaniteUpMult(id)[0] == tier | getNaniteUpMult(id)[0] == 8) {
				ret.multiply(getNaniteUpMult(id)[1]);
			}
		}
	}
	return ret;
}

function updateNaniteUps() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	
	for (let id = 0; id < player.nanites.ups.length; id++) {
		if (id != 0) {
			document.getElementById("naniteupmult" + id).innerText = notation(getNaniteUpMult(id)[1]);
		}
		if (player.nanites.ups[id] >= 1  & id != 0) {
			document.getElementById("naniteup" + id).className = "naniteupgbtnbought";
		} else {
			document.getElementById("naniteup" + id).className = canBuyNaniteUp(id) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
		}
	}
}