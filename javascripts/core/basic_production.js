const mineCostVar = {
	cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e5"), new Decimal("1e8"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e24"), new Decimal("1e30")],
	costMult: [new Decimal("1e3"), new Decimal("1e5"), new Decimal("1e7"), new Decimal("1e10"), new Decimal("1e13"), new Decimal("1e16"), new Decimal("1e20"), new Decimal("1e25")],
}
const reactorCostVar = {
	cost: [new Decimal("1e1"), new Decimal("1e2"), new Decimal("1e5"), new Decimal("1e8"), new Decimal("1e13"), new Decimal("1e18"), new Decimal("1e25"), new Decimal("1e32")],
	costMult: [new Decimal("1e4"), new Decimal("1e5"), new Decimal("1e6"), new Decimal("1e8"), new Decimal("1e9"), new Decimal("1e12"), new Decimal("1e14"), new Decimal("1e15")]
}
var mineTier = 0;
var reactorTier = 0;

class Mine extends GenericEnergyProducer {
	constructor(start, scale) {
		super(start, scale, 10, 308);
		this.tier = mineTier;
		mineTier++;
	}

	get totalMult() {
		let mult = new Decimal(1);
		let perBuyMult = player.meltdown.ups[31] == 1 ? new Decimal(3) : new Decimal(2);
		let nucleoMult = player.nanites.ups[31] == 1 ? new Decimal(2.2) : new Decimal(2);

		mult = mult.mul(perBuyMult.pow(this.bought)).mul(nucleoMult.pow(max(0, player.nucleosynthesis - this.tier)));
		mult = mult.mul(getTotalNaniteUpMult(this.tier));
		mult = mult.mul(getTotalMeltdownUpMult(this.tier));
		mult = mult.mul((player.import42) ? 2 : 1);
		return Decimal.max(1, mult);
	}
}

class Reactor extends GenericEnergyProducer {
	constructor(start, scale) {
		super(start, scale, 10, 308);
		this.tier = reactorTier;
		reactorTier++;
	}

	get totalMult() {
		let mult = new Decimal(1);
		let perBuyMult = player.meltdown.ups[31] == 1 ? new Decimal(3) : new Decimal(2);
		let nucleoMult = player.nanites.ups[31] == 1 ? new Decimal(2.2) : new Decimal(2);

		mult = mult.mul(perBuyMult.pow(this.bought)).mul(nucleoMult.pow(max(0, player.nucleosynthesis - this.tier)));
		mult = mult.mul(getTotalNaniteUpMult(this.tier));
		mult = mult.mul(getTotalMeltdownUpMult(this.tier));
		mult = mult.mul((player.import42) ? 2 : 1);
		return Decimal.max(1, mult);
	}
}

function resetMines() {
	for (let i = 0; i < 8; i++) {
		player.mines[i].reset();
	}
}
function resetReactors() {
	for (let i = 0; i < 8; i++) {
		player.reactors[i].reset();
	}
}

function buyMaxAll() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		player.reactors[tier].buyMax();
		player.mines[tier].buyMax()
	}
	player.eff.buyMax();
}

function getMineGain(tier) {
	return tier < 7 ? player.mines[tier + 1].amount.mul(player.mines[tier + 1].totalMult).mul(player.eff.eff) : zero;
}
function getReactorGain(tier) {
	return tier < 7 ? getMineGain(tier).add(player.reactors[tier + 1].amount.mul(player.reactors[tier + 1].totalMult)).sqrt().mul(player.eff.eff) : zero ;
}

function simulateMines(tickInterval = 50) {
	for (let tier = min(7, player.nucleosynthesis + 3); tier >= 0; tier--) {
		player.mines[tier].amount = player.mines[tier].amount.add(getMineGain(tier).mul(tickInterval / 1000));
	}
}
function simulateReactors(tickInterval = 50) {
	for (let tier = min(7, player.nucleosynthesis + 3); tier >= 0; tier--) {
		player.reactors[tier].amount = player.reactors[tier].amount.add(getReactorGain(tier).mul(tickInterval / 1000));
	}
}

function updateUIMines() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("mine_amt" + (tier + 1)).innerText = notation(player.mines[tier].amount) + " (" + player.mines[tier].bought + ")";
		document.getElementById("mine_cost" + (tier + 1)).innerText = notation( player.mines[tier].cost);
		document.getElementById("mine_buysingle" + (tier + 1)).className = player.mines[tier].buyable ? "storebtn buy mines" : "storebtn locked mines";
		document.getElementById("mine_buymax" + (tier + 1)).className =  player.mines[tier].buyable ? "storebtn buy mines" : "storebtn locked mines";
		document.getElementById("mine_mult" + (tier + 1)).innerText = notation( player.mines[tier].totalMult);
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("mine_row" + (tier + 1)).style.display = player.nucleosynthesis + 4 > tier && player.mines[tier - 1].bought > 0 ? "table-row" : "none";
	}
}
function updateUIReactors() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("reactor_amt" + (tier + 1)).innerText = notation(player.reactors[tier].amount) + " (" + player.reactors[tier].bought + ")";
		document.getElementById("reactor_cost" + (tier + 1)).innerText = notation(player.reactors[tier].cost);
		document.getElementById("reactor_buysingle" + (tier + 1)).className = player.reactors[tier].buyable ? "storebtn buy reactors" : "storebtn locked reactors";
		document.getElementById("reactor_buymax" + (tier + 1)).className = player.reactors[tier].buyable ? "storebtn buy reactors" : "storebtn locked reactors";
		document.getElementById("reactor_mult" + (tier + 1)).innerText = notation(player.reactors[tier].totalMult);
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("reactor_row" + (tier + 1)).style.display = player.nucleosynthesis + 4 > tier && player.reactors[tier - 1].bought > 0 ? "table-row" : "none";
	}
}
