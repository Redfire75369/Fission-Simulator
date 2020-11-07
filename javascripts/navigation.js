/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "";
	player.navigation.naviTab = tab;
	showSubTab();
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
