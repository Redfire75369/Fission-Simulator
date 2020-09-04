const notationFunctions = {
	"Scientific": new ADNotations.ScientificNotation(),
	"Logarithmic": new ADNotations.LogarithmNotation(),
	"Brackets": new ADNotations.BracketsNotation(),
	"Omega": new ADCommunityNotations.OmegaNotation(),
	"Imperial": new ADNotations.ImperialNotation(),
	"Cancer": new ADNotations.CancerNotation(),
	"Zalgo": new ADNotations.ZalgoNotation(),
	"Prime": new ADNotations.PrimeNotation(),
	"Blind": new ADNotations.BlindNotation(),
};

function notation(x, dp = 2, dpUnder1e5 = 2, showAboveInfinite = false) {
	if (Decimal.gte(x, getLimit()) && !showAboveInfinite) {
		return "Infinite";
	}
	if (Object.keys(notationFunctions).includes(player.options.notation)) {
		return notationFunctions[player.options.notation].format(x, dp, dpUnder1e5);
	}
	return "NaN";
}

function formatTime(time) {
	if (player.options.notation === "Blind") {
		return "";
	}
	if (time >= 31536000000) {
		return floor(time / 31536000000) + " years, " + floor((time % 31536000000) / 86400000) + " days, " + floor((time % 86400000) / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 86400000) {
		return floor(time / 86400000) + " days, " + floor((time % 86400000) / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 3600000) {
		return floor(time / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 60000) {
		return floor(time / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds";
	}
	return round(time / 1000, 3) + " seconds";
}
