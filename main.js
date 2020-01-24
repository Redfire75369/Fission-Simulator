var gameData = {
	version: {alpha: 0, beta: 4},
	fuel: new Decimal(10),
	mine: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
	mineCost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+7")],
	mineMult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
	mineCostMult: [new Decimal("1e+2"), new Decimal("1e+3"), new Decimal("1e+5"), new Decimal("1e+8")],
	mineMultMult: new Decimal(2),
	currentTab: "production", 
	currentProdTab: ""
}
const e = ["Th", "U", "Pu", "Am"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium"];

function hardReset() {
	gameData = {
	version: {alpha: 0, beta: 4},
	fuel: new Decimal("1e+1"),
	mine: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
	mineCost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+7")],
	mineMult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
	mineCostMult: [new Decimal("1e+2"), new Decimal("1e+3"), new Decimal("1e+5"), new Decimal("1e+8")],
	mineMultMult: new Decimal(2),
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
	if (gameData.fuel.gte(gameData.mineCost[a])) {
		gameData.fuel = gameData.fuel.minus(gameData.mineCost[a]) ;
		
		gameData.mine[a] = gameData.mine[a].plus(1);
		gameData.mineCost[a] = gameData.mineCost[a].multiply(gameData.mineCostMult[a]);
		gameData.mineMult[a] = gameData.mineMult[a].multiply(gameData.mineMultMult);
		
		document.getElementById(e[a] + "Mine").innerText = gameData.mine[a];
		document.getElementById(e[a] + "MineCost").innerHTML = gameData.mineCost[a];
	}
}
		
function update() {
	let fuelPerSecond = gameData.mine[0].multiply(gameData.mineMult[0]);
	let ThMinePerSecond = gameData.mine[1].multiply(gameData.mineMult[1]);
	let UMinePerSecond = gameData.mine[2].multiply(gameData.mineMult[2]);
	let PuMinePerSecond = gameData.mine[3].multiply(gameData.mineMult[3]);
	
	gameData.fuel += fuelPerSecond.dividedBy(20);
	gameData.mine[0] += ThMinePerSecond.dividedBy(20);
	gameData.mine[1] += UMinePerSecond.dividedBy(20);
	gameData.mine[2] += PuMinePerSecond.dividedBy(20);

	document.getElementById("fuel").innerText = "You have " + gameData.fuel + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + fuelPerSecond + " Nuclear Fuel per second.";

	for (let a = 0; a < e.length; a++) {
		document.getElementById(e[a] + "Mine").innerText = gameData.mine[a];
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + gameData.mineCost[a];
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + gameData.mineMult[a];
	}
}

/*Load Save*/
var save = JSON.parse(localStorage.getItem("fissionSimSave"));
if (save !== null) {
	gameData = save;
}

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(gameData));
}, 5000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);