class MineAutomation extends GenericIntervalAutomation {
	constructor(tier, interval) {
		super(interval);
		this.tier = tier;
	}

	automate(tickInterval = 50) {
		if (this.active) {
			if (this.cooldown >= this.interval) {
				this.cooldown -= this.interval;
				this.cooldown += tickInterval;
				player.mines[this.tier].buyMax();
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}

class ReactorAutomation extends GenericIntervalAutomation {
	constructor(tier, interval) {
		super(interval);
		this.tier = tier;
	}

	automate(tickInterval = 50) {
		if (this.active) {
			if (this.cooldown >= this.interval) {
				this.cooldown -= this.interval;
				this.cooldown += tickInterval;
				player.reactors[tier].buyMax();
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}

class EfficiencyAutomation extends GenericIntervalAutomation {
	constructor(interval) {
		super(interval);
	}

	automate(tickInterval = 50) {
		if (this.active) {
			if (this.cooldown >= this.interval) {
				this.cooldown -= this.interval;
				this.cooldown += tickInterval;
				player.eff.buyMax();
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}

function simulateAutomation(tickInterval = 50) {
	for (let i = 0; i < 8; i++) {
		player.automation.mines[i].automate(tickInterval);
		player.automation.reactors[i].automate(tickInterval);
	}
	player.automation.efficiency[i].automate(tickInterval);
}

function updateUIAutomation() {
}