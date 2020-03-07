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
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
		resetNaniteResearch();
		resetNaniteUps();
		player.meltdown.time = 0;
	}
}

function updateUIMeltdown() {
	document.getElementById("corium").innerText = notation(player.meltdown.corium);
	if (player.meltdown.total.gt(0)) {
		document.getElementById("coriumAmt").style.display = "inline-block";
	} else {
		document.getElementById("coriumAmt").style.display = "none";
	}
	if (canMeltdown()) {
		document.getElementById("meltdown").style.display = "inline-block";
		document.getElementById("coriumOnMeltdown").innerText = notation(getCoriumOnPrestige());
	} else {
		document.getElementById("meltdown").style.display = "none";
	}
}