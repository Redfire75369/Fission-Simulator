function getMeteorCost() {
	if (player.meteor.shower < 4) {
		return [player.meteor.shower + 3, 2];
	} else {
		return [7, 2 + (player.meteor.shower - 4) * 2];
	}
}

function resetMeteor() {
	let mult = player.meteor.meteorMult;
	player.meteor.shower = getDefaultData().meteor.shower;
	player.meteor.meteorMult = mult;
}

function canBuyMeteor() {
	return player.reactor.bought[getMeteorCost()[0]] >= getMeteorCost()[1];
}

function buyMeteor() {
	if (canBuyMeteor()) {
		player.meteor.shower += 1;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
	}
}

function buyMaxMeteor() {
	if (player.meteor.shower < 4) {
		buyMeteor();
	} else if (canBuyMeteor()) {
		player.meteor.shower = floor(((player.reactor.bought[7] - 2) / 2) + 5);
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
	}
}

function updateUIMeteor() {
	document.getElementById("meteorShower").innerText = (player.meteor.shower < 4) ? "Reset the game for a new Reactor" : "Reset the game for a Boost";
	let type = (player.meteor.shower < 4) ? "Meteor Shower" : "Tectonic Initiation";
	document.getElementById("meteorCost").innerText = type + " (" + player.meteor.shower + "): Requires " + getMeteorCost()[1] + " " + isotopes[getMeteorCost()[0]] + " Reactors";
	document.getElementById("meteorShower").className = canBuyMeteor() ? "btnbuy" : "btnlocked";
}