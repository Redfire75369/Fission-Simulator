function resetEff() {
	player.eff = getDefaultData().eff;
}

function getEffCost() {
	return new Decimal(1000).mul(Decimal.pow(10, player.eff.bought)).mul(Decimal.pow(10 - 0.5 * player.meltdown.breakUps[0], Decimal.max(0, player.eff.bought - 306).mul(player.eff.bought - 305).div(2)));
}

function canBuyEff() {
	return player.energy.gte(getEffCost());
}

function getEffIncrement() {
	let effUpg = player.nanites.ups[0];
	if (effUpg <= 2) {
			return new Decimal(1.1 + 0.02 * effUpg);
	} else {
			return new Decimal(1.25).mul(new Decimal(1.036).pow(effUpg - 2));
	}
}
function getEff() {
	return getEffIncrement().pow(player.eff.bought);
}

function buyEff() {
	if (canBuyEff()) {
		player.energy = player.energy.sub(getEffCost());
		player.eff.bought += 1;
	}
}

function buyMaxEff() {
	while (canBuyEff()) {
		player.energy = player.energy.sub(getEffCost());
		player.eff.bought += 1;
	}
}

function updateUIEff() {
	document.getElementById("eff_mult").innerText = notation(getEff());
	document.getElementById("eff_increment").innerText = notation((getEffIncrement() - 1) * 100, 2);
	document.getElementById("eff_cost").innerText = notation(getEffCost());
	document.getElementById("eff_buysingle").className = canBuyEff() ? "btnbuy" : "btnlocked";
	document.getElementById("eff_buymax").className = canBuyEff() ? "btnbuy" : "btnlocked";
}