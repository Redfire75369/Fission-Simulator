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


