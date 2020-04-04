function checkAchievements() {
	player.achievements[11] = player.achievements[11] ? true : player.energy.gt(100);
	player.achievements[12] = player.achievements[12] ? true : player.energy.gt(1e10);
}

function updateUIAchievements() {
	
}