function resetNaniteResearch() {
	player.nanites.nanites = (player.meltdown.ups[0] == 1) ? new Decimal(1) : zero;
	player.nanites.total = (player.meltdown.ups[0] == 1) ? new Decimal(1) : zero;
}

function canBuyNaniteResearch() {
	if (player.reactor.bought[7]  < 5) {
		return false;
	} else {
		return (nanitesGain().gt(0));
	}
}

function nanitesGain() {
	let ret = new Decimal(0);
	if (player.reactor.amount[7].lte(19)) {
		ret = player.reactor.amount[7].sub(4);
	} else if (player.reactor.amount[7].lte(5050)) {
		ret = player.reactor.amount[7].pow(2).div(32).sub(player.reactor.amount[7].mul(7 / 8)).add(20);
	} else {
		ret = zero;
	}
	ret = ret.sub(player.nanites.total);
	if (ret.gt(0)) {
		return Decimal.floor(ret);
	} else {
		return zero;
	}
}

function buyNaniteResearch() {
	if (canBuyNaniteResearch()) {
		if (!player.unlocked.naniteUps && !player.unlocked.meltdown) {
			showNaviTab("nanite");
		}
		player.nanites.nanites = player.nanites.nanites.add(nanitesGain());
		player.nanites.total = player.nanites.total.add(nanitesGain());
		player.meltdown.totalNanites = player.meltdown.totalNanites.add(nanitesGain());
		player.unlocked.naniteUps = true;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetEff();
		resetNucleosynthesis();
	}
}

function updateUINaniteResearch() {
	document.getElementById("naniteResearchCost").innerText = (player.nanites.total.eq(0)) ? "5" : (player.nanites.total.lt(15)) ? (player.nanites.total.add(5)) : (player.nanites.total.lte(792544.375)) ? Decimal.add(14, player.nanites.total.add(1).mul(32).sub(444).sqrt().ceil()) : infinity;
	document.getElementById("nanitesOnResearch").innerText = notation(nanitesGain());
	document.getElementById("naniteResearch").className = canBuyNaniteResearch() ? "btnbuy" : "btnlocked";
}