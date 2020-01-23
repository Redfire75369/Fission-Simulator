var gameData = {
    version: {alpha: 0, beta: 1},
    uranium: 10,
    uraniumMine: 0,
    uraniumMineCost: 10,
    uraniumMineMultiplier: 1.00,
    uraniumPerSecond: 0.00,
    plutoniumMine: 0,
    plutoniumMineCost: 100,
    plutoniumMineMultiplier: 1.00,
    uraniumMinePerSecond: 0.00
}

function buyUraniumMine() {
    if (gameData.uranium >= gameData.uraniumMineCost) {
        gameData.uranium -= gameData.uraniumMineCost;
        gameData.uraniumMine += 1;
        gameData.uraniumMineCost *= 10;
        gameData.uraniumMineMultiplier *= 2;
    }
}

function buyPlutoniumMine() {
    if (gameData.uranium >= gameData.plutoniumMineCost) {
        gameData.uranium -= gameData.plutoniumMineCost;
        gameData.plutoniumMine += 1;
        gameData.plutoniumMineCost *= 10;
        gameData.plutoniumMineMultiplier *= 2;
        
    }
}

function update() {
    gameData.uraniumPerSecond = gameData.uraniumMine * gameData.uraniumMineMultiplier;
    gameData.uraniumMinePerSecond = gameData.plutoniumMine * gameData.plutoniumMineMultiplier;
    gameData.uranium += gameData.uraniumPerSecond;
    gameData.uraniumMine += gameData.uraniumMinePerSecond;

    document.getElementById("uranium").innerHTML = "You have " + gameData.uranium + " Uranium.";
    document.getElementById("uraniumMine").innerHTML = "You have " + gameData.uraniumMine + " Uranium Mines.";
    document.getElementById("plutoniumMine").innerHTML = "You have " + gameData.plutoniumMine + " Plutonium Mines";

    document.getElementById("uraniumMineCost").innerHTML = "Buy for " + gameData.uraniumMineCost + " Uranium";
    document.getElementById("plutoniumMineCost").innerHTML = "Buy for " + gameData.plutoniumMineCost + " Uranium";
    
    document.getElementById("uraniumPerSecond").innerHTML = "You are gaining " + gameData.uraniumPerSecond + " Uranium per second."
    document.getElementById("uraniumMinePerSecond").innerHTML = "You are gaining " + gameData.uraniumMinePerSecond + " Uranium Mines per second."
}

var mainGameLoop = window.setInterval(function() {
    update();
  }, 1000);
