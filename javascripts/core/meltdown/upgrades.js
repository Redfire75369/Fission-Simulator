const meltdownUpCost = {
	11: new Decimal(1),
	12: new Decimal(1)
}
const meltdownUpList = [11, 12];

function resetMeltdownUps() {
	player.meltdown.ups = getDefaultData().meltdown.ups;
}

function canBuyMeltdownUp(id) {
	if (player.meltdown.ups[id] == 0) {
		return (player.corium.gte(meltdownUpCost[id]));
	}
	return false;
}

function buyMeltdownUp(id) {
	if (canBuyMeltdownUp(id)) {
		player.corium = player.corium.sub(meltdownUpCost[id]);
		player.meltdown.ups[id] += 1;
	}
}

function getMeltdownUpMult(id) {
	switch(id) {
		default:
			return [9, new Decimal(1)];
	}
}

function getTotalMeltdownUpMult(tier) {
	let ret = new Decimal(1);
	for (let id = 0; id < meltdownUpList.length; id++) {
		if (player.meltdown.ups[meltdownUpList[id]] == 1 && (getMeltdownUpMult(meltdownUpList[id])[0] == tier || getMeltdosnUpMult(meltdownUpList[id])[0] == 8)) {
			ret = ret.mul(getMeltdownUpMult(meltdownUpList[id])[1]);
		}
	}
	return ret;
}

function updateUIMeltdownUps() {
	for (let i = 0; i < meltdownUpList.length; i++) {
		console.log(0);
	}
}