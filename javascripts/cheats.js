var leverMaxAll = false;

function enableCheatsTab() {
	document.getElementById("cheats_tabbtn").style.display = "inline-block";
	//localStorage.setItem("fissionSimSave1", null)
	//clearInterval(saveGameLoop);
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
		player.unlocked.coils=true;
	}
}

function toggleLeverMaxAll() {
	leverMaxAll = !leverMaxAll;
}

function harderReset() {
	preLoad();
	player = getDefaultData();
	postLoad();
	testBalancing();
	saveGame();
}

function testBalancing() {
	for (let i = 0; i < 8; i++) {
		player.mines[i].startCost = Decimal.pow(10, document.getElementById("mine" + i).value);
		player.mines[i].scaleCost = Decimal.pow(10, document.getElementById("mines" + i).value);
		player.reactors[i].startCost = Decimal.pow(10, document.getElementById("reactor" + i).value);
		player.reactors[i].scaleCost = Decimal.pow(10, document.getElementById("reactors" + i).value);
	}
}

document.getElementById("cheats_tabbtn").style.display = "none";
document.getElementById("cheats_tab").style.display = "none";
document.getElementById("balance_tabbtn").style.display = "none";
document.getElementById("balance_tab").style.display = "none";
//Remove onclick in release version from index.html document.getElementById("stuff").onclick = "enableCheatsTab()";
