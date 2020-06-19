class NaniteUpgrade extends GenericUpgrade {
	constructor(id, cost, tiers = 1, scale = 1) {
		super(new Decimal(cost), tiers, new Decimal(scale));
		this.id = id;
	}

	get buyable() {
		return player.nanites.nanites.gte(this.cost) && this.bought < this.tiers;
	}

	buy() {
		if (this.buyable) {
			player.nanites.nanites = player.nanites.nanites.sub(this.cost);
			this.bought++;
		}
	}

	get mult() {
		switch(this.id) {
			case 11:
				return [8, new Decimal(max(1, log(player.time / 1000, 16) - 1))];
			case 12:
				return (player.nucleosynthesis <= 10) ? [8, Decimal.max(1, (player.nucleosynthesis ** log(player.nucleosynthesis + 1, 10)) / 3)] : [8, Decimal.max(1, (player.nucleosynthesis - 7) * (log(player.nucleosynthesis, 8) ** 0.5))];
			case 21:
				return [8, Decimal.max(1, new Decimal(player.energy.log(20)).div(20).pow(2))];
			case 22:
				return [8, Decimal.max(1, new Decimal(player.totalEnergy.log(25)).div(40).pow(2))];
			case 32:
				return [8, Decimal.max(1, player.nanites.total.log(1.2))];
			default:
				return [9, new Decimal(1)];
		}
	}
}

class EfficiencyNaniteUpgrade extends NaniteUpgrade {
	constructor() {
		super(0, 1, 1, 1);
	}
	
	get cost() {
		if (this.bought < 2) {
			return new Decimal(1);
		} else {
			return new Decimal(1).add(this.bought - 2);
		}
	}

	get buyable() {
		let boughtAll = true;
		for (let up = 1; up < player.nanites.ups.length; up++) {
			if (player.nanites.ups[up].bought <= player.nanites.ups[up].tiers) {
				boughtAll=false;
			}
		}
		if (boughtAll || player.nanites.ups[0] < 2) {
			return player.nanites.nanites.gte(this.cost);
		} else {
			return false;
		}
	}
	
	buy() {
		player.nanites.nanites = player.nanites.nanites.sub(this.cost);
		this.bought++;
	}
}

function resetNaniteUps() {
	if (player.meltdown.ups[44] < 4) {
		player.nanites.ups = getDefaultData().nanites.ups;
	}
}

function getTotalNaniteUpMult(tier) {
	let mult = new Decimal(1);
	for (let id = 0; id < player.nanites.ups.length; id++) {
		if (player.nanites.ups[id].bought >= 1 && (player.nanites.ups[id].mult[0] == tier || player.nanites.ups[id].mult[0] == 8)) {
			mult = mult.mul(player.nanites.ups[id].mult[1]);
		}
	}
	return mult;
}

function updateUINaniteUps() {
	document.getElementById("nanites_tabbtn").style.display = player.unlocked.naniteUps || player.unlocked.meltdown ? "inline-block" : "none";
	
	document.getElementById("nanites").innerText = notation(player.nanites.nanites);
	
	document.getElementById("nanite_upcost0").innerText = player.nanites.ups[0].cost.neq(1) ? (player.nanites.up[0].cost + " Nanites") : "1 Nanite";
	document.getElementById("nanite_up0").className = player.nanites.ups[0].buyable ? "naniteup buy" : "naniteup locked";
	
	document.getElementById("nanite_upformula12v1").style.display =  player.nucleosynthesis <= 13 ? "inline-block" : "none";
	document.getElementById("nanite_upformula12v2").style.display =  player.nucleosynthesis > 13 ? "inline-block" : "none";

	for (let i = 1; i < player.nanites.ups.length; i++) {
		if (player.nanites.ups[i].id != 31) {
			document.getElementById("nanite_upmult" + player.nanites.ups[i].id).innerText = notation(player.nanites.ups[i].mult[1]);
		}
		document.getElementById("nanite_up" + player.nanites.ups[i].id).className = player.nanites.ups[i].bought == 1 ? "naniteup bought" : player.nanites.ups[i].buyable ? "naniteup buy" : "naniteup locked";
	}
}