var gameData = {
    uranium: 10,
    uraniumMine: 0,
    uraniumMineCost: 10,
    uraniumMineMultiplier: 1.00
}

function buyUraniumMine() {
    if (gameData.uranium >= gameData.uraniumMineCost) {
        gameData.uranium -= gameData.uraniumMineCost;
        gameData.uraniumMine += 1;
        gameData.uraniumMineCost *= 10;
        document.getElementById("uraniumMines").innerHTML = "You have " + gameData.uraniumMine + " Uranium Mines"
    }
}

function update() {
    gameData.uranium += gameData.uraniumMine * gameData.uraniumMineMultiplier;
    document.getElementById("uranium").innerHTML = "You have " + gameData.uranium + " Uranium."
}

var mainGameLoop = window.setInterval(function() {
    update();
  }, 1000)
