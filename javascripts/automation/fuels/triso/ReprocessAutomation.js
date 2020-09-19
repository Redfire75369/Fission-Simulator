class TRISOReprocessAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.fuels.triso[tier].reprocessDepleted();
		}, interval);
		this.tier = tier;
	}
}

function simulateTRISOAutomation(tickInterval = 50) {
	for (let i = 0; i < 3; i++) {
		player.automation.fuels.triso[i].automate(tickInterval);
	}
}
