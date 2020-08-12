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
				player.reactors[this.tier].buyMax();
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}

function simulateAutomation(tickInterval = 50) {
	for (let i = 0; i < 8; i++) {
		player.automation.reactors[i].automate(tickInterval);
	}
}

function updateUIAutomation() {
}
