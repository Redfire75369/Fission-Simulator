function setEnergy(num) {
	player.energy = Decimal.pow(2, 1024);
}

function resetEnergy() {
	player.energy = getDefaultData().energy;
}

function getMaxEnergyGain(tier) {
	return player.reactor.amount[0].mul(getTotalReactorMult(0)).mul(player.eff.mult).mul(3 ** tier).mul(4);
}
function getEnergyGain(tier) {
	if (player.fuel[tier].gt(0)) {
		return getMaxEnergyGain(tier);
	} else if (getMaxEnergyGain(tier).gt(getTotalFuelGain(tier).mul(JkgLEF[tier]))) {
		return getTotalFuelGain(tier).mul(JkgLEF[tier]);
	} else {
		return new Decimal(0);
	}
}
function getTotalEnergyGain() {
	let ret = new Decimal(0);
	for (let tier = 0; tier < min(8, player.meteor.shower + 4); tier++) {
		ret = ret.add(getEnergyGain(tier));
	}
	return ret;
}

function getEnergyUsage(tier) {
	if (player.energy.gt(0)) {
		return getFuelMineGain(tier).mul(kgLEFJ[tier]);
	} else {
		let x = 0;
		for (let a = 0; a < 8; a++) {
			if (player.mine.amount[a].gt(0)) {
				x++;
			}
		}
		return getTotalEnergyGain().div(x);
	}
}
function getTotalEnergyUsage() {
	let ret = new Decimal(0);
	for (let tier = 0; tier < player.meteor.shower + 4; tier++) {
		ret = ret.add(getEnergyUsage(tier));
	}
	return ret;
}

function getNetEnergy() {
	return getTotalEnergyGain().sub(getTotalEnergyUsage());
}

function simulateEnergy(tickInterval = 50) {
	player.energy = player.energy.add(getNetEnergy().mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.plus(getTotalEnergyGain().mul(tickInterval / 1000));
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
	document.getElementById("netEnergy").innerText = notation(getNetEnergy());
	document.getElementById("energy2").innerText = notation(player.energy);
	document.getElementById("energyGain").innerText = notation(getTotalEnergyGain());
	document.getElementById("energyUsage").innerText = notation(getTotalEnergyUsage());
	document.getElementById("netEnergy2").innerText = notation(getNetEnergy());
}