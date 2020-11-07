/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

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
			}
			this.cooldown += tickInterval;
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
				this.action();
			}
			this.cooldown += tickInterval;
		}
	}
}
