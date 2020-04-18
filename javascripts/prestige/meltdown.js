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
	return zero;
}

function meltdownGain() {
	return 1;
}

function meltdownGainPassive() {
	return 0;
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
		resetEff();
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