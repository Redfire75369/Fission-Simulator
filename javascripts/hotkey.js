for (let tier = 0; tier < 3; tier++) {
	Mousetrap.bind((tier+1).toString(), function() {
		player.reactors.pebblebeds[tier].buyMax();
	});
	Mousetrap.bind("m + " + (tier + 1).toString(), function() {
		if (tier >= player.mines.tier + 1) {
			player.reactors.pebblebeds[tier].mineFuel();
		}
	});
	Mousetrap.bind("l + " + (tier + 1).toString(), function() {
		if (player.mines.tier + 1 > tier) {
			player.reactors.pebblebeds[tier].loadFuel();
		}
	});
	Mousetrap.bind("e + " + (tier + 1).toString(), function() {
		player.reactors.pebblebeds[tier].ejectWaste();
	});
}
