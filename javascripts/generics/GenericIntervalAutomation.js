class GenericIntervalAutomation extends GenericAutomation {
	constructor(interval) {
		super();
		this.interval = interval;
		this.cooldown = 0;
	}

	automate(tickInterval = 50) {
		if (this.active) {
			if (this.cooldown >= this.interval) {
				this.cooldown -= this.interval;
				this.cooldown += tickInterval;
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}

class GenericIntervalActionAutomation extends GenericActionAutomation {
	constructor(action, interval) {
		super(action);
		this.interval = interval;
		this.cooldown = 0;
	}

	automate(tickInterval = 50) {
		if (this.active) {
			if (this.cooldown >= this.interval) {
				this.cooldown -= this.interval;
				this.cooldown += tickInterval;
				this.action();
			} else {
				this.cooldown += tickInterval;
			}
		}
	}
}
