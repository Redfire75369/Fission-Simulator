function resetNaniteResearch() {
	player.nanites.nanites = (player.meltdown.ups[0] == 1) ? new Decimal(1) : zero;
	player.nanites.total = (player.meltdown.ups[0] == 1) ? new Decimal(1) : zero;
}

function canBuyNaniteResearch() {
	if (player.reactor.bought[7]  < 5) {
		return false;
	} else {
		return (getNanitesOnPrestige().gt(0));
	}
}

function getNanitesOnPrestige() {
	let ret = new Decimal(0);
	if (player.reactor.amount[7].lte(19)) {
		ret = player.reactor.amount[7].sub(4);
	} else if (player.reactor.amount[7].lte(5050)) {
		ret = player.reactor.amount[7].pow(2).div(32).sub(player.reactor.amount[7].mul(7).div(8)).add(20);
	} else {
		ret = zero;
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
		player.unlocked.naniteUps = true;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
		resetMeteor();
	}
}

function updateUINaniteResearch() {
	document.getElementById("naniteResearchCost").innerText = (player.nanites.total.equals(0)) ? "5" : (player.nanites.total.lt(15)) ? (player.nanites.total + 5) : (player.nanites.total.lt(792544.375)) ? new Decimal(15).add(Decimal.floor(player.nanites.total.mul(32).sub(444).sqrt())) : infinity;
	document.getElementById("nanitesOnResearch").innerText = notation(getNanitesOnPrestige());
	document.getElementById("naniteResearch").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}