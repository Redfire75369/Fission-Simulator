function getMeteorCost() {
	if (player.meteor < 4) {
		return [2, player.meteor + 3];
	} else {
		return [2 + (player.meteor - 4) * 2, 7];
	}
}

function canBuyMeteor() {
	if (player.mine.bought[getMeteorCost()[1]] >= getMeteorCost()[0]) {
		return true;
	} else {
		return false;
	}
}

function buyMeteor() {
	if (canBuyMeteor()) {
		player.meteor += 1;
		resetFuel();
		resetEff();
		resetMines();
	}
}

function buyMaxMeteor() {
	if (player.meteor < 4) {
		buyMeteor();
	} else if (canBuyMeteor()) {
		max = floor(((player.mine.bought[7] - 2) / 2) - 4) + 4;
		player.meteor = max;
		resetFuel();
		resetEff();
		resetMines();
	}
}

function updateMeteor() {
	let type;
	if (player.meteor < 4) {
		type = "Meteor Strike";
		document.getElementById("meteor").innerText = "Reset the game for a new Mine";
	} else {
		type = "Tectonic Inititation";
		document.getElementById("meteor").innerText = "Reset the game for a Boost";
	}
	document.getElementById("meteorCost").innerText = type + " (" + player.meteor + "): Requires " + getMeteorCost()[0] + " " + elements[getMeteorCost()[1]] + " Mines";
	document.getElementById("meteor").className = canBuyMeteor() ? "meteorbtnbuy" : "meteorbtnlocked";
}