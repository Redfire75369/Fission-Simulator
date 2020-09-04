function assignResearch(type) {
	if (player.prestige.researchPoints >= 1) {
		player.prestige.researches[type]++;
		player.prestige.researchPoints--;
	}
}

function assignPercentageResearch(type, percentage) {
	let researching = floor(player.prestige.researchPoints * percentage / 100);
	player.prestige.researches[type] += researching;
	player.prestige.researchPoints -= researching;
}

function toggleRespecResearch() {
	player.prestige.respec = !player.prestige.respec;
}

function respecResearch() {
	if (player.prestige.respec) {
		for (let i = 0; i < 4; i++) {
			player.prestige.researchPoints += player.prestige.researches[i] - 1;
			player.prestige.researches[i] = 1;
		}
	}
}
