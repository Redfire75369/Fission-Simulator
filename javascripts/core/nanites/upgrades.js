const naniteUpCost = {
	11: new Decimal(1),
	12: new Decimal(2),
	21: new Decimal(1),
	22: new Decimal(2),
	31: new Decimal(3),
	32: new Decimal(4)
};
const naniteUpList = [11, 12, 21, 22, 31, 32];

function resetNaniteUps() {
	if (player.meltdown.ups[44] < 4) {
		player.nanites.ups = getDefaultData().nanites.ups;
		player.nanites.effUpCost = getDefaultData().nanites.effUpCost;
	}
}

function canBuyNaniteUp(id) {
	if (id == 0) {
		let boughtAll = true;
		for (let up = 1; up < naniteUpList.length; up++) {
			if (player.nanites.ups[naniteUpList[up]] != 1) {
				boughtAll=false;
			}
		}
		if (boughtAll || player.nanites.ups[0] < 2) {
			return player.nanites.nanites.gte(player.nanites.effUpCost);
		} else {
			return false;
		}
	} 
	if (player.nanites.ups[id] == 0) {
		return (player.nanites.nanites.gte(naniteUpCost[id]));
	}
	return false;
}

function buyNaniteUp(id) {
	if (canBuyNaniteUp(id)) {
		if (id == 0) {
			player.nanites.nanites = player.nanites.nanites.sub(player.nanites.effUpCost);
			player.nanites.ups[id] += 1;
			if (player.nanites.ups[0] >= 2) {
				player.nanites.effUpCost = player.nanites.effUpCost.add(1);
			}
			return;
		}
		player.nanites.nanites = player.nanites.nanites.sub(naniteUpCost[id]);
		player.nanites.ups[id] += 1;
	}
}

function getNaniteUpMult(id) {
	switch(id) {
		case 11:
			return [8, new Decimal(max(1, log(player.time / 1000, 16) - 1))];
		case 12:
			return (player.nucleosynthesis <= 10) ? [8, Decimal.max(1, (player.nucleosynthesis ** log(player.nucleosynthesis + 1, 10)) / 3)] : [8, Decimal.max(1, (player.nucleosynthesis - 7) * (log(player.nucleosynthesis, 8) ** 0.5))];
		case 21:
			return [8, Decimal.max(1, new Decimal(player.energy.log(20)).div(20).pow(2))];
		case 22:
			return [8, Decimal.max(1, new Decimal(player.totalEnergy.log(25)).div(40).pow(2))];
		case 32:
			return [8, Decimal.max(1, player.nanites.total.log(1.2))];
		default:
			return [9, new Decimal(1)];
	}
}

function getTotalNaniteUpMult(tier) {
	let mult = new Decimal(1);
	for (let id = 0; id < naniteUpList.length; id++) {
		if (player.nanites.ups[naniteUpList[id]] == 1 && (getNaniteUpMult(naniteUpList[id])[0] == tier || getNaniteUpMult(naniteUpList[id])[0] == 8)) {
			mult = mult.mul(getNaniteUpMult(naniteUpList[id])[1]);
		}
	}
	return mult;
}

function updateUINaniteUps() {
	document.getElementById("nanites_tabbtn").style.display = player.unlocked.naniteUps || player.unlocked.meltdown ? "inline-block" : "none";
	
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	
	document.getElementById("nanite_upcost0").innerText = player.nanites.effUpCost.neq(1) ? (player.nanites.effUpCost + " Nanites") : "1 Nanite";
	document.getElementById("nanite_up0").className = canBuyNaniteUp(0) ? "naniteup buy" : "naniteup locked";
	
	document.getElementById("nanite_upformula12v1").style.display =  player.nucleosynthesis <= 13 ? "inline-block" : "none";
	document.getElementById("nanite_upformula12v2").style.display =  player.nucleosynthesis > 13 ? "inline-block" : "none";

	for (let i = 0; i < naniteUpList.length; i++) {
		if (naniteUpList[i] != 0 && naniteUpList[i] != 31) {
			document.getElementById("nanite_upmult" + naniteUpList[i]).innerText = notation(getNaniteUpMult(naniteUpList[i])[1]);
		}
		document.getElementById("nanite_up" + naniteUpList[i]).className = player.nanites.ups[naniteUpList[i]] == 1 ? "naniteup bought" : canBuyNaniteUp(naniteUpList[i]) ? "naniteup buy" : "naniteup locked";
	}
}