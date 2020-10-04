class PebblebedBuyAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.reactors.pebblebeds[tier].buy();
		}, interval);
		this.tier = tier;
	}
}
