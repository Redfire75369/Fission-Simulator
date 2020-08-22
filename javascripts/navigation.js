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
			showProductionTab(player.navigation.production);
			break;
		case "meltdown_tab":
			showMeltdownTab(player.navigation.meltdown);
			break;
		default:
	}
}

function showProductionTab(tab) {
	document.getElementById("production_" + player.navigation.production).style.display = "none";
	document.getElementById("production_" + tab).style.display = "";
	document.getElementById("production_" + player.navigation.production + "btn").classList.remove("navigation--active");
	document.getElementById("production_" + tab + "btn").classList.add("navigation--active");
	player.navigation.production = tab;
	showProductionSubTab();
}
function showProductionSubTab() {
	switch (player.navigation.production) {
		case "reactors_subtab":
			showReactorSubTab(player.navigation.reactor);
			break;
		default:
	}
}
function showReactorSubTab(subtab) {
	document.getElementById("production_reactor_" + player.navigation.reactor).style.display = "none";
	document.getElementById("production_reactor_" + subtab).style.display = "";
	document.getElementById("production_reactor_" + player.navigation.reactor + "btn").classList.remove("navigation--active");
	document.getElementById("production_reactor_" + subtab + "btn").classList.add("navigation--active");
	player.navigation.reactor = subtab;
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
