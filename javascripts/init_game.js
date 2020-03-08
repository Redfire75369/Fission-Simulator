/*Offline Progress*/
function simulateTime(seconds, actual) {
	let ticks = seconds * 20;
	let tickInterval = 50;
	if (ticks > 1000 & !actual) {
		tickInterval += (ticks - 1000) / 20;
		ticks = 1000;
	}
	let start = Object.assign({}, player);
	for (let complete = 0; complete < ticks; complete++) {
		updateGame(tickInterval)
	}
	player.time += seconds * 1000;
	player.meltdown.time += seconds * 1000;
	let offlinePopup = "While you were away, "
	if (player.energy.gt(start.energy)) {
		offlinePopup += "your energy increased by " + notation(player.energy.log10() - start.energy.log10()) + " Orders of Magnitude.";
	}
	if (offlinePopup == "While you were away, ") {
		offlinePopup += "nothing happened.";
	}
	if (seconds > 1000) {
		document.getElementById("offlinePopup").style.display = "block";
	    document.getElementById("offlineProgress").innerHTML = offlinePopup;
	}
}

function closeOfflineProgress() {
	document.getElementById("offlinePopup").style.display = "none";
}

function init_game() {
	var player = getDefaultData();
	loadSave();
	document.getElementById("production").style.display = "none";
	document.getElementById("mines").style.display = "none";
	document.getElementById("reactors").style.display = "none";
	document.getElementById("statistics").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("nanite").style.display = "none";
	player.navigation = getDefaultData().navigation;
	showNaviTab("production");
	showProdTab("mines");
	targetedNotationChange(player.options.notation);
	if (Date.now() > player.lastUpdate + 1000) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
}


/*Initialise Game*/
init_game();