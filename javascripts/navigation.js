function toggleNavigation() {
	document.getElementById("navigation").style.display = "inline-block";
	document.getElementById("navi_open").style.display = "none";
}

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	document.getElementById(player.navigation.naviTab + "btn").className = "navitabbtn";
	document.getElementById(tab + "btn").className = "navitabbtn active";
	player.navigation.naviTab = tab;
	showSubTab();
	document.getElementById("navigation").style.display = "none";
	document.getElementById("navi_open").style.display = "inline-block";
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
	document.getElementById(tab).style.display = "inline-block";
	document.getElementById("production_" + player.navigation.production + "btn").className = "subtabbtn";
	document.getElementById("production_" + tab + "btn").className = "subtabbtn active";
	player.navigation.production = tab;
}

function showMeltdownTab(tab) {
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";
	document.getElementById("meltdown_" + tab).style.display = "inline-block";
	document.getElementById("meltdown_" + player.navigation.meltdown + "btn").className = "subtabbtn";
	document.getElementById("meltdown_" + tab + "btn").className = "subtabbtn active";
	player.navigation.meltdown = tab;
}
