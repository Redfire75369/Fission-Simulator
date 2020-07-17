function resetNucleosynthesis() {
	player.nucleosynthesis = player.meltdown.ups[43] == 1 ? 4 : player.meltdown.ups[43] == 1 ? 3 : player.meltdown.ups[43] == 1 ? 2 : player.meltdown.ups[43] == 1 ? 1 : 0;
}

function getNucleosynthesisCost() {
	if (player.nucleosynthesis < 4) {
		return [player.nucleosynthesis + 3, 2];
	} else {
		return [7, 2 + (player.nucleosynthesis - 4) * 2];
	}
}

function canBuyNucleosynthesis() {
	return player.reactors[getNucleosynthesisCost()[0]].bought >= getNucleosynthesisCost()[1];
}

function buyNucleosynthesis() {
	if (canBuyNucleosynthesis()) {
		player.nucleosynthesis += 1;
		player.unlocked.coils = true;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetTurbineRotors();
		resetEff();
	}
}

function buyMaxNucleosynthesis() {
	if (player.nucleosynthesis < 4) {
		buyNucleosynthesis();
	} else if (canBuyNucleosynthesis()) {
		player.nucleosynthesis = floor(((player.reactors[7].bought - 2) / 2) + 5);
		player.unlocked.coils = true;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetTurbineRotors();
		resetEff();
	}
}

function updateUINucleosynthesis() {
	document.getElementById("nucleosynthesis_btn").innerText = (player.nucleosynthesis < 4) ? "Reset the game for a new mine and reactor" : "Reset the game for a boost to mines and reactors";
	document.getElementById("nucleosynthesis_scaling").innerText = (player.nucleosynthesis < 4) ? "Stellar Nucleosynthesis" : "Nucleosynthesis";
	document.getElementById("nucleosynthesis_amt").innerText = player.nucleosynthesis;
	document.getElementById("nucleosynthesis_cost").innerText = getNucleosynthesisCost()[1] + " " + isotopes[getNucleosynthesisCost()[0]];
	document.getElementById("nucleosynthesis_btn").className = canBuyNucleosynthesis() ? "storebtn buy" : "storebtn locked";
}