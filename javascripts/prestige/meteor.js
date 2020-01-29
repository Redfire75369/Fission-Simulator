function getMeteorCost() {
	if (player.meteor < 4) {
		return [2, player.meteor + 3];
	} else {
		return [2 + (player.meteor - 4) * 2, 7];
	}
}

function resetMeteor() {
	player.meteor = getDefaultData().meteor;
}

function canBuyMeteor() {
	if (player.reactor.bought[getMeteorCost()[1]] >= getMeteorCost()[0]) {
		return true;
	} else {
		return false;
	}
}

function buyMeteor() {
	if (canBuyMeteor()) {
		player.meteor += 1;
		resetEnergy();
		resetEff();
		resetReactors();
	}
}

function buyMaxMeteor() {
	if (player.meteor < 4) {
		buyMeteor();
	} else if (canBuyMeteor()) {
		max = floor(((player.reactor.bought[7] - 2) / 2) - 4) + 4;
		player.meteor = max;
		resetEnergy();
		resetEff();
		resetReactors();
	}
}

function updateMeteor() {
	let type;
	if (player.meteor < 4) {
		type = "Meteor Shower";
		document.getElementById("meteor").innerText = "Reset the game for a new Mine";
	} else {
		type = "Tectonic Inititation";
		document.getElementById("meteor").innerText = "Reset the game for a Boost";
	}
	document.getElementById("meteorCost").innerText = type + " (" + player.meteor + "): Requires " + getMeteorCost()[0] + " " + isotopes[getMeteorCost()[1]] + " Reactors";
	document.getElementById("meteor").className = canBuyMeteor() ? "meteorbtnbuy" : "meteorbtnlocked";
}