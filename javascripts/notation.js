const not = ADNotations;
const not2 = ADCommunityNotations;

const scientific = new not.ScientificNotation();
const logarithmic = new not.LogarithmNotation();
const brackets = new not.BracketsNotation();
const omega = new not2.OmegaNotation();
const cancer = new not.CancerNotation();
const zalgo = new not.ZalgoNotation();
const prime = new not.PrimeNotation();
const blind = new not.BlindNotation();

function notation(x) {
	switch (player.options.notation) {
		case "Scientific":
			return scientific.format(x, 2, 2);
		case "Logarithmic":
			return logarithmic.format(x, 2, 2);
		case "Brackets":
			return brackets.format(x, 2, 2);
		case "Omega":
			return omega.format(x, 2, 2);
		case "Cancer":
			return cancer.format(x, 2, 2);
		case "Zalgo":
			return zalgo.format(x, 2, 2);
		case "Prime":
			return prime.format(x, 2, 2);
		case "Blind":
			return blind.format(x, 2, 2)
		default:
	}
}

function formatTime(time) {
	if (time <= 100) return (time/10).toFixed(3) + " seconds"
	time = Decimal.floor(time / 10)
	
	if (time >= 31536000) {
		return Decimal.floor(time / 31536000) + " years, " + Decimal.floor((time % 31536000) / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
	} else if (time >= 86400) {
		return Decimal.floor(time / 86400) + " days, " + Decimal.floor((time % 86400) / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
	} else if (time >= 3600) {
		return Decimal.floor(time / 3600) + " hours, " + Decimal.floor((time % 3600) / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
	} else if (time >= 60) {
		return Decimal.floor(time / 60) + " minutes, and " + Decimal.floor(time % 60) + " seconds"
	} else {
		return Decimal.floor(time % 60) + " seconds"
	} 
}
formatTime();