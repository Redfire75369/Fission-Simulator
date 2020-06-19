class Efficiency extends GenericEnergyProducer {
	constructor() {
		super(3, 1, 10, 308);
	}
	
	get increment() {
		let effUpg = player.nanites.ups[0].bought;
		if (effUpg <= 2) {
				return new Decimal(1.1 + 0.02 * effUpg);
		} else {
				return new Decimal(1.25).mul(new Decimal(1.036).pow(effUpg - 2));
		}
	}
	
	get eff() {
		return this.increment.pow(this.bought);
	}
}

function resetEff() {
	player.eff.reset();
}

function updateUIEff() {
	document.getElementById("eff_mult").innerText = notation(player.eff.eff);
	document.getElementById("eff_increment").innerText = notation((player.eff.increment.toNumber() - 1) * 100, 2);
	document.getElementById("eff_cost").innerText = notation(player.eff.cost);
	document.getElementById("eff_buysingle").className = player.eff.buyable ? "storebtn buy" : "storebtn locked";
	document.getElementById("eff_buymax").className = player.eff.buyable ? "storebtn buy" : "storebtn locked";
}