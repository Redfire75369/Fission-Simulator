class PebblebedFuelAutomation extends GenericIntervalActionAutomation {
	constructor(interval, tier) {
		super(function() {
			player.reactors.pebblebeds[tier].ejectWaste();
			player.reactors.pebblebeds[tier].loadFuel();
		}, interval);
		this.tier = tier;
	}
}
