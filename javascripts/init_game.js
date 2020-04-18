function init_game() {
	updateUI();
	loadSave();
	document.getElementById("production_tab").style.display = "none";
	document.getElementById("fuel_subtab").style.display = "none";
	document.getElementById("mines_subtab").style.display = "none";
	document.getElementById("reactors_subtab").style.display = "none";
	document.getElementById("statistics_tab").style.display = "none";
	document.getElementById("achievements_tab").style.display = "none";
	document.getElementById("options_tab").style.display = "none";
	document.getElementById("nanites_tab").style.display = "none";
	document.getElementById("meltdown_tab").style.display = "none";
	showNaviTab(player.navigation.naviTab);
	targetedNotationChange(player.options.notation);
	targetedThemeChange(player.options.theme);
	if (Date.now() > player.lastUpdate + 1000) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	nextNews();
}