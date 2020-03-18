function resetFuel() {
	player.fuel = getDefaultData().fuel;
}

function getFuelMineGain(tier) {
	let x = 0;
	for (let a = tier; a < 8; a++) {
		if (player.mine.amount[a].gt(0)) {
			x++;
		}
	}
	return player.mine.amount[tier].mul(getTotalMineMult(tier)).mul(getEff()).mul(((3 ** x) - 1)/2).div(tier + 1);
}
function getFuelReactorGain(tier) {
	if (tier = 7) {
		return zero;
	}
	let y = 0;
	for (let a = tier; a < 8; a++) {
		if (player.reactor.amount[a].gt(0)) {
			y++;
		}
	}
	return player.reactor.amount[tier + 1].mul(getTotalReactorMult(tier + 1)).mul(player.eff.mult).mul(((3 ** y) - 1)/2);
}
function getTotalFuelGain(tier) {
	return getFuelMineGain(tier).add(getFuelReactorGain(tier));
}

function updateUIFuel() {
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		document.getElementById(LEF[tier] + "Gain").innerText = notation(getTotalFuelGain(tier));
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById(LEF[tier] + "Row").style.display= (player.meteor.shower + 4 > tier && player.mine.bought[tier - 1] > 0) ? "table-row" : "none";
	}
}