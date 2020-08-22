function resetMeltdown() {
	player.meltdown = getDefaultData().meltdown;
}

function canMeltdown() {
	return player.energy.gte(player.meltdown.energyGoal);
}

function coriumGain() {
	let min = player.energy.gt(getLimit()) ? getLimit() : player.energy;
	let ret = Decimal.pow(4, (min.log2() - 1024)/1024);
	return Decimal.floor(ret);
}
function coriumGainPassive() {
	let ret = player.meltdown.ups[13].bought == 4 ? new Decimal(3) : player.meltdown.ups[13].bought == 3 ? new Decimal((player.meltdown.bestTime / 1000) * 720) : player.meltdown.ups[13].bought == 1 ? new Decimal(1/30) : zero;
	if (player.meltdown.ups[13].bought == 2) {
		let y = 0;
		for (let i = 0, keys = Object.keys(player.meltdown.ups), ii = keys.length; i < ii; i++) {
			if (player.meltdown.ups[keys[i]] > 0) {
				y++;
			}
		}
		ret = new Decimal(1 / (17 - y));
	}
	return ret.div(60);
}

function meltdownGain() {
	return 1;
}

function meltdownGainPassive() {
	let ret = player.meltdown.ups[13].bought == 4 ? 3 : player.meltdown.ups[13].bought == 3 ? (player.meltdown.bestTime / 1000) * 12 : player.meltdown.ups[13].bought == 1 ? 1/30  : 0;
	if (player.meltdown.ups[13].bought == 2) {
		let y = 0;
		for (let i = 0, keys = Object.keys(player.meltdown.ups), ii = keys.length; i < ii; i++) {
			if (player.meltdown.ups[keys[i]] > 0) {
				y++;
			}
		}
		ret = 1 / (17 - y);
	}
	return ret / 60;
}

function meltdown() {
	if (canMeltdown()) {
		player.meltdown.corium = player.meltdown.corium.add(coriumGain());
		player.meltdown.total = player.meltdown.total.add(coriumGain());
		player.unlocked.meltdown = true;
		if (player.meltdown.time < player.meltdown.bestTime) {
			player.meltdown.bestTime = player.meltdown.time;
		}
		player.meltdown.time = 0;
		player.meltdown.amount += meltdownGain();
		resetEnergy();
		resetMines();
		resetReactors();
		resetNucleosynthesis();
		resetNaniteResearch();
		resetNaniteUps();
	}
}

function simulateMeltdown(tickinterval = 50) {
	player.meltdown.corium = player.meltdown.corium.add(coriumGainPassive());
	player.meltdown.amount += meltdownGainPassive() * tickInterval / 1000;
}
function updateUIMeltdown() {
	document.getElementById("corium").innerText = notation(player.meltdown.corium);
	document.getElementById("corium_amt").style.display = (player.unlocked.meltdown) ? "inline-block" : "none";
	document.getElementById("meltdown").style.display = (canMeltdown()) ? "inline-block" : "none";
	document.getElementById("corium_gain").innerText = notation(coriumGain());
}
