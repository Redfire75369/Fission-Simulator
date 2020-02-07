function getNaniteResearchCost() {
	return 5 + player.nanites.research * 5;
}

function resetNaniteResearch() {
	player.nanites.research = getDefaultData().nanites.research;
	player.nanites.nanites = getDefaultData().nanites.nanites;
}

function canBuyNaniteResearch() {
	return player.reactor.bought[7] >= getNaniteResearchCost();
}

function buyNaniteResearch() {
	if (canBuyNaniteResearch()) {
		player.nanites.research += 1;
		player.nanites.nanites = player.nanites.nanites.plus(1);
		player.nanites.time = 0;
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function buyMaxNaniteResearch() {
	if (canBuyNaniteResearch()) {
		max = (player.reactor.bought[7] - 5) / 5;
		player.nanites.research = max;
		player.nanites.time = 0;
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function updateNaniteResearch() {
	document.getElementById("naniteamt").innerText = player.nanites.research;
	document.getElementById("naniteCost").innerText = getNaniteResearchCost();
	document.getElementById("nano").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}