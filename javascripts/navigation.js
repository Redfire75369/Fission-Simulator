function toggleNavigation() {
	document.getElementById("navigation").style.display = "block";
	document.getElementById("navi_open").style.display = "none";
}

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "";
	document.getElementById(`${player.navigation.naviTab}btn`).classList.remove("navigation--active");
	document.getElementById(`${tab}btn`).classList.add("navigation--active");
	player.navigation.naviTab = tab;
	showSubTab();
	document.getElementById("navigation").style.display = "none";
	document.getElementById("navi_open").style.display = "block";
}

function showSubTab() {
	switch (player.navigation.naviTab) {
		case "production_tab":
			showProdTab(player.navigation.production);
			break;
		case "meltdown_tab":
			showMeltdownTab(player.navigation.meltdown);
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

function showMeltdownTab(tab) {
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";
	document.getElementById("meltdown_" + tab).style.display = "inline-block";
	document.getElementById("meltdown_" + player.navigation.meltdown + "btn").className = "subtabbtn";
	document.getElementById("meltdown_" + tab + "btn").className = "subtabbtn active";
	player.navigation.meltdown = tab;
}
