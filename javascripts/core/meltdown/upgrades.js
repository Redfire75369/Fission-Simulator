const meltdownUpCost = {
	11: new Decimal(1),
	12: new Decimal(1),
	13: new Decimal(1),
	14: new Decimal(1),
	21: new Decimal(1),
	22: new Decimal(1),
	23: new Decimal(1),
	24: new Decimal(1),
	31: new Decimal(1),
	32: new Decimal(1),
	33: new Decimal(1),
	34: new Decimal(1),
	41: new Decimal(1),
	42: new Decimal(1),
	43: new Decimal(1),
	44: new Decimal(1),
}
const meltdownUpList = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];

function resetMeltdownUps() {
	player.meltdown.ups = getDefaultData().meltdown.ups;
}

function canBuyMeltdownUp(id) {
	if (id < 41) {
		if (player.meltdown.ups[id] == 0) {
			return player.meltdown.corium.gte(meltdownUpCost[id]);
		}
	} else {
		if (player.meltdown.ups[id] < 4) {
			return player.meltdown.corium.gte(meltdownUpCost[id]);
		}
	}
	return false;
}

function buyMeltdownUp(id) {
	if (canBuyMeltdownUp(id)) {
		player.meltdown.corium = player.meltdown.corium.sub(meltdownUpCost[id]);
		player.meltdown.ups[id] += 1;
	}
}

function getMeltdownUpMult(id) {
	switch(id) {
		case 11:
			return [8, Decimal.max(1, 1 + player.meltdown.amount / 2)];
		case 12:
			return [8, Decimal.max(1, Math.pow((player.meltdown.time / 1000 + 1) / 2, 25 / (player.meltdown.time / 1000 +1)))];
		case 13:
			return [8, Decimal.max(1, Math.pow(player.meltdown.time / 1000, 0.2))];
		case 14:
			return [8, player.reactors[7].amount.max(1)];
		case 21:
			return [8, player.meltdown.totalNanites.pow(1.2).max(1)];
		case 22:
			return [8, Decimal.pow(player.meltdown.corium.add(2).log2(), 0.9).max(1)];
		default:
			return [9, new Decimal(1)];
	}
}

function getMeltdownUp41Mult(tier) {
	switch(player.meltdown.ups[41]) {
		case 4:
			if (tier == 0) {
				return Decimal.max(1, player.mines[7].amount.add(player.reactors[7].amount).log10() * 7);
			}
			if (tier == 7) {
				return Decimal.max(1, player.mines[0].amount.add(player.reactors[0].amount).log10() * 1);
			}
		case 3:
			if (tier == 1) {
				return Decimal.max(1, player.mines[6].amount.add(player.reactors[6].amount).log10() * 6);
			}
			if (tier == 6) {
				return Decimal.max(1, player.mines[1].amount.add(player.reactors[1].amount).log10() * 1);
			}
		case 2:
			if (tier == 2) {
				return Decimal.max(1, player.mines[5].amount.add(player.reactors[5].amount).log10() * 5);
			}
			if (tier == 5) {
				return Decimal.max(1, player.mines[2].amount.add(player.reactors[2].amount).log10() * 2);
			}
		case 1:
			if (tier == 3) {
				return Decimal.max(1, player.mines[4].amount.add(player.reactors[4].amount).log10() * 4);
			}
			if (tier == 4) {
				return Decimal.max(1, player.mines[3].amount.add(player.reactors[3].amount).log10() * 3);
			}
		default:
			return new Decimal(1);
	}
}

function getTotalMeltdownUpMult(tier) {
	let ret = new Decimal(1);
	for (let id = 0; id < meltdownUpList.length; id++) {
		if (player.meltdown.ups[meltdownUpList[id]] == 1 && (getMeltdownUpMult(meltdownUpList[id])[0] == tier || getMeltdownUpMult(meltdownUpList[id])[0] == 8)) {
			ret = ret.mul(getMeltdownUpMult(meltdownUpList[id])[1]);
		}
	}
	ret = ret.mul(getMeltdownUp41Mult(tier));
	return ret;
}

function updateUIMeltdownUps() {
	document.getElementById("meltdown_tabbtn").style.display = player.unlocked.meltdown ? "inline-block" : "none";
	
	for (let i = 0; i < meltdownUpList.length; i++) {
		if (meltdownUpList[i] < 41) {
			if (meltdownUpList[i] < 31) {
				document.getElementById("meltdown_upmult" + meltdownUpList[i]).innerText = notation(getMeltdownUpMult(meltdownUpList[i])[1]);
			}
			document.getElementById("meltdown_up" + meltdownUpList[i]).className = player.meltdown.ups[meltdownUpList[i]] == 1 ? "meltdownup bought" : canBuyMeltdownUp(meltdownUpList[i]) ? "meltdownup buy" : "meltdownup locked";
		} else {
			document.getElementById("meltdown_up" + meltdownUpList[i]).className = player.meltdown.ups[meltdownUpList[i]] == 4 ? "meltdownup bought" : canBuyMeltdownUp(meltdownUpList[i]) ? "meltdownup buy" : "meltdownup locked";
		}
	}
	
	document.getElementById("meltdown_up41_text").innerText = player.meltdown.ups[41] == 4 ? "New to This Tier: Cf-251 Reactors and Laser Drill Mines Boost Th-229 Reactors and Iron-Tipped Drill Mines" : player.meltdown.ups[41] == 3 ? "New to This Tier: Bk-248 Reactors and Diamond-Tipped Drill Mines Boost U-235 Reactors and Steel-Tipped Drill Mines" : player.meltdown.ups[41] == 2 ? "New to This Tier: Cu-245 Reactors and Osmium-Tipped Drill Mines Boost Np-237 Reactors and Titanium-Tipped Drill Mines" : player.meltdown.ups[41] == 1 ? "New to This Tier: Am-242m Reactors and Tungstensteel-Tipped Drill Mines Boost Pu-237 Reactors and Iridium-Tipped Drill Mines" : "No effects currently";
	document.getElementById("meltdown_up42_text").innerText = player.meltdown.ups[42] == 4 ? "You gain 3 Corium and 3 Meltdown Stat every minute.": player.meltdown.ups[42] == 3 ? "You gain Corium and Meltdown Stat 12 times slower than your fastest meltdown." : player.meltdown.ups[42] == 2 ? "You gain Corium and Meltdown Stat based on the number of Meltdown Upgrades bought." : player.meltdown.ups[42] == 1 ? "You gain 1 Corium and Meltdown Stat every 30 minutes" : "No effects currently";
	document.getElementById("meltdown_up43_text").innerText = "You start Nanite Researches and Meltdowns with " + player.meltdown.ups[43] + " Nucleosynthesis";
	document.getElementById("meltdown_up44_text").innerText = player.meltdown.ups[44] == 4 ? "You keep all nanites and nanite upgrades on Meltdown." : player.meltdown.ups[44] == 3 ? "You keep total nanites on Meltdown." : player.meltdown.ups[44] == 2 ? "You start with nanites based on your corium(\(log_{2}(3c-3)-1.5\))" : player.meltdown.ups[44] == 1 ? "You start with 1 nanite." : "No effects currently";
}