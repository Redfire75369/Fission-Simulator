const mineUpgradeCosts = [new Decimal("0"), new Decimal("1e3"), new Decimal("1e17"), new Decimal("1e26"), new Decimal("1e38"), new Decimal("1e51"), new Decimal("1e64"), new Decimal("1e80")];
const mineSoftCaps = [new Decimal("1e1"), new Decimal("1e5"), new Decimal("1e12"), new Decimal("1e20"), new Decimal("1e31"), new Decimal("1e42"), new Decimal("1e54"), new Decimal("1e72")];

class ImprovedMines {
	constructor() {
		this.tier = 0;
		this.amount = new Decimal(1);
		this.depleted = new Decimal(0);
		this.depletion = new Decimal(0);
		this.ratio = 0.5;
	}

	get effective() {
		if (this.amount.sub(this.depleted).gte(mineSoftCaps[this.tier])) {
			return mineSoftCaps[this.tier].add(this.amount.sub(this.depleted).sub(mineSoftCaps[this.tier]).div(Decimal.pow((this.tier + 1) * 3, 3)));
		} else {
			return this.amount.sub(this.depleted);
		}
	}

	get constructionCost() {
		return Decimal.pow(20, this.tier + 1);
	}
	get metalExtraction() {
		return this.totalOre.div(Decimal.pow(2.5, this.tier + 1));
	}

	get ore() {
		return Decimal.pow(50, this.tier + 1);
	}
	get totalOre() {
		return this.ore.mul(this.effective);
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

function changeConstructionRatio(x) {
	player.mines.ratio += x / 100;
	player.mines.ratio = max(0, min(1, player.mines.ratio));
}

function getMineGain() {
	return player.mines.metalExtraction.mul(player.mines.ratio).div(player.mines.constructionCost);
}
function getReactorGain(tier) {
	if (boughtReactors() > tier) {
		return player.mines.metalExtraction.mul(1 - player.mines.ratio).div(boughtReactors()).div(player.reactors[tier].constructionCost);
	} else {
		return zero;
	}
}
function getFuelGain(tier) {
	if (player.mines.tier >= tier) {
		return player.mines.effective.pow(player.mines.tier - tier + 1).div(2);
	} else {
		return zero;
	}
}

function simulateMines(tickInterval = 50) {
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
	document.getElementById("mines_total").innerText = notation(player.mines.amount);

	document.getElementById("ore_extraction").innerText = notation(player.mines.metalExtraction);
	document.getElementById("ore_total").innerText = notation(player.mines.totalOre);

	document.getElementById("mine_tier").innerText = mining[player.mines.tier];

	document.getElementById("construction_cost").innerText = notation(player.mines.constructionCost);
	document.getElementById("construction_rate").innerText = notation(getMineGain());

	document.getElementById("metal_allocation").children[0].style.width = player.mines.ratio * 100 + "%";
	document.getElementById("mines_upgrade").className = player.mines.upgradable ? "storebtn buy" : "storebtn locked";
	document.getElementById("mines_upgrade").style.display = player.mines.tier < 7 ? "" : "none";
	if (player.mines.tier < 7) {
		document.getElementById("mines_uptype").innerText = mining[player.mines.tier + 1];
		document.getElementById("mines_upcost").innerText = notation(player.mines.upCost);
	}
}
