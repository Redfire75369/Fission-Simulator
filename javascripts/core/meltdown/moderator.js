//const moderators = ["Water", "Graphite"];

function getLimit() {
	if (player.moderator < 32) {
		return infinity.pow(Decimal.pow(2, player.moderator));
	}
	return new Decimal(Infinity);
}
