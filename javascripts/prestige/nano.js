function resetNaniteResearch() {
	player.nanites.nanites = player.meltdown.ups[44] == 4 ? player.nanites.nanites : player.meltdown.ups[44] == 3 ? player.nanites.total : player.meltdown.ups[44] == 2 ? player.meltdown.corium.mul(3).sub(3).log2() : player.meltdown.ups[44] == 1 ? new Decimal(1) : zero;
	player.nanites.total = player.nanites.nanites;
}

function canBuyNaniteResearch() {
	if (player.reactors[7].bought  < 3) {
		return false;
	} else {
		return nanitesGain().gt(0);
	}
}

function nanitesGain() {
	let ret = new Decimal(0);
	if (player.reactors[7].amount.lte(15)) {
		ret = player.reactors[7].amount.sub(2);
	} else if (player.reactors[7].amount.lte(5050)) {
		ret = player.reactors[7].amount.pow(2).div(32).sub(player.reactors[7].amount.mul(7 / 8)).add(16);
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
			showNaviTab("nanites_tab");
		}
		player.nanites.nanites = player.nanites.nanites.add(nanitesGain());
		player.nanites.total = player.nanites.total.add(nanitesGain());
		player.meltdown.totalNanites = player.meltdown.totalNanites.add(nanitesGain());
		player.unlocked.naniteUps = true;
		resetEnergy();
		resetFuel();
		resetMines();
		resetReactors();
		resetTurbineRotors();
		resetDynamoCoils();
		resetEff();
		resetNucleosynthesis();
	}
}

function updateUINaniteResearch() {
	document.getElementById("naniteresearch_cost").innerText = (player.nanites.total.eq(0)) ? "3" : (player.nanites.total.lt(15)) ? (player.nanites.total.add(3)) : (player.nanites.total.lte(792544.375)) ? Decimal.add(14, player.nanites.total.add(1).mul(32).sub(444).sqrt().ceil()) : infinity;
	document.getElementById("nanites_gain").innerText = notation(nanitesGain());
	document.getElementById("naniteresearch_btn").className = canBuyNaniteResearch() ? "storebtn buy" : "storebtn locked";
}