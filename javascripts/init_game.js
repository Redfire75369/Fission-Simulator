function init_game() {
	player = getDefaultData();
	loadSave();
	document.getElementById("production").style.display = "none";
	document.getElementById("nanites").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById(player.navigation.naviTab).style.display = "inline-block";
	targetedNotationChange(player.options.notation);
}