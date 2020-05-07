class Efficiency {
	constructor(costStart, costMult) {
		this.costStart = new Decimal(costStart);
		this.costMult = new Decimal(costMult);
		this.bought = 0;
	}
	
	get preInf() {
		return floor(infinity.div(this.costStart).log10() / this.costMult.log10());
	}
	get cost() {
		return this.costStart.mul(this.costMult.pow(this.bought)).mul(Decimal.pow(10 - 0.5 * player.meltdown.breakUps[0],Decimal.max(0, this.bought - this.preInf - 1).mul(this.bought - this.preInf).div(2)));
	}
	
	reset() {
		this.amount = 0;
	}
	
	buy() {
		if (buyable) {
			player.energy = player.energy.sub(this.cost);
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}
	buyBulk(num) {
		for (let i = 0; i < bulk + 1 && buyable; i++) {
			
		}
	}
	buyMax() {
		while (buyable) {
			player.energy = player.energy.sub(this.cost);
			this.bought++;
			this.amount = this.amount.add(1);
		}
	}
	
	get increment() {
		let effUpg = player.nanites.ups[0];
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