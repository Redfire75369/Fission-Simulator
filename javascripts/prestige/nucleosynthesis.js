function resetNucleosynthesis() {
	player.nucleosynthesis = (player.meltdown.ups[0] == 1) ? 4 : (player.meltdown.ups[0] == 1) ? 3 : (player.meltdown.ups[0] == 1) ? 2 : (player.meltdown.ups[0] == 1) ? 1 : 0;
}

function getNucleosynthesisCost() {
	if (player.nucleosynthesis < 4) {
		return [player.nucleosynthesis + 3, 2];
	} else {
		return [7, 2 + (player.nucleosynthesis - 4) * 2];
	}
}


function canBuyNucleosynthesis() {
	return player.reactor.bought[getNucleosynthesisCost()[0]] >= getNucleosynthesisCost()[1];
}

function buyNucleosynthesis() {
	if (canBuyNucleosynthesis()) {
		player.nucleosynthesis += 1;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
	}
}

function buyMaxNucleosynthesis() {
	if (player.nucleosynthesis < 4) {
		buyNucleosynthesis();
	} else if (canBuyNucleosynthesis()) {
		player.nucleosynthesis = floor(((player.reactor.bought[7] - 2) / 2) + 5);
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
	}
}

function updateUINucleosynthesis() {
	document.getElementById("meteorShower").innerText = (player.nucleosynthesis < 4) ? "Reset the game for a new mine and reactor" : "Reset the game for a boost to mines and reactors";
	let type = (player.nucleosynthesis < 4) ? "Stellar Nucleosynthesis" : "Nucleosynthesis";
	document.getElementById("meteorCost").innerText = type + " (" + player.nucleosynthesis + "): Requires " + getNucleosynthesisCost()[1] + " " + isotopes[getNucleosynthesisCost()[0]] + " Reactors";
	document.getElementById("meteorShower").className = canBuyNucleosynthesis() ? "btnbuy" : "btnlocked";
}