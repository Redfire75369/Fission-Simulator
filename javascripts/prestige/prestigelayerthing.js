function prestigeResets() {
	resetEnergy();
	resetMines();
	resetTRISOFuels();
	resetPebblebedFissionReactors();
}

function canPrestige() {
	return player.americium.gte(prestigeGoal());
}

function buyPrestige() {
	if (canPrestige()) {
		player.researchPoints = player.researchPoints.add(1);
		respecResearch();
		prestigeResets();
	}
}
