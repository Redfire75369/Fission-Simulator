function preLoad() {
	updateUIEnergy();
	updateUIMaxAll();
	updateUIFuel();
	updateUIMines();
	updateUIReactors();
	updateUIEff();
	updateUINucleosynthesis();
	updateUINaniteUps();
	updateUINaniteResearch();
	updateUIMeltdown();
	updateUIMeltdownUps();
	updateUIAchievements();
	updateUIStats();

	document.getElementById("production_tab").style.display = "none";
	document.getElementById("fuel_subtab").style.display = "none";
	document.getElementById("mines_subtab").style.display = "none";
	document.getElementById("reactors_subtab").style.display = "none";
	document.getElementById("turbine_subtab").style.display = "none";
	document.getElementById("statistics_tab").style.display = "none";
	document.getElementById("achievements_tab").style.display = "none";
	document.getElementById("options_tab").style.display = "none";
	document.getElementById("nanites_tab").style.display = "none";
	document.getElementById("meltdown_tab").style.display = "none";
	document.getElementById("meltdown_ups_subtab").style.display = "none";
	document.getElementById("meltdown_decay_hastening_subtab").style.display = "none";
	document.getElementById("navigation").style.display = "none";
	document.getElementById("offline_popup").style.display = "none";

	document.getElementById(player.navigation.naviTab + "btn").className = "navitabbtn";
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById("production_" + player.navigation.production + "btn").className = "subtabbtn";
	document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById("meltdown_" + player.navigation.meltdown + "btn").className = "subtabbtn";
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";

	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col turbinebox turbinecoil " + player.turbine.activeCoil;
	
	drawTurbineRotors(true);
	drawDynamoCoils(true);
}

function postLoad() {
	drawTurbineRotors(false);
	drawBearing(player.turbine.bearingDimensions);
	drawDynamoCoils(false);
	document.getElementById("turbine_rotor_" + player.turbine.activeRotor).parentElement.className = "tooltip turbinebox selected";
	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col tooltip turbinebox turbinecoil selected " + player.turbine.activeCoil;
	activeDynamoCoils();

	showNaviTab(player.navigation.naviTab);
	targetedNotationChange(player.options.notation);
	targetedThemeChange(player.options.theme);
}

function init_game() {
	preLoad();
	loadSave();
	postLoad();

	if (Date.now() > player.lastUpdate + 1000) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	nextNews();
}

init_game();