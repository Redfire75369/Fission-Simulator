const moderators = ["Water", "Graphite"];

function getLimit() {
	if (player.moderator < 32) {
		return infinity.pow(Decimal.pow(2, player.moderator));
	} else {
		return new Decimal(Infinity);
	}
}

function buyModerator() {
	if (player.corium.gte()) {
		
	}
}