function getNanoCost() {
	return 5 + player.nanites.nano * 5;
}

function resetNano() {
	player.nanites.nano = getDefaultData().nanites.nano;
	player.nanites.nanites = getDefaultData().nanites.nanites;
}

function canBuyNano() {
	return player.reactor.bought[7] >= getNanoCost();
}

function buyNano() {
	if (canBuyNano()) {
		player.nanites.nano += 1;
		player.nanites.nanites = player.nanites.nanites.plus(player.nano);
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function buyMaxNano() {
	if (canBuyNano()) {
		max = (player.reactor.bought[7] - 5) / 5;
		player.nanites.nano = max;
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function updateNano() {
	document.getElementById("nanoCost").innerText = "Nanomaterial Research (" + player.nanites.nano + "): Requires " + getNanoCost() + " Californium-252 Reactors"
	document.getElementById("nano").innerText = "Reset the game for a boost to efficiency and " + (player.nanites.nano + 1) + " Nanite";
	document.getElementById("nano").className = canBuyNano() ? "softresetbtnbuy" : "softresetbtnlocked";
}