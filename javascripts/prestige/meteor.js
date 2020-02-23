function getMeteorCost() {
	if (player.meteor.shower < 4) {
		return [player.meteor.shower + 3, 2];
	} else {
		return [7, 2 + (player.meteor.shower - 4) * 2];
	}
}

function resetMeteor() {
	player.meteor.shower = getDefaultData().meteor.shower;
}

function canBuyMeteor() {
	return player.reactor.bought[getMeteorCost()[0]] >= getMeteorCost()[1];
}

function buyMeteor() {
	if (canBuyMeteor()) {
		player.meteor.shower += 1;
		resetEnergy();
		resetEff();
		resetReactors();
	}
}

function buyMaxMeteor() {
	if (player.meteor.shower < 4) {
		buyMeteor();
	} else if (canBuyMeteor()) {
		player.meteor.shower = floor(((player.reactor.bought[7] - 2) / 2) + 5);
		resetEnergy();
		resetEff();
		resetReactors();
	}
}

function updateMeteor() {
	let type;
	if (player.meteor.shower < 4) {
		type = "Meteor Shower";
		document.getElementById("meteorshower").innerText = "Reset the game for a new Mine";
	} else {
		type = "Tectonic Inititation";
		document.getElementById("meteorshower").innerText = "Reset the game for a Boost";
	}
	document.getElementById("meteorCost").innerText = type + " (" + player.meteor.shower + "): Requires " + getMeteorCost()[1] + " " + isotopes[getMeteorCost()[0]] + " Reactors";
	document.getElementById("meteorshower").className = canBuyMeteor() ? "btnbuy" : "btnlocked";
}