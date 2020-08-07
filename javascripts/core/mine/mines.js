const mineUpgradeCosts = [new Decimal("0"), new Decimal("1e3"), new Decimal("1e6"), new Decimal("1e10"), new Decimal("1e15"), new Decimal("1e20"), new Decimal("1e24"), new Decimal("1e30")];

class ImprovedMines {
	constructor() {
		this.tier = 0;
		this.amount = new Decimal(1);
		this.depleted = new Decimal(0);
		this.depletion = new Decimal(0);
		this.ratio = 0.5;
	}

	get constructionCost() {
		return Decimal.pow(20, 2 * this.tier + 1);
	}
	get metalExtraction() {
		return this.amount.sub(this.depleted).mul(5);
	}

	get ore() {
		return Decimal.pow(50, 2 * this.tier + 1);
	}
	get totalOre() {
		return this.ore.mul(this.amount);
	}

	get upCost() {
		return mineUpgradeCosts[this.tier + 1];
	}
	get upgradable() {
		return player.energy.gte(this.upCost);
	}
	upgrade() {
		if (this.upgradable) {
			player.energy = player.energy.sub(this.upCost);
			this.tier++; 
		}
	}
}

function resetMines() {
	player.mines = getDefaultData().mines;
}

function getMineGain() {
	return player.mines.metalExtraction.mul(player.mines.ratio).div(player.mines.constructionCost);
}
function getReactorGain(tier) {
	let c = 0;
	for (let x = 0; x < min(8, player.nucleosynthesis + 4); x++) {
		if (player.reactors[x].amount.gt(0)) {
			c++;
		}
	}
	if (c >= tier ) {
		return player.mines.metalExtraction.mul(1 - player.mines.ratio).div(c).div(player.reactors[tier].constructionCost);
	} else {
		return zero;
	}
}
function getFuelGain(tier) {
	if (player.mines.tier >= tier) {
		return player.mines.amount.sub(player.mines.depleted).mul(2).pow(player.mines.tier - tier + 1);
	} else {
		return zero;
	}
}

function simulateMines(tickInterval = 50) {
	player.mines.ratio = min(1, max(0, parseFloat(document.getElementById("construction_ratio").value) / 100));

	player.mines.amount = player.mines.amount.add(getMineGain().mul(tickInterval / 1000));
	player.mines.depleted = player.mines.depleted.add(player.mines.metalExtraction.div(player.mines.ore).mul(player.mines.ratio).mul(tickInterval / 1000));
	player.mines.depletion = player.mines.depletion.add(player.mines.metalExtraction.mul(player.mines.ratio).mul(tickInterval / 1000));

	for (let tier = min(7, player.nucleosynthesis + 3); tier >= 0; tier--) {
		player.reactors[tier].amount = player.reactors[tier].amount.add(getReactorGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIMines() {
	document.getElementById("mines_active").innerText = notation(player.mines.amount.sub(player.mines.depleted));
	document.getElementById("mines_depleted").innerText = notation(player.mines.depleted);

	document.getElementById("ore_extraction").innerText = notation(player.mines.metalExtraction);
	document.getElementById("ore_total").innerText = notation(player.mines.totalOre);

	document.getElementById("construction_cost").innerText = notation(player.mines.constructionCost);
	document.getElementById("construction_rate").innerText = notation(getMineGain());
	
	document.getElementById("mines_upgrade").className = player.mines.upgradable ? "storebtn buy" : "storebtn locked";
	document.getElementById("mines_upgrade").style.display = player.mines.tier < 7 ? "" : "none";
	if (player.mines.tier < 7) {
		document.getElementById("mines_uptype").innerText = mining[player.mines.tier + 1];
		document.getElementById("mines_upcost").innerText = notation(player.mines.upCost);
	}
}
