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
				return [[8], Decimal.max(1, log(player.time / 1000, 3.2))];
			case 12:
				return [[8], Decimal.max(1, new Decimal(player.energy.log(30)).div(20).pow(2))];
			case 21:
				return [[8], Decimal.max(1, pow(player.nucleosynthesis, log(player.nucleosynthesis + 1, 5)))];
			case 22:
				return [[8], Decimal.max(1, new Decimal(player.totalEnergy.log(15)).div(30).pow(2.4))];
			case 32:
				return [[8], Decimal.max(1, new Decimal(player.nanites.total.log(1.2)).pow(2.1))];
			default:
				return [[9], new Decimal(1)];
		}
	}
}

class TurbineNaniteUpgrade extends NaniteUpgrade {
	constructor() {
		super(0, 1, 1, 1);
	}

	get cost() {
		return new Decimal(1).add(max(0, this.bought - 2));
	}

	get buyable() {
		let boughtAll = true;
		for (let up = 1; up < player.nanites.ups.length; up++) {
			if (player.nanites.ups[up].bought < player.nanites.ups[up].tiers) {
				boughtAll=false;
			}
		}
		if (boughtAll || player.nanites.ups[0].bought < 2) {
			return player.nanites.nanites.gte(this.cost);
		}
		return false;
	}

	buy() {
		if (this.buyable) {
			player.nanites.nanites = player.nanites.nanites.sub(this.cost);
			player.turbine.dimensions += 2;
			player.turbine.bearingDimensions = 1;
			newTurbine();
			this.bought++;
		}
	}
}

function resetNaniteUps() {
	if (player.meltdown.ups[15].bought < 4) {
		player.nanites.ups = getDefaultData().nanites.ups;
	}
}

function getTotalNaniteUpMult(tier) {
	let mult = new Decimal(1);
	for (let id = 0; id < player.nanites.ups.length; id++) {
		if (player.nanites.ups[id].bought && (player.nanites.ups[id].mult[0].includes(tier) || player.nanites.ups[id].mult[0].includes(8))) {
			mult = mult.mul(player.nanites.ups[id].mult[1]);
		}
	}
	return mult;
}

function updateUINaniteUps() {
	document.getElementById("nanites_tabbtn").style.display = player.unlocked.naniteUps || player.unlocked.meltdown ? "inline-block" : "none";

	document.getElementById("nanites").innerText = notation(player.nanites.nanites);

	document.getElementById("nanite_upcost0").innerText = player.nanites.ups[0].cost.neq(1) ? (player.nanites.ups[0].cost + " Nanites") : "1 Nanite";
	document.getElementById("nanite_up0").className = player.nanites.ups[0].buyable ? "naniteup buy" : "naniteup locked";

	for (let i = 1; i < player.nanites.ups.length; i++) {
		if (player.nanites.ups[i].id != 31) {
			document.getElementById("nanite_upmult" + player.nanites.ups[i].id).innerText = notation(player.nanites.ups[i].mult[1]);
		}
		document.getElementById("nanite_up" + player.nanites.ups[i].id).className = player.nanites.ups[i].bought == 1 ? "naniteup bought" : player.nanites.ups[i].buyable ? "naniteup buy" : "naniteup locked";
	}
}
