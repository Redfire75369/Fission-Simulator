function getNanoCost() {
	return 5 + player.nano * 5;
}

function resetNano() {
	player.nano = getDefaultData().nano;
	player.nanite = getDefaultData().nanite;
}

function canBuyNano() {
	if (player.reactor.bought[7] >= getNanoCost()) {
		return true;
	} else {
		return false;
	}
}

function buyNano() {
	if (canBuyNano()) {
		player.nano += 1;
		player.nanite = player.nanite.plus(player.nano);
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function buyMaxNano() {
	if (canBuyNano()) {
		max = (player.reactor.bought[7] - 5) / 5;
		player.nano = max;
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function updateNano() {
	document.getElementById("nanoCost").innerText = "Nanomaterial Research (" + player.nano + "): Requires " + getNanoCost() + " Californium-252 Reactors"
	document.getElementById("nano").innerText = "Reset the game for a boost to efficiency and " + (player.nano + 1) + " Nanite";
	document.getElementById("nano").className = canBuyNano() ? "softresetbtnbuy" : "softresetbtnlocked";
}