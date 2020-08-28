function assignResearch(type) {
	player.researches[type] = player.researches[type].add(1);
	player.researchPoints = player.researchPoints.sub(1);
}

function assignPercentageResearch(type, percentage) {
	let researching = player.researchPoints.mul(percentage).div(100).floor();
	player.researches[type] = player.researches[type].add(researching);
	player.researchPoints = player.researchPoints.sub(researching);
}

function toggleRespecResearch() {
	player.respecOnPrestige = !player.respecOnPrestige;
}

function respecResearch() {
	if (player.respecOnPrestige) {
		for (let i = 0; i < 4; i++) {
			player.researchPoints = player.researchPoints.add(player.researches[i]);
		}
	}
}