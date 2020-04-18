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
	if (player.meltdown.ups[id] == 0) {
		return (player.meltdown.corium.gte(meltdownUpCost[id]));
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
			return [8, player.reactor.amount[7].max(1)];
		case 21:
			return [8, player.meltdown.totalNanites.pow(1.2).max(1)];
		case 22:
			return [8, Decimal.pow(player.meltdown.corium.add(2).log2(), 0.9).max(1)];
		default:
			return [9, new Decimal(1)];
	}
}

function getTotalMeltdownUpMult(tier) {
	let ret = new Decimal(1);
	for (let id = 0; id < meltdownUpList.length; id++) {
		if (player.meltdown.ups[meltdownUpList[id]] == 1 && (getMeltdownUpMult(meltdownUpList[id])[0] == tier || getMeltdownUpMult(meltdownUpList[id])[0] == 8)) {
			ret = ret.mul(getMeltdownUpMult(meltdownUpList[id])[1]);
		}
	}
	return ret;
}

function updateUIMeltdownUps() {
	document.getElementById("meltdown_navibtn").style.display = player.unlocked.meltdown ? "inline-block" : "none";
	
	for (let i = 0; i < meltdownUpList.length; i++) {
		if (meltdownUpList[i] < 41) {
			if (meltdownUpList[i] < 31) {
				document.getElementById("meltdown_upmult" + meltdownUpList[i]).innerText = notation(getMeltdownUpMult(meltdownUpList[i])[1]);
			}
			document.getElementById("meltdown_up" + meltdownUpList[i]).className = player.meltdown.ups[meltdownUpList[i]] == 1 ? "meltdownupbought" : canBuyMeltdownUp(meltdownUpList[i]) ? "meltdownupbuy" : "meltdownuplocked";
		} else {
			document.getElementById("meltdown_up" + meltdownUpList[i]).className = player.meltdown.ups[meltdownUpList[i]] == 4 ? "meltdownupbought" : canBuyMeltdownUp(meltdownUpList[i]) ? "meltdownupbuy" : "meltdownuplocked";
		}
	}
}