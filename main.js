var gameData = {
    version: {alpha: 0, beta: 1},
    fuel: 10,
    mine: [0, 0, 0, 0],
    mineCost: [10, 100, 10000, 1000000],
    mineMult: [1.00, 1.00, 1.00, 1.00],
    mineCostMult: [100, 1000, 100000, 10000000],
    mineMultMult: 2.00
}

var save = JSON.parse(localStorage.getItem("fissionSimSave"));
if (save !==null) {
	gameData = save;
}

function buyThoriumMine() {
    if (gameData.fuel >= gameData.mineCost[0]) {
        gameData.fuel -= gameData.mineCost[0];
        gameData.mine[0] += 1;
        gameData.mineCost[0] *= gameData.mineCostMult[0];
        gameData.mineMult[0] *= gameData.mineMultMult;
        
        document.getElementById("thoriumMine").innerText = "You have " + gameData.mine[0] + " Thorium Mines.";
        document.getElementById("thoriumMineCost").innerHTML = "Buy for " + gameData.mineCost[0] + " Nuclear Fuel";
    }
}

function buyUraniumMine() {
    if (gameData.fuel >= gameData.mineCost[1]) {
        gameData.fuel -= gameData.mineCost[1];
        gameData.mine[1] += 1;
        gameData.mineCost[1] *= gameData.mineCostMult[1];
        gameData.mineMult[1] *= gameData.mineMultMult;
        
        document.getElementById("uraniumMine").innerText = "You have " + gameData.mine[1] + " Uranium Mines";
        document.getElementById("uraniumMineCost").innerHTML = "Buy for " + gameData.mineCost[1] + " Nuclear Fuel";
    }
}

function buyPlutoniumMine() {
    if (gameData.fuel >= gameData.mineCost[2]) {
        gameData.fuel -= gameData.mineCost[2];
        gameData.mine[2] += 1;
        gameData.mineCost[2] *= gameData.mineCostMult[2];
        gameData.mineMult[2] *= gameData.mineMultMult;
        
        document.getElementById("plutoniumMine").innerText = "You have " + gameData.mine[2] + " Plutonium Mines";
        document.getElementById("plutoniumMineCost").innerHTML = "Buy for " + gameData.mineCost[2] + " Nuclear Fuel";
    }
}

function buyAmericiumMine() {
    if (gameData.fuel >= gameData.mineCost[3]) {
        gameData.fuel -= gameData.mineCost[3];
        gameData.mine[3] += 1;
        gameData.mineCost[3] *= gameData.mineCostMult[3];
        gameData.mineMult[3] *= gameData.mineMultMult;
        
        document.getElementById("americiumMine").innerText = "You have " + gameData.mine[3] + " Americium Mines";
        document.getElementById("americiumMineCost").innerHTML = "Buy for " + gameData.mineCost[3] + " Nuclear Fuel";
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
    document.getElementById("fuelPerSecond").innerText = "You are gaining " + Math. round(fuelPerSecond * 10) / 10 + " Nuclear Fuel per second."
    
    document.getElementById("thoriumMine").innerText = "You have " + Math.round(gameData.mine[0] * 10) / 10 + " Thorium Mines.";
    document.getElementById("thoriumMineCost").innerHTML = "Buy for " + gameData.mineCost[0] + " Nuclear Fuel";
    document.getElementById("thoriumMinePerSecond").innerText = "You are gaining " + Math.round(thoriumMinePerSecond * 10) / 10 + " Thorium Mines per second."
    
    document.getElementById("uraniumMine").innerText = "You have " + Math.round(gameData.mine[1] * 10) / 10  + " Uranium Mines";
    document.getElementById("uraniumMineCost").innerHTML = "Buy for " + gameData.mineCost[1] + " Nuclear Fuel";
    document.getElementById("uraniumMinePerSecond").innerText = "You are gaining " + Math.round(uraniumMinePerSecond * 10) / 10 + " Uranium Mines per second."
    
    document.getElementById("plutoniumMine").innerText = "You have " + Math.round(gameData.mine[2] * 10) / 10  + " Plutonium Mines";
	document.getElementById("plutoniumMineCost").innerHTML = "Buy for " + gameData.mineCost[2] + " Nuclear Fuel";
	document.getElementById("plutoniumMinePerSecond").innerText = "You are gaining " + Math.round(plutoniumMinePerSecond * 10) / 10 + " Plutonium Mines per second."
	
	document.getElementById("americiumMine").innerText = "You have " + Math.round(gameData.mine[3] * 10) / 10  + " Americium Mines";
	document.getElementById("americiumMineCost").innerHTML = "Buy for " + gameData.mineCost[3] + " Nuclear Fuel";
}

var mainGameLoop = window.setInterval(function() {
    update();
}, 50);
 
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(gameData));
}, 5000);