function init_game() {
	loadSave(getSaveString());
	document.getElementById("production").style.display = "none";
	document.getElementById("nanite").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById(player.navigation.naviTab).style.display = "inline-block";
	targetedNotationChange(player.options.notation);
}