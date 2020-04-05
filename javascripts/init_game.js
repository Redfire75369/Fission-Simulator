function init_game() {
	loadSave();
	document.getElementById("production").style.display = "none";
	document.getElementById("fuel").style.display = "none";
	document.getElementById("mines").style.display = "none";
	document.getElementById("reactors").style.display = "none";
	document.getElementById("statistics").style.display = "none";
	document.getElementById("achievements").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById("nanite").style.display = "none";
	showNaviTab(player.navigation.naviTab);
	targetedNotationChange(player.options.notation);
	targetedThemeChange(player.options.theme);
	if (Date.now() > player.lastUpdate + 1000) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	scrollNextNENR();
}


/*Initialise Game*/
init_game();