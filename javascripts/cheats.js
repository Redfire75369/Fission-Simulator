var leverMaxAll = false;

function enableCheatsTab() {
	document.getElementById("cheatsbtn").style.display = "inline-block";
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

function addNucleosynthesis() {
	if (player.nucleosynthesis < 13) {
		player.nucleosynthesis += 1;
	}
}

function toggleLeverMaxAll() {
	leverMaxAll = !leverMaxAll;
}

function harderReset() {
	showNaviTab("cheats");
	player = getDefaultData();
	player.navigation.naviTab = "cheats";
	saveGame();
}

function spin3d() {
	document.getElementById("body").style.animation = document.getElementById("body").style.animation === "" ? "spin3d 2s infinite" : "";
}

document.getElementById("cheatsbtn").style.display = "none";
document.getElementById("cheats").style.display = "none";
//Remove onclick in release version from index.html document.getElementById("stuff").onclick = "enableCheatsTab()";