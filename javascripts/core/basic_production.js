var reactorTier = 0;

class Reactor extends GenericEnergyProducer {
	constructor(start, scale, construction) {
		super(start, scale, 10, 308);
		this.tier = reactorTier;
		this.enabled = true;
		this.constructionCost = Decimal.pow(10, construction);
		reactorTier++;
	}

	toggle() {
		this.enabled = !this.enabled;
	}
	
	get totalMult() {
		let mult = new Decimal(1);
		let perBuyMult = player.meltdown.ups[8].bought ? new Decimal(3) : new Decimal(2);
		let nucleoMult = player.nanites.ups[5].bought ? new Decimal(2.4) : new Decimal(2);

		mult = mult.mul(perBuyMult.pow(this.bought)).mul(nucleoMult.pow(max(0, player.nucleosynthesis - this.tier)));
		mult = mult.mul(getTotalNaniteUpMult(this.tier));
		mult = mult.mul(getTotalMeltdownUpMult(this.tier));
		mult = mult.mul((player.import42) ? 2 : 1);
		return Decimal.max(1, mult);
	}
}

/*function resetMines() {
	for (let i = 0; i < 8; i++) {
		player.mines[i].reset();
	}
}*/
function resetReactors() {
	for (let i = 0; i < 8; i++) {
		player.reactors[i].reset();
	}
}

function buyMaxAll() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		player.reactors[tier].buyMax();
	}
	player.eff.buyMax();
}

/*function getMineGain(tier) {
	return zero;
	return tier < 7 ? player.mines[tier + 1].amount.mul(player.mines[tier + 1].totalMult).mul(player.eff.eff) : zero;
}
function getReactorGain(tier) {
	if (tier >= 7) {
		return zero;
	}
	return player.reactors[tier + 1].enabled ? getMineGain(tier).add(player.reactors[tier + 1].amount.mul(player.reactors[tier + 1].totalMult)).sqrt().mul(player.eff.eff) : getMineGain(tier).sqrt().mul(player.eff.eff);
}*/


function updateUIReactors() {
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4); tier++) {
		document.getElementById("reactor_amt" + (tier + 1)).innerText = notation(player.reactors[tier].amount) + " (" + player.reactors[tier].bought + ")";
		document.getElementById("reactor_cost" + (tier + 1)).innerText = notation(player.reactors[tier].cost);
		document.getElementById("reactor_buysingle" + (tier + 1)).className = player.reactors[tier].buyable ? "storebtn buy reactors" : "storebtn locked reactors";
		document.getElementById("reactor_buymax" + (tier + 1)).className = player.reactors[tier].buyable ? "storebtn buy reactors" : "storebtn locked reactors";
		document.getElementById("reactor_mult" + (tier + 1)).innerText = notation(player.reactors[tier].totalMult);
	}
	for (let tier = 1; tier < 8; tier++) {
		document.getElementById("reactor_row" + (tier + 1)).style.display = player.nucleosynthesis + 4 > tier && player.reactors[tier - 1].bought > 0 ? "" : "none";
	}
}

function updateUIMaxAll() {
	let usable = player.eff.buyable;
	for (let tier = 0; tier < min(8, player.nucleosynthesis + 4) && (!usable); tier ++) {
		usable |= player.reactors[tier].buyable;
	}
	document.getElementById("max_all").className = usable ? "storebtn buy" : "storebtn locked";
}
