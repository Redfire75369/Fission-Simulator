function simulatePebblebedAutomation(tickInterval = 50) {
	for (let i = 0; i < 3; i++) {
		player.automation.reactors.pebblebeds.buy[i].automate(tickInterval);
		player.automation.reactors.pebblebeds.fuel[i].automate(tickInterval);
	}
}
