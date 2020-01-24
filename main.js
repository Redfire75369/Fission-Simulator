var gameData = {
	version: {alpha: 0, beta: 2},
	fuel: 10,
	mine: [0, 0, 0, 0],
	mineCost: [10, 100, 10000, 1000000],
	mineMult: [1.00, 1.00, 1.00, 1.00],
	mineCostMult: [100, 1000, 100000, 10000000],
	mineMultMult: 2.00
}
const elements = ["Th", "U", "Pu", "Am"];

var save = JSON.parse(localStorage.getItem("fissionSimSave"));
if (save !== null) {
	gameData = save;
}

function hardReset() {
	gameData = {
	version: {alpha: 0, beta: 2},
	fuel: 10,
	mine: [0, 0, 0, 0],
	mineCost: [10, 100, 10000, 1000000],
	mineMult: [1.00, 1.00, 1.00, 1.00],
	mineCostMult: [100, 1000, 100000, 10000000],
	mineMultMult: 2.00
	}
}

function showTab(tab) {
	document.getElementById("production").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
}

function buyMine(int a) {
	if (gameData.fuel >= gameData.mineCost[a]) {
		gameData.fuel -= gameData.mineCost[a];
		
		gameData.mine[a] += 1;
		gameData.mineCost[a] *= gameData.mineCostMult[a];
		gameData.mineMult[a] *= gameData.mineMultMult;
		
		document.getElementById(elements[a] + "Mine").innerText = gameData.mine[a];
		document.getElementById(elements[a] + "MineCost").innerHTML = gameData.mineCost[a];
	}
}
		
function update() {
	var fuelPerSecond = gameData.mine[0] * gameData.mineMult[0];
	var thoriumMinePerSecond = gameData.mine[1] * gameData.mineMult[1];
	var uraniumMinePerSecond = gameData.mine[2] * gameData.mineMult[2];
	var plutoniumMinePerSecond = gameData.mine[3] * gameData.mineMult[3];
	
	gameData.fuel += fuelPerSecond / 20;
	gameData.mine[0] += thoriumMinePerSecond / 20;
	gameData.mine[1] += uraniumMinePerSecond / 20;
	gameData.mine[2] += plutoniumMinePerSecond / 20;

	document.getElementById("fuel").innerText = "You have " + Math.round(gameData.fuel * 10) / 10 + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + Math. round(fuelPerSecond * 10) / 10 + " Nuclear Fuel per second.";
	var a;
	for (a = 0; a < elements.length; a++) {
		document.getElementById(elements[a] + "Mine").innerText = Math.round(gameData.mine[a] * 10) / 10;
		document.getElementById(elements[a] + "MineCost").innerText = Math.round(gameData.mineCost[a] * 10) / 10;
		document.getElementById(elements[a] + "MineMult").innerText = Math.round(gameData.mineMult[a] * 10) / 10;
	}
}

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);
 
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(gameData));
}, 5000);