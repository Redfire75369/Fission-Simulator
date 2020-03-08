function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.naviTab = tab;
}

function showProdTab(tab) {
	document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.production = tab;
}