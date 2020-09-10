class TRISOReprocessAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.fuels.triso[tier].reprocessDepleted();
		}, interval);
		this.tier = tier;
	}
}
