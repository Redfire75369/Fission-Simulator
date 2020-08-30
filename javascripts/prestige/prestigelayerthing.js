function prestigeResets() {
	resetEnergy();
	resetMines();
	resetTRISOFuels();
	resetPebblebedFissionReactors();
}

function canPrestige() {
	return player.prestige.americium > 1;
}

function buyPrestige() {
	if (canPrestige()) {
		player.prestige.americium = 0;
		player.prestige.prestiges++;
		player.researchPoints += 1;
		respecResearch();
		prestigeResets();
		player.unlocked.prestige = true;
		if (player.prestige.prestiges === 1) {
			showNaviTab("prestige_tab");
		}
	}
}
