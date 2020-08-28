function mineCoal() {
	player.coal = player.coal.add(1);
}

function buyCoalMine() {
	player.coalMines.bought++;
	player.coalMines.amount = player.coalMines.amount.add(1);
}

function upgradeCriticality() {
	player.coalGenerator.criticality += 0.4;
}