const achs = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

const achTexts = [
	"Is this 2D Minecraft? Buy an Iron-Tipped Drill Mine.",
	"I have the power inside. Obtain 1000J of Energy.",
	"<Suggest Ideas in the Discord Server>",
	"WIP. Nucleosynthesise for the first time.",
	"<Suggest Ideas in the Discord Server>",
	"All the Elements. Unlock all 8 Reactors.",
	"<Suggest Ideas in the Discord Server>",
	"Nanomachines, Son. Obtain 1 Nanite.",
	"<Suggest Ideas in the Discord Server>",
	"The Power of a Dying Star. Nucleosynthesise 8 Times.",
	"<Suggest Ideas in the Discord Server>",
	"WIP. Obtain 1.00e12 Energy.",
	"They harden in response to physical trauma! Obtain 8 Nanites.",
	"<Suggest Ideas in the Discord Server>",
	"WIP. Buy all Nanite Upgrades",
	"To Infinity and Beyond! Meltdown for the first time."
];

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
		if (!player.achievements[achs[i]]) {
			document.getElementById("ach" + achs[i]).removeAttribute("achpopupcomplete");
			document.getElementById("ach" + achs[i]).setAttribute("achpopuplocked", achTexts[i]);
		} else {
			document.getElementById("ach" + achs[i]).removeAttribute("achpopuplocked");
			document.getElementById("ach" + achs[i]).setAttribute("achpopupcomplete", achTexts[i]);
		}
	}
}
