// CodedSakura was here Jun 2020

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "";
	document.getElementById(`${player.navigation.naviTab}btn`).classList.remove("navigation--active");
	document.getElementById(`${tab}btn`).classList.add("navigation--active");
	player.navigation.naviTab = tab;
	showSubTab();
}

function showSubTab() {
	switch (player.navigation.naviTab) {
		case "production_tab":
			showProdTab(player.navigation.production);
			break;
		default:
	}
}
 
function showProdTab(tab) {
	document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById(tab).style.display = "";
	document.getElementById(`production_${player.navigation.production}btn`).classList.remove("navigation--active");
	document.getElementById(`production_${tab}btn`).classList.add("navigation--active");
	player.navigation.production = tab;
}