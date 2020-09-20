function checkAchievementCompletion() {
	player.achievements[11] |= player.reactors.pebblebeds[0].bought > 0;
	player.achievements[12] |= player.mines.tier > 0;
	player.achievements[13] |= reprocessing[0];
	player.achievements[14] |= player.reactors.pebblebeds[1].totalCapacity.gt(2500);
	player.achievements[15] |= false;
	player.achievements[16] |= false;
	player.achievements[17] |= false;
	player.achievements[18] |= false;
	player.achievements[21] |= false;
	player.achievements[22] |= false;
	player.achievements[23] |= false;
	player.achievements[24] |= false;
	player.achievements[25] |= false;
	player.achievements[26] |= false;
	player.achievements[27] |= false;
	player.achievements[28] |= false;
}
