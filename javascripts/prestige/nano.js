function resetNaniteResearch() {
	player.nanites.research = getDefaultData().nanites.research;
	player.nanites.nanites = getDefaultData().nanites.nanites;
}

function canBuyNaniteResearch() {
	if (player.reactor.bought[7]  < 5) {
		return false;
	} else {
		return (player.reactor.amount[7].gt(player.nanites.lastNanites));
	}
}

function getNanitesOnPrestige() {
	return player.reactor.amount[7].pow(2 / 3).multiply(log(player.reactor.bought[7] / 10 + 1, 5)).multiply(sqrt(2)).minus(player.nanites.lastNanites);
}

function buyNaniteResearch() {
	if (canBuyNaniteResearch()) {
		player.nanites.nanites = player.nanites.nanites.plus(getNanitesOnPrestige());
		player.nanites.lastNanites = player.reactor.amount[7];
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function updateNaniteResearch() {
	if (player.nanites.lastNanites.equals(0)) {
		document.getElementById("nanitecost").innerText = 5;
	} else {
		document.getElementById("nanitecost").innerText = player.nanites.lastNanites.plus(1);
	}
	if (getNanitesOnPrestige().lt(0)) {
		document.getElementById("naniteonprestige").innerText = 0;
	} else {
		document.getElementById("naniteonprestige").innerText = notation(getNanitesOnPrestige());
	} 
	document.getElementById("naniteresearch").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}