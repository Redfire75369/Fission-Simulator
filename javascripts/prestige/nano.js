function resetNaniteResearch() {
	player.nanites.nanites = getDefaultData().nanites.nanites;
	player.nanites.total = getDefaultData().nanites.total;
	player.nanites.lastResearch = getDefaultData().nanites.lastResearch;
}

function canBuyNaniteResearch() {
	if (player.reactor.bought[7]  < 5) {
		return false;
	} else {
		return (getNanitesOnPrestige().gt(0));
	}
}

function getNanitesOnPrestige() {
	let ret = player.reactor.amount[7].pow(2 / 3).mul(log(player.reactor.bought[7] / 10 + 1, 5)).mul(sqrt(2));
	if (player.nanites.ups[11] == 1) {
		ret = ret.mul(player.meteor.shower / 5);
	}
	ret = ret.sub(player.nanites.total);
	if (ret.gt(0)) {
		return Decimal.floor(ret);
	} else {
		return new Decimal(0);
	}
}

function buyNaniteResearch() {
	if (canBuyNaniteResearch()) {
		player.nanites.nanites = player.nanites.nanites.add(getNanitesOnPrestige());
		player.nanites.total = player.nanites.total.add(getNanitesOnPrestige());
		player.nanites.lastNanites = player.reactor.amount[7];
		resetEnergy();
		resetEff();
		resetReactors();
		resetMeteor();
	}
}

function updateUINaniteResearch() {
	if (player.nanites.lastResearch.equals(0)) {
		document.getElementById("naniteResearchCost").innerText = 5;
	} else {
		document.getElementById("naniteResearchCost").innerText = player.nanites.lastResearch.add(1);
	}
	document.getElementById("nanitesOnResearch").innerText = notation(getNanitesOnPrestige());
	document.getElementById("naniteResearch").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}