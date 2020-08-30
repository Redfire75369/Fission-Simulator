var gasCoolants = [
	[new Decimal(1.008)],
	[new Decimal(4.032)],
	[new Decimal(16.128)]
];

class GasCoolant {
	constructor(tier) {
		this.tier = tier;
	}
	
	get flowRate() {
		if (player.prestige.researches[1] === 0) {
			return zero;
		}
		return Decimal.pow(2.2, 3 + Decimal.log(player.prestige.researches[1], 1.4));
	}
	get heatCapacity() {
		return Decimal.mul(gasCoolants[this.tier][0], Decimal.pow(Decimal.log(player.prestige.researches[1] + 1, 1.2 + this.tier / 6), 2.4));
	}

	get cooling() {
		if (!player.unlocked.prestige) {
			return new Decimal(-1);
		}
		return player.reactors.pebblebeds[this.tier].mul(this.flowRate).mul(this.heatCapacity).pow(this.nobility.log(1 + (this.tier + 1) / 8) + 1));
	}
}

function netHeating