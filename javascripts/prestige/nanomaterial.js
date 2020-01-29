function getNanoCost() {
	return 5 + player.nano * 5;
}

function resetNano() {
	player.nano = getDefaultData().nano;
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