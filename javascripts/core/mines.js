const mineUpgradeCosts = [new Decimal("5e8"), new Decimal("1e11"), new Decimal("1e19"), new Decimal("1e24"), new Decimal("1e38"), new Decimal("1e51"), new Decimal("1e64"), new Decimal("1e80")];
const mineSoftCaps = [new Decimal("2.5e1"), new Decimal("1e5"), new Decimal("1e12"), new Decimal("1e20"), new Decimal("1e31"), new Decimal("1e42"), new Decimal("1e54"), new Decimal("1e72")];

class Mines {
	constructor() {
		this.tier = -1;
		this.amount = zero;
		this.depleted = zero;
		this.depletion = zero;
		this.ratio = 0.5;
	}

	get effective() {
		if (this.tier < 0) {
			return zero;
		}
		if (this.amount.sub(this.depleted).gte(mineSoftCaps[this.tier])) {
			return mineSoftCaps[this.tier].add(this.amount.sub(this.depleted).sub(mineSoftCaps[this.tier]).div(Decimal.pow((this.tier + 1) * 8, 4)));
		}
		return this.amount.sub(this.depleted);
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
		return player.energy.gte(this.upCost) && this.tier < 7;
	}
	upgrade() {
		if (this.upgradable) {
			player.energy = player.energy.sub(this.upCost);
			const salvaged = this.amount.sub(this.depleted.mul(0.2)).mul(this.constructionCost);
			this.tier++;
			this.amount = Decimal.add(1, salvaged.div(this.constructionCost));
			this.depleted = zero;
		}
	}

	salvage() {
		if (this.depleted.gt(0)) {
			this.amount = this.amount.add(this.depleted.mul(0.8));
			this.depleted = zero;
		}
	}
}

function resetMines() {
	player.mines = getDefaultData().mines;
}

/*function changeConstructionRatio(x) {
	player.mines.ratio += x / 100;
	player.mines.ratio = max(0, min(1, player.mines.ratio));
}*/

function getMineGain() {
	return player.mines.metalExtraction.mul(player.mines.ratio).div(player.mines.constructionCost);
}
function getReactorGain(tier) {
	if (player.mines.tier > 2 * tier - 1) {
		const bought =  player.reactors.pebblebeds.reduce(function(acc, cur) {
			return acc + Math.sign(cur.bought);
		}, 0);
		return player.mines.metalExtraction.mul(1 - player.mines.ratio).div(bought).div(player.reactors.pebblebeds[tier].constructionCost).pow(1/3).div(20);
	}
	return zero;
}

function simulateMines(tickInterval = 50) {
	if (player.mines.tier > -1) {
		player.mines.amount = player.mines.amount.add(getMineGain().mul(tickInterval / 1000));
		player.mines.depleted = player.mines.depleted.add(player.mines.metalExtraction.div(player.mines.ore).mul(player.mines.ratio).mul(tickInterval / 1000));
		player.mines.depletion = player.mines.depletion.add(player.mines.metalExtraction.mul(player.mines.ratio).mul(tickInterval / 1000));

		for (let tier = 2; tier >= 0; tier--) {
			player.reactors.pebblebeds[tier].amount = player.reactors.pebblebeds[tier].amount.add(getReactorGain(tier).mul(tickInterval / 1000));
		}
	}
}
