const achs = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

function checkAchievementCompletion() {
	player.achievements[11] = player.achievements[11] ? true : player.mines[0].amount.gte(1);
	player.achievements[12] = player.achievements[12] ? true : player.energy.gte(1e3);
	player.achievements[13] = player.achievements[13] ? true : false;
	player.achievements[14] = player.achievements[14] ? true : player.nucleosynthesis >=1;
	player.achievements[15] = player.achievements[15] ? true : false;
	player.achievements[16] = player.achievements[16] ? true : player.mines[7].amount.gte(1); 
	player.achievements[17] = player.achievements[17] ? true : false;
	player.achievements[18] = player.achievements[18] ? true : player.nanites.total.gte(1);
	player.achievements[21] = player.achievements[21] ? true : false;
	player.achievements[22] = player.achievements[22] ? true : player.nucleosynthesis >= 8;
	player.achievements[23] = player.achievements[23] ? true : false; 
	player.achievements[24] = player.achievements[24] ? true : player.nanites.nanites.gte(8);
	player.achievements[25] = player.achievements[25] ? true : false; 
	player.achievements[26] = player.achievements[26] ? true : false;
	player.achievements[27] = player.achievements[27] ? true : false; 
	player.achievements[28] = player.achievements[28] ? true : player.unlocked.meltdown;
}

function updateUIAchievements() {
	for (let i = 0; i < achs.length; i++) {
		document.getElementById("ach" + achs[i]).className = player.achievements[achs[i]] ? "achcomplete" : "achlocked";
	}
}