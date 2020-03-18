function resetMeltdown() {
	player.meltdown = getDefaultData().meltdown;
}

function canMeltdown() {
	return player.energy.gte(player.meltdown.energyGoal);
}

function getCoriumOnPrestige() {
	let ret = Decimal.pow(4, (player.energy.log2() - 1024)/1024);
	return Decimal.floor(ret);
}

function meltdown() {
	if (canMeltdown()) {
		player.meltdown.corium = player.meltdown.corium.add(getCoriumOnPrestige());
		player.meltdown.total = player.meltdown.total.add(getCoriumOnPrestige());
		player.unlocked.meltdown = true;
		if (player.meltdown.time < player.meltdown.bestTime) {
			player.meltdown.bestTime = player.meltdown.time;
		}
		player.meltdown.time = 0;
		resetEnergy();
		resetEff();
		resetMines();
		resetReactors();
		resetMeteor();
		resetNaniteResearch();
		resetNaniteUps();
	}
}

function updateUIMeltdown() {
	document.getElementById("corium").innerText = notation(player.meltdown.corium);
	document.getElementById("coriumAmt").style.display = (player.unlocked.meltdown) ? "inline-block" : "none";
	document.getElementById("meltdown").style.display = (canMeltdown()) ? "inline-block" : "none";
	document.getElementById("coriumOnMeltdown").innerText = notation(getCoriumOnPrestige());
}