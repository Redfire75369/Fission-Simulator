var gameData = {
	version: {alpha: 0, beta: 4},
	fuel: 10,
	mine: [0, 0, 0, 0],
	mineCost: [10, 100, 10000, 1000000],
	mineMult: [1.00, 1.00, 1.00, 1.00],
	mineCostMult: [100, 1000, 100000, 10000000],
	mineMultMult: 2.00,
	currentTab: "production", 
	currentProdTab: ""
}
const e = ["Th", "U", "Pu", "Am"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium"];

function hardReset() {
	gameData = {
	version: {alpha: 0, beta: 4},
	fuel: 10,
	mine: [0, 0, 0, 0],
	mineCost: [10, 100, 10000, 1000000],
	mineMult: [1.00, 1.00, 1.00, 1.00],
	mineCostMult: [100, 1000, 100000, 10000000],
	mineMultMult: 2.00,
	currentTab: "production", 
	currentProdTab: ""
	}
}

function showTab(tab) {
	document.getElementById(gameData.currentTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	gameData.currentTab = tab;
}
function showProdTab(tab) {
	if (gameData.currentTab == "production") {
		document.getElementById(gameData.currentProdTab).style.display = "none";
		document.getElementById(tab).style.display = "inline-block";
		gameData.currentProdTab = tab;
	}
}

function buyMine(a) {
	if (gameData.fuel >= gameData.mineCost[a]) {
		gameData.fuel -= gameData.mineCost[a];
		
		gameData.mine[a] += 1;
		gameData.mineCost[a] *= gameData.mineCostMult[a];
		gameData.mineMult[a] *= gameData.mineMultMult;
		
		document.getElementById(e[a] + "Mine").innerText = gameData.mine[a];
		document.getElementById(e[a] + "MineCost").innerHTML = gameData.mineCost[a];
	}
}
		
function update() {
	var fuelPerSecond = gameData.mine[0] * gameData.mineMult[0];
	var ThMinePerSecond = gameData.mine[1] * gameData.mineMult[1];
	var UMinePerSecond = gameData.mine[2] * gameData.mineMult[2];
	var PuMinePerSecond = gameData.mine[3] * gameData.mineMult[3];
	
	gameData.fuel += fuelPerSecond / 20;
	gameData.mine[0] += ThMinePerSecond / 20;
	gameData.mine[1] += UMinePerSecond / 20;
	gameData.mine[2] += PuMinePerSecond / 20;

	document.getElementById("fuel").innerText = "You have " + Math.round(gameData.fuel * 10) / 10 + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + Math. round(fuelPerSecond * 10) / 10 + " Nuclear Fuel per second.";
	var a;
	for (a = 0; a < e.length; a++) {
		document.getElementById(e[a] + "Mine").innerText = Math.round(gameData.mine[a] * 10) / 10;
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + Math.round(gameData.mineCost[a] * 10) / 10;
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + Math.round(gameData.mineMult[a] * 10) / 10;
	}
}

/*Load Save*/
var save = JSON.parse(localStorage.getItem("fissionSimSave"));
if (save !== null) {
	gameData = save;
}

/*Start Game*/
showTab(gameData.currentTab);
switch(gameData.currentTab) {
	case "production":
			showProdTab(gameData.currentProdTab);
		break;
	default:
}

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(gameData));
}, 5000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);