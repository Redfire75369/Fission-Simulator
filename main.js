var gameData = {
    version: {alpha: 0, beta: 1},
    uranium: 10,
    uraniumMine: 0,
    uraniumMineCost: 10,
    uraniumMineMultiplier: 1.00,
    uraniumMineCostMult: 1000,
    plutoniumMine: 0,
    plutoniumMineCost: 100,
    plutoniumMineMultiplier: 1.00,
    plutoniumMineCostMult: 10000
}

function buyUraniumMine() {
    if (gameData.uranium >= gameData.uraniumMineCost) {
        gameData.uranium -= gameData.uraniumMineCost;
        gameData.uraniumMine += 1;
        gameData.uraniumMineCost *= gameData.uraniumMineCostMult;
        gameData.uraniumMineMultiplier *= 2;
    }
}

function buyPlutoniumMine() {
    if (gameData.uranium >= gameData.plutoniumMineCost) {
        gameData.uranium -= gameData.plutoniumMineCost;
        gameData.plutoniumMine += 1;
        gameData.plutoniumMineCost *= gameData.plutoniumMineCostMult;
        gameData.plutoniumMineMultiplier *= 2;
        
    }
}

function update() {
    var uraniumPerSecond = gameData.uraniumMine * gameData.uraniumMineMultiplier;
    var uraniumMinePerSecond = gameData.plutoniumMine * gameData.plutoniumMineMultiplier;
    gameData.uranium += uraniumPerSecond;
    gameData.uraniumMine += uraniumMinePerSecond;

    document.getElementById("uranium").innerText = "You have " + gameData.uranium + " Uranium.";
    document.getElementById("uraniumMine").innerText = "You have " + gameData.uraniumMine + " Uranium Mines.";
    document.getElementById("plutoniumMine").innerText = "You have " + gameData.plutoniumMine + " Plutonium Mines";

    document.getElementById("uraniumMineCost").innerHTML = "Buy for " + gameData.uraniumMineCost + " Uranium";
    document.getElementById("plutoniumMineCost").innerHTML = "Buy for " + gameData.plutoniumMineCost + " Uranium";

    document.getElementById("uraniumPerSecond").innerText = "You are gaining " + uraniumPerSecond + " Uranium per second."
    document.getElementById("uraniumMinePerSecond").innerText = "You are gaining " + uraniumMinePerSecond + " Uranium Mines per second."
}

var mainGameLoop = window.setInterval(function() {
    update();
  }, 1000);
