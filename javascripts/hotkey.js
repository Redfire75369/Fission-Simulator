for (let tier = 0; tier < 3; tier++) {
	Mousetrap.bind((tier+1).toString(), function() {
		player.reactors.pebblebeds[tier].buyMax();
	});
	Mousetrap.bind("m + " + (tier+1).toString(), function() {
		player.reactors.pebblebeds[tier].mineFuel();
	});
	Mousetrap.bind("e + " + (tier+1).toString(), function() {
		player.reactors.pebblebeds[tier].ejectWaste();
	});
}
