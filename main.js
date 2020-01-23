var gameData = {
    version: {alpha: 0, beta: 1},
    fuel: 10,
    mine: [0, 0],
    mineCost: [10, 100],
    mineMult: [1.00, 1.00],
    mineCostMult: [1000, 10000],
    mineMultMult: 2.00
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

function update() {
    var fuelPerSecond = gameData.mine[0] * gameData.mineMult[0];
    var thoriumMinePerSecond = gameData.mine[1] * gameData.mineMult[1];
    gameData.fuel += fuelPerSecond;
    gameData.mine[0] += uraniumMinePerSecond;

    document.getElementById("fuel").innerText = "You have " + gameData.fuel + " units of Nuclear Fuel.";
    document.getElementById("thoriumMine").innerText = "You have " + gameData.mine[0] + " Uranium Mines.";
    document.getElementById("uraniumMine").innerText = "You have " + gameData.mine[1] + " Plutonium Mines";

    document.getElementById("thoriumMineCost").innerHTML = "Buy for " + gameData.mineCost[0] + " Nuclear Fuel";
    document.getElementById("uraniumMineCost").innerHTML = "Buy for " + gameData.mineCost[1] + " Nuclear Fuel";

    document.getElementById("fuelPerSecond").innerText = "You are gaining " + fuelPerSecond + " Nuclear Fuel per second."
    document.getElementById("uraniumMinePerSecond").innerText = "You are gaining " + uraniumMinePerSecond + " Uranium Mines per second."
}

var mainGameLoop = window.setInterval(function() {
    update();
  }, 1000);