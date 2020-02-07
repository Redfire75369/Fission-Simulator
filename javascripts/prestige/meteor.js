function getMeteorCost() {
	if (player.meteor.shower < 4) {
		return [2, player.meteor.shower + 3];
	} else {
		return [2 + (player.meteor.shower - 4) * 2, 7];
	}
}

function resetMeteor() {
	player.meteor.shower = getDefaultData().meteor.shower;
}

function canBuyMeteor() {
	return player.reactor.bought[getMeteorCost()[1]] >= getMeteorCost()[0];
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
		max = floor(((player.reactor.bought[7] - 2) / 2) - 4) + 4;
		player.meteor.shower = max;
		resetEnergy();
		resetEff();
		resetReactors();
	}
}

function updateMeteor() {
	let type;
	if (player.meteor.shower < 4) {
		type = "Meteor Shower";
		document.getElementById("meteor").innerText = "Reset the game for a new Mine";
	} else {
		type = "Tectonic Inititation";
		document.getElementById("meteor").innerText = "Reset the game for a Boost";
	}
	document.getElementById("meteorCost").innerText = type + " (" + player.meteor.shower + "): Requires " + getMeteorCost()[0] + " " + isotopes[getMeteorCost()[1]] + " Reactors";
	document.getElementById("meteor").className = canBuyMeteor() ? "btnbuy" : "btnlocked";
}