let naniteUpgradeCost = [new Decimal(2)];

function canBuyNaniteUpgrade(num) {
	return (player.nanites.gte(naniteUpgradeCost[num]));
}

function buyNaniteUpgrade(num) {
	if (canBuyNaniteUpgrade(num)) {
		player.nanites = player.nanites.minus(naniteUpgradeCost[num]);
		player.naniteUpg[num] = true;
	}
}