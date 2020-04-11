const not = ADNotations;
const not2 = ADCommunityNotations;

const scientific = new not.ScientificNotation();
const logarithmic = new not.LogarithmNotation();
const brackets = new not.BracketsNotation();
const omega = new not2.OmegaNotation();
const imperial = new not.ImperialNotation();
const cancer = new not.CancerNotation();
const zalgo = new not.ZalgoNotation();
const prime = new not.PrimeNotation();
const blind = new not.BlindNotation();

function notation(x, dp = 2, dpUnder1e5 = 2, showAboveInfinite = false) {
	if (Decimal.gte(x, getLimit()) && !showAboveInfinite) {
		return "Infinite";
	}
	switch (player.options.notation) {
		case "Scientific":
			return scientific.format(x, dp, dpUnder1e5);
		case "Logarithmic":
			return logarithmic.format(x, dp, dpUnder1e5);
		case "Brackets":
			return brackets.format(x, dp, dpUnder1e5);
		case "Omega":
			return omega.format(x, dp, dpUnder1e5);
		case "Imperial":
			return imperial.format(x, dp, dpUnder1e5);
		case "Cancer":
			return cancer.format(x, dp, dpUnder1e5);
		case "Zalgo":
			return zalgo.format(x, dp, dpUnder1e5);
		case "Prime":
			return prime.format(x, dp, dpUnder1e5);
		case "Blind":
			return blind.format(x, dp, dpUnder1e5);
		default:
			return "NaN";
	}
}

function formatTime(time) {
	if (time >= 31536000000) {
		return floor(time / 31536000000) + " years, " + floor((time % 31536000000) / 86400000) + " days, " + floor((time % 86400000) / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds"
	} else if (time >= 86400000) {
		return floor(time / 86400000) + " days, " + floor((time % 86400000) / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds"
	} else if (time >= 3600000) {
		return floor(time / 3600000) + " hours, " + floor((time % 3600000) / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds"
	} else if (time >= 60000) {
		return floor(time / 60000) + " minutes, and " + floor(time % 60000 / 1000) + " seconds"
	} else {
		return round(time / 1000, 3) + " seconds"
	} 
}