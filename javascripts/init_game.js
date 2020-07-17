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

	document.getElementById(player.navigation.naviTab + "btn").className = "navitabbtn";
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById("production_" + player.navigation.production + "btn").className = "subtabbtn";
	document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById("meltdown_" + player.navigation.meltdown + "btn").className = "subtabbtn";
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";

	document.getElementById("turbine_coil_desc_none").style.display = "none";
	document.getElementById("turbine_coil_desc_magnesium").style.display = "none";
	document.getElementById("turbine_coil_desc_beryllium").style.display = "none";
	document.getElementById("turbine_coil_desc_lithium").style.display = "none";
	document.getElementById("turbine_coil_desc_aluminium").style.display = "none";

	document.getElementById("rotor_" + player.turbine.activeRotor).parentElement.className = "turbinebox";
	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col turbinebox turbinecoil " + player.turbine.activeCoil;
	document.getElementById("turbine_coil_desc_" + player.turbine.activeCoil).style.display = "none";
}

function postLoad() {
	drawTurbineRotors(false);
	drawBearing(player.turbine.bearingDimensions);
	drawDynamoCoils(false);
	document.getElementById("rotor_" + player.turbine.activeRotor).parentElement.className = "turbinebox selected";
	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col turbinebox turbinecoil selected " + player.turbine.activeCoil;
	document.getElementById("turbine_coil_desc_" + player.turbine.activeCoil).style.display = "block";
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