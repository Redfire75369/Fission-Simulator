const achs = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

function checkAchievementCompletion() {
	player.achievements[11] |= player.mines[0].amount.gte(1);
	player.achievements[12] |= player.energy.gte(1e3);
	player.achievements[13] |= false;
	player.achievements[14] |= player.nucleosynthesis >=1;
	player.achievements[15] |= false;
	player.achievements[16] |= player.mines[7].amount.gte(1); 
	player.achievements[17] |= false;
	player.achievements[18] |= player.nanites.total.gte(1);
	player.achievements[21] |= false;
	player.achievements[22] |= player.nucleosynthesis >= 8;
	player.achievements[23] |= false; 
	player.achievements[24] |= player.nanites.nanites.gte(8);
	player.achievements[25] |= false; 
	player.achievements[26] |= false;
	player.achievements[27] |= false; 
	player.achievements[28] |= player.unlocked.meltdown;
}

function updateUIAchievements() {
	for (let i = 0; i < achs.length; i++) {
		document.getElementById("ach" + achs[i]).className = player.achievements[achs[i]] ? "achcomplete" : "achlocked";
	}
}