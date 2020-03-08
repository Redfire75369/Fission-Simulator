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
	return player.mine.amount[tier].mul(getTotalMineMult(tier)).mul(player.eff.mult).mul(((3 ** x) - 1)/2).div(tier + 1);
}
function getFuelReactorGain(tier) {
	if (tier != 7) {
		let y = 0;
		for (let a = tier; a < 8; a++) {
			if (player.reactor.amount[a].gt(0)) {
				y++;
			}
		}
		return player.reactor.amount[tier + 1].mul(getTotalReactorMult(tier + 1)).mul(player.eff.mult).mul(((3 ** y) - 1)/2);
	} else {
		return new Decimal(0);
	}
}
function getTotalFuelGain(tier) {
	return getFuelMineGain(tier).add(getFuelReactorGain(tier));
}

function getFuelUsage(tier) {
	if (player.fuel[tier].gt(0)) {
		return getEnergyGain(tier).div(JkgLEF[tier]);
	} else {
		return getTotalFuelGain(tier);
	}
}
function getNetFuel(tier) {
	return getTotalFuelGain(tier).sub(getFuelUsage(tier));
}
	
function simulateFuel(tickInterval = 50) {
	for (let tier = 0; tier < 8; tier++) {
		player.fuel[tier] = player.fuel[tier].add(getNetFuel(tier).mul(tickInterval / 1000));
	}
}

function updateUIFuel() {
	console.log(JSON.stringify(player.fuel));
}