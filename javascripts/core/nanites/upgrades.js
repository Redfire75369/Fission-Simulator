let naniteUpCost = {
	0: new Decimal(1),
	11: new Decimal(2),
	21: new Decimal(1),
	22: new Decimal(2),
	31: new Decimal(1),
	32: new Decimal(2),
	41: new Decimal(3),
	42: new Decimal(4)
};
let naniteUpList = [0, 11, 21, 22, 31, 32, 41, 42];

function resetNaniteUps() {
	player.nanites.ups = getDefaultData().nanites.ups;
	player.nanites.effUpCost = getDefaultData().nanites.effUpCost;
	player.eff.multMult = getDefaultData().eff.multMult;
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
}

function buyNaniteUp(id) {
	if (canBuyNaniteUp(id)) {
		if (id == 0) {
			player.nanites.nanites = player.nanites.nanites.sub(player.nanites.effUpCost);
			player.nanites.ups[0] += 1;
			if (player.nanites.ups[0] >= 2) {
				player.nanites.effUpCost = player.nanites.effUpCost.add(1);
			}
			let effUpg = player.nanites.ups[0];
			if (effUpg <= 2) {
				player.eff.multMult = new Decimal(1.1 + 0.02 * effUpg);
			} else {
				player.eff.multMult = new Decimal(1.25).mul(new Decimal(1.036).pow(effUpg - 2));
			}
		} else if (id == 41) {
			player.nanites.nanites = player.nanites.nanites.sub(naniteUpCost[41]);
			player.meteor.meteorMult = new Decimal(2.2);
			player.nanites.ups[id] += 1;
		} else {
			player.nanites.nanites = player.nanites.nanites.sub(naniteUpCost[id]);
			player.nanites.ups[id] += 1;
		}
	}
}

function getNaniteUpMult(id) {
	if (player.nanites.ups[id] == 0) {
		return [9, new Decimal(1)];
	}
	switch(id) {
		case 11:
			return [9, new Decimal(max(1, player.meteor.shower / 5))]
		case 21:
			return [8, new Decimal(max(1, log(player.time / 1000, 16) - 1))];
		case 22:
			return (player.meteor.shower <= 10) ? [8, Decimal.max(1, (player.meteor.shower ** log(player.meteor.shower, 10)) / 3)] : [8, Decimal.max(1, (player.meteor.shower - 7) * (log(player.meteor.shower, 8) ** 0.5))];
		case 31:
			return [8, Decimal.max(1, new Decimal(player.energy.log(25)).div(75).pow(2))];
		case 32:
			return [8, Decimal.max(1, new Decimal(player.totalEnergy.log(25)).div(75).pow(2))];
		case 42:
			return [8, Decimal.max(1, player.nanites.total.log(1.2))];
		default:
			return [9, new Decimal(1)];
	}
}

function getTotalNaniteUpMult(tier) {
	let ret = new Decimal(1);
	for (let id = 0; id < naniteUpList.length; id++) {
		if (player.nanites.ups[naniteUpList[id]] >= 1 & (getNaniteUpMult(naniteUpList[id])[0] == tier || getNaniteUpMult(naniteUpList[id])[0] == 8)) {
			ret = ret.mul(getNaniteUpMult(naniteUpList[id])[1]);
		}
	}
	return ret;
}

function updateUINaniteUps() {
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	document.getElementById("naniteupformula11").innerHTML = (player.nanites.ups[11] == 0) ? "√(2) * x<sup>2/3</sup> * log<sub>5</sub>(x / 10 + 1)" : "√(2) * x<sup>2/3</sup> * log<sub>5</sub>(x / 10 + 1) * (m / 5)";
	document.getElementById("naniteupformula22").innerHTML = (player.meteor.shower <= 13) ? "(log<sub>10</sub>(x))<sup>x</sup>" : "(x - 9) * log<sub>8</sub>(x)<sup>0.5</sup>";
	for (let i = 0; i < naniteUpList.length; i++) {
		if (naniteUpList[i] != 0 && naniteUpList[i] != 41) {
			document.getElementById("naniteupmult" + naniteUpList[i]).innerText = notation(getNaniteUpMult(naniteUpList[i])[1]);
		}
		document.getElementById("naniteup" + naniteUpList[i]).className = (player.nanites.ups[naniteUpList[i]] == 1 && naniteUpList[i] != 0) ? "naniteupgbtnbought" : canBuyNaniteUp(naniteUpList[i]) ? "naniteupgbtnbuy" : "naniteupgbtnlocked";
	}
}