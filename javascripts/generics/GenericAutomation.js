/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class GenericAutomation {
	constructor() {
		this.active = false;
	}

	toggle() {
		this.active = !this.active;
	}

	automate() {}
}

class GenericActionAutomation {
	constructor(action) {
		this.active = false;
		this.action = action;
	}

	toggle() {
		this.active = !this.active;
	}

	automate() {}
}
