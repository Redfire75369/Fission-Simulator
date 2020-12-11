/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var leverMaxAll = false;
var cheatsEnabled = false;

const intermediaryVariables = {
	burnRateBoughtMul: 2,
	lifetimeBoughtDiv: 2.8,
	lifetimeTierMul: 2.2,
	energyBoughtMul: 3.5,
	energyTierMul: 200
};

function enableCheatsTab() {
	cheatsEnabled = true;

	/*clearInterval(saveGameLoop);
	setInterval(function() {
		localStorage.removeItem("fissionSimSave1");
	}, 200);
	saveGame = function() {
		console.log("Cheater, no saving for you");
	};
	getSaveString = function() {
		console.log("Cheater, no exports for you");
	};*/
}

function defaultEnergy() {
	if (cheatsUnlocked) {
		player.energy = new Decimal(10);
	}
}
function doubleEnergy() {
	player.energy = player.energy.mul(2);
}
function squareEnergy() {
	player.energy = player.energy.pow(2);
}
function infiniteEnergy() {
	player.energy = infinity;
}

function defaultCorium() {
	player.meltdown.corium = new Decimal(100);
}
function doubleCorium() {
	player.meltdown.corium = player.meltdown.corium.mul(2);
}
function squareCorium() {
	player.meltdown.corium = player.meltdown.corium.pow(2);
}
function infiniteCorium() {
	player.meltdown.corium = infinity;
}

function addNucleosynthesis() {
	if (player.nucleosynthesis < 14) {
		player.nucleosynthesis += 1;
		player.unlocked.coils = true;
	}
}

function addNanite() {
	if (player.nanites.nanites.lt(17)) {
		player.nanites.nanites = player.nanites.nanites.add(1);
		player.nanites.total = player.nanites.total.add(1);
		player.unlocked.naniteUps = true;
	}
}

function toggleLeverMaxAll() {
	leverMaxAll = !leverMaxAll;
}

function hardcoreReset() {
	preLoad();
	player = getDefaultData();
	player.navigation.naviTab = "cheats_tab";
	postLoad();
	testBalancing();
	saveGame();
}

function testBalancing() {
	/*for (let i = 0; i < 8; i++) {
		mineUpgradeCosts[i] = Decimal.pow(10, document.getElementById("mine" + i).value);
		mineSoftCaps[i] = Decimal.pow(10, document.getElementById("mines" + i).value);
	}*/
	for (let i = 0; i < 3; i++) {
		player.reactors.pebblebeds[i].startCost = Decimal.pow(10, document.getElementById("reactor" + i).value);
		player.reactors.pebblebeds[i].scaleCost = Decimal.pow(10, document.getElementById("reactors" + i).value);
	}

	intermediaryVariables.burnRateBoughtMul = parseFloat(document.getElementById("burnrate1").value);
	intermediaryVariables.lifetimeBoughtDiv = parseFloat(document.getElementById("lifetime1").value);
	intermediaryVariables.lifetimeTierMul = parseFloat(document.getElementById("lifetime2").value);
	intermediaryVariables.energyBoughtMul = parseFloat(document.getElementById("energy_per1").value);
	intermediaryVariables.energyTierMul = parseFloat(document.getElementById("energy_per2").value);
}

document.getElementById("cheats_tab").style.display = "none";
document.getElementById("balance_tabbtn").style.display = "none";
document.getElementById("balance_tab").style.display = "none";
// document.getElementById("cheats_tab").innerHTML = "";
// document.getElementById("balance_tab").innerHTML = "";
