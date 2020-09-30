function preLoad() {
	updateUIEnergy();
	//updateUINucleosynthesis();
	//updateUINaniteUps();
	//updateUINaniteResearch();
	//updateUIMeltdown();
	//updateUIMeltdownUps();

	document.getElementById("production_tab").style.display = "none";
	document.getElementById("statistics_tab").style.display = "none";
	document.getElementById("achievements_tab").style.display = "none";
	document.getElementById("options_tab").style.display = "none";
	document.getElementById("nanites_tab").style.display = "none";
	document.getElementById("meltdown_tab").style.display = "none";
	document.getElementById("meltdown_ups_subtab").style.display = "none";
	document.getElementById("meltdown_decay_hastening_subtab").style.display = "none";
	document.getElementById("how_to_play_tab").style.display = "none";
	document.getElementById("offline_popup").style.display = "none";

	/*document.getElementById("meltdown_" + player.navigation.meltdown + "btn").className = "subtabbtn";
	document.getElementById("meltdown_" + player.navigation.meltdown).style.display = "none";*/

	/*drawTurbineRotors(true);
	drawDynamoCoils(true);
	drawBearing(player.turbine.bearingDimensions);*/
}

function postLoad() {
	/*drawTurbineRotors();
	drawDynamoCoils();
	drawBearing(1);
	activeDynamoCoils();

	selectRotor(player.turbine.activeRotor);
	selectCoil(player.turbine.activeCoil);*/

	showNaviTab(player.navigation.naviTab);
	document.getElementById("style").setAttribute("href", "stylesheets/" + themes[player.options.theme].toLowerCase() + ".css");
}

function init_game() {
	preLoad();
	loadSave();
	postLoad();

	if (Date.now() > player.lastUpdate + 1000) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	//nextNews();

	/*Game Loops*/
	var errored = false;

	var saveGameLoop = setInterval(function() {
		saveGame();
	}, 15000);

	setInterval(function() {
		try {
			if (player.lastUpdate === undefined) {
				player.lastUpdate = Date.now();
			}
			if (Date.now() > player.lastUpdate && focused) {
				simulateTime((Date.now() - player.lastUpdate) / 1000);
			}
		} catch(e) {
			if (!errored) {
				alert("The game has encountered a fatal error. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
				alert("--DEBUG Information--\n" + e.stack);
				console.error(e);
				errored = true;
			}
		}
	}, 25);

	setInterval(function() {
		updateUI();
	}, 50);
}

init_game();
player.options.theme = 0;
