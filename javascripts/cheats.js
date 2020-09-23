var leverMaxAll = false;
var cheatsEnabled;

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
	player.energy = new Decimal(100);
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

function harderReset() {
	preLoad();
	player = getDefaultData();
	player.navigation.naviTab = "cheats_tab";
	postLoad();
	testBalancing();
	saveGame();
}

function testBalancing() {
	for (let i = 0; i < 8; i++) {
		mineUpgradeCosts[i] = Decimal.pow(10, document.getElementById("mine" + i).value);
		mineSoftCaps[i] = Decimal.pow(10, document.getElementById("mines" + i).value);
	}
	for (let i = 0; i < 3; i++) {
		player.reactors.pebblebeds[i].startCost = Decimal.pow(10, document.getElementById("reactor" + i).value);
		player.reactors.pebblebeds[i].scaleCost = Decimal.pow(10, document.getElementById("reactors" + i).value);
	}
}

document.getElementById("cheats_tab").style.display = "none";
document.getElementById("balance_tabbtn").style.display = "none";
document.getElementById("balance_tab").style.display = "none";
// document.getElementById("cheats_tab").innerHTML = "";
// document.getElementById("balance_tab").innerHTML = "";
