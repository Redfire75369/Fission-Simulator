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
	}
}

function toggleLeverMaxAll() {
	leverMaxAll = !leverMaxAll;
}

function harderReset() {
	showNaviTab("cheats_tab");
	player = getDefaultData();
	player.navigation.naviTab = "cheats_tab";
	saveGame();
}

document.getElementById("cheats_tabbtn").style.display = "none";
document.getElementById("cheats_tab").style.display = "none";
//Remove onclick in release version from index.html document.getElementById("stuff").onclick = "enableCheatsTab()";