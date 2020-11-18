/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class MeltdownUpgrade extends GenericUpgrade {
	constructor(id, cost, tiers = 1, scale = 1) {
		super(new Decimal(cost), tiers, new Decimal(scale));
		this.id = id;
	}

	get buyable() {
		return player.meltdown.corium.gte(this.cost) && this.bought < this.tiers;
	}

	buy() {
		if (this.buyable) {
			player.meltdown.corium = player.meltdown.corium.sub(this.cost);
			this.bought++;
		}
	}

	get mult() {
		switch(this.id) {
			case 11:
				return [[8], Decimal.max(1, 1 + player.meltdown.amount / 2)];
			case 12:
				return [[8], player.reactors[7].amount.max(1)];
			case 13:
				return [[8], Decimal.max(1, Math.pow(player.meltdown.time / 1000, 0.3))];
			case 14:
				return [[8], Decimal.max(1, Math.pow((player.meltdown.time / 1000 + 1) / 1.8, 40 / (player.meltdown.time / 1000 +1)))];
			case 21:
				return [[8], player.meltdown.totalNanites.pow(1.3).max(1)];
			case 22:
				return [[8], Decimal.pow(player.meltdown.corium.add(3).log(3), 1.1).max(1)];
			default:
				return [[9], new Decimal(1)];
		}
	}
}

function resetMeltdownUps() {
	player.meltdown.ups = getDefaultData().meltdown.ups;
}

function getMeltdownUp41Mult(tier) {
	const start = 4 - player.meltdown.ups[12].bought;
	const end = 2 * player.meltdown.ups[12].bought - 1;
	if ((tier >= start && tier <= 3) || (tier <= end && tier >= 4)) {
		return Decimal.max(1, player.mines[tier].amount.add(player.reactors[tier].amount).log10() * tier);
	}
	return new Decimal(1);
}

function getTotalMeltdownUpMult(tier) {
	let ret = getMeltdownUp41Mult(tier);
	for (let id = 0; id < player.meltdown.ups.length; id++) {
		if (player.meltdown.ups[id].bought >= 1 && (player.meltdown.ups[id].mult[0].includes(tier) || player.meltdown.ups[id].mult[0].includes(8))) {
			ret = ret.mul(player.meltdown.ups[id].mult[1]);
		}
	}
	return ret;
}

function updateUIMeltdownUps() {
	document.getElementById("meltdown_tabbtn").style.display = player.unlocked.meltdown ? "inline-block" : "none";

	for (let i = 0; i < player.meltdown.ups.length; i++) {
		if (i <= 11) {
			if (i <= 7) {
				document.getElementById("meltdown_upmult" + player.meltdown.ups[i].id).innerText = notation(player.meltdown.ups[i].mult[1]);
			}
		} else {
			document.getElementById("meltdown_upcost" + player.meltdown.ups[i].id).innerText = notation(player.meltdown.ups[i].cost);
		}
		document.getElementById("meltdown_up" + player.meltdown.ups[i].id).className = player.meltdown.ups[i].bought === player.meltdown.ups[i].tiers ? "meltdownup bought" : player.meltdown.ups[i].buyable ? "meltdownup buy" : "meltdownup locked";
	}

	document.getElementById("meltdown_up41_text").innerText = player.meltdown.ups[12].bought === 4 ? "New to This Tier: Cf-251 Reactors and Laser Drill Mines Boost Th-229 Reactors and Iron-Tipped Drill Mines" : player.meltdown.ups[12].bought === 3 ? "New to This Tier: Bk-248 Reactors and Diamond-Tipped Drill Mines Boost U-235 Reactors and Steel-Tipped Drill Mines" : player.meltdown.ups[12].bought === 2 ? "New to This Tier: Cu-245 Reactors and Osmium-Tipped Drill Mines Boost Np-237 Reactors and Titanium-Tipped Drill Mines" : player.meltdown.ups[12].bought === 1 ? "New to This Tier: Am-242m Reactors and Tungstensteel-Tipped Drill Mines Boost Pu-237 Reactors and Iridium-Tipped Drill Mines" : "No effects currently";
	document.getElementById("meltdown_up42_text").innerText = player.meltdown.ups[13].bought === 4 ? "You gain 3 Corium and 3 Meltdown Stat every minute.": player.meltdown.ups[13].bought === 3 ? "You gain Corium and Meltdown Stat 12 times slower than your fastest meltdown." : player.meltdown.ups[13].bought === 2 ? "You gain Corium and Meltdown Stat based on the number of Meltdown Upgrades bought." : player.meltdown.ups[13].bought === 1 ? "You gain 1 Corium and Meltdown Stat every 30 minutes" : "No effects currently";
	document.getElementById("meltdown_up43_text").innerText = "You start Nanite Researches and Meltdowns with " + player.meltdown.ups[14].bought + " Nucleosynthesis";
	document.getElementById("meltdown_up44_text").innerText = player.meltdown.ups[15].bought === 4 ? "You keep all nanites and nanite upgrades on Meltdown." : player.meltdown.ups[15].bought === 3 ? "You keep total nanites on Meltdown." : player.meltdown.ups[15].bought === 2 ? "You start with nanites based on your corium(\(log_{2}(3c-3)-1.5\))" : player.meltdown.ups[15].bought === 1 ? "You start with 1 nanite." : "No effects currently";
}
