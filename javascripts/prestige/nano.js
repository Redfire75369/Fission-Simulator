function resetNaniteResearch() {
	player.nanites.research = getDefaultData().nanites;
	player.eff.multMult = getDefaultData().eff.multMult;
}

function canBuyNaniteResearch() {
	if (player.reactor.bought[7]  < 5) {
		return false;
	} else {
		return (player.reactor.amount[7].gt(player.nanites.lastNanites));
	}
}

function getNanitesOnPrestige() {
	ret = player.reactor.amount[7].pow(2 / 3).multiply(log(player.reactor.bought[7] / 10 + 1, 5)).multiply(sqrt(2)).minus(player.nanites.total)
	if (ret.lte(0)) {
		return 0;
	} else {
		return ret;
	}
}

function buyNaniteResearch() {
	if (canBuyNaniteResearch()) {
		player.nanites.nanites = player.nanites.nanites.plus(getNanitesOnPrestige());
		player.nanites.total = player.nanites.total.plus(getNanitesOnPrestige());
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
	document.getElementById("naniteonprestige").innerText = notation(getNanitesOnPrestige());
	document.getElementById("naniteresearch").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}