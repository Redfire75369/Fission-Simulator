var gameData = {
    version: {alpha: 0, beta: 1},
    uranium: 10,
    uraniumMine: 0,
    uraniumMineCost: 10,
    uraniumMineMultiplier: 1.00,
    plutoniumMine: 0,
    plutoniumMineCost: 100,
    plutoniumMineMultiplier: 1.00
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
    gameData.uranium += gameData.uraniumMine * gameData.uraniumMineMultiplier;
    gameData.uraniumMine += gameData.plutoniumMine * gameData.plutoniumMineMultiplier;
    document.getElementById("uranium").innerHTML = "You have " + gameData.uranium + " Uranium."
    document.getElementById("uraniumMines").innerHTML = "You have " + gameData.uraniumMine + " Uranium Mines"
    document.getElementById("plutoniumMines").innerHTML = "You have " + gameData.plutoniumMine + " Plutonium Mines."
}

var mainGameLoop = window.setInterval(function() {
    update();
  }, 1000);
