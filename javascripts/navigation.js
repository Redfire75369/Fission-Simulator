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
		case "meltdown_tab":
			showMeltdownTab(player.navigation.meltdown);
			break;
		default:
	}
}

function showMeltdownTab(tab) {
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";
	document.getElementById("meltdown_" + tab).style.display = "";
	document.getElementById("meltdown_" + player.navigation.meltdown + "btn").classList.remove("navigation--active");
	document.getElementById("meltdown_" + tab + "btn").classList.add("navigation--active");
	player.navigation.meltdown = tab;
	showMeltdownSubTab();
}

function showMeltdownSubTab() {
	switch (player.navigation.meltdown) {
		case "decay_hastening_subtab":
			showDecaySubTab(player.navigation.decay);
			break;
		default:
	}
}
function showDecaySubTab(subtab) {
	document.getElementById("decay_" + player.navigation.decay).style.display = "none";
	document.getElementById("decay_" + subtab).style.display = "";
	document.getElementById("decay_" + player.navigation.decay + "btn").classList.remove("navigation--active");
	document.getElementById("decay_" + subtab + "btn").classList.add("navigation--active");
	player.navigation.decay = subtab;
}
