function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.naviTab = tab;
	showSubTab();
}
 function showSubTab() {
	switch (player.navigation.naviTab) {
		case "production":
			showProdTab(player.navigation.production);
			break;
		default:
	}
}
 
function showProdTab(tab) {
	document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.production = tab;
}