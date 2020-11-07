/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function prestigeGoal() {
	if (player.prestige.prestiges === 0) {
		return new Decimal("2.5e2");
	}
	return Decimal.mul("1.25e2", Decimal.pow(9.1 * (player.prestige.prestiges + 1), 1.75));
}

function prestigeResets() {
	resetEnergy();
	resetMines();
	resetTRISOFuels();
	resetPebblebedFissionReactors();
}

function buyPrestige() {
	player.prestige.prestiges++;
	player.prestige.researchPoints += 1;
	respecResearch();
	prestigeResets();
	player.unlocked.prestige = true;
	if (player.prestige.prestiges === 1) {
		showNaviTab("prestige_tab");
	}
}
