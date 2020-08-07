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