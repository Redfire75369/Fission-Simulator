var gameData = {
    version: {alpha: 0, beta: 2},
    fuel: 10,
    mine: [0, 0, 0, 0],
    mineCost: [10, 100, 10000, 1000000],
    mineMult: [1.00, 1.00, 1.00, 1.00],
    mineCostMult: [100, 1000, 100000, 10000000],
    mineMultMult: 2.00
}

//var save = JSON.parse(localStorage.getItem("fissionSimSave"));
//if (save !== null) {
	//gameData = save;
///}
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
function buyThoriumMine() {
    if (gameData.fuel >= gameData.mineCost[0]) {
        gameData.fuel -= gameData.mineCost[0];
        gameData.mine[0] += 1;
        gameData.mineCost[0] *= gameData.mineCostMult[0];
        gameData.mineMult[0] *= gameData.mineMultMult;
        
        document.getElementById("thoriumMine").innerText = gameData.mine[0];
        document.getElementById("thoriumMineCost").innerHTML = gameData.mineCost[0];
    }
}

function buyUraniumMine() {
    if (gameData.fuel >= gameData.mineCost[1]) {
        gameData.fuel -= gameData.mineCost[1];
        gameData.mine[1] += 1;
        gameData.mineCost[1] *= gameData.mineCostMult[1];
        gameData.mineMult[1] *= gameData.mineMultMult;
        
        document.getElementById("uraniumMine").innerText = gameData.mine[1];
        document.getElementById("uraniumMineCost").innerHTML = "Cost: " + gameData.mineCost[1];
    }
}

function buyPlutoniumMine() {
    if (gameData.fuel >= gameData.mineCost[2]) {
        gameData.fuel -= gameData.mineCost[2];
        gameData.mine[2] += 1;
        gameData.mineCost[2] *= gameData.mineCostMult[2];
        gameData.mineMult[2] *= gameData.mineMultMult;
        
        document.getElementById("plutoniumMine").innerText = gameData.mine[2];
        document.getElementById("plutoniumMineCost").innerHTML = "Cost: " + gameData.mineCost[2];
    }
}

function buyAmericiumMine() {
    if (gameData.fuel >= gameData.mineCost[3]) {
        gameData.fuel -= gameData.mineCost[3];
        gameData.mine[3] += 1;
        gameData.mineCost[3] *= gameData.mineCostMult[3];
        gameData.mineMult[3] *= gameData.mineMultMult;
        
        document.getElementById("americiumMine").innerText = gameData.mine[3];
        document.getElementById("americiumMineCost").innerHTML = "Cost: " + gameData.mineCost[3];
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
    
    document.getElementById("thoriumMine").innerText = Math.round(gameData.mine[0] * 10) / 10;
    document.getElementById("thoriumMineCost").innerHTML = "Cost: " + gameData.mineCost[0];
    document.getElementById("thoriumMineMult").innerText = "Thorium Mine x" + gameData.mineMult[0];
    
    document.getElementById("uraniumMine").innerText = Math.round(gameData.mine[1] * 10) / 10;
    document.getElementById("uraniumMineCost").innerHTML = "Cost: " + gameData.mineCost[1];
    
    document.getElementById("plutoniumMine").innerText = Math.round(gameData.mine[2] * 10) / 10;
	document.getElementById("plutoniumMineCost").innerHTML = "Cost: " + gameData.mineCost[2];
	
	document.getElementById("americiumMine").innerText = Math.round(gameData.mine[3] * 10) / 10;
	document.getElementById("americiumMineCost").innerHTML = "Cost:" + gameData.mineCost[3];
}

var mainGameLoop = window.setInterval(function() {
    update();
}, 50);
 
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(gameData));
}, 5000);