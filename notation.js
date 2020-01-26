function notation(x) {
	switch(player.options.notation) {
		case "Scientific":
			return scientific(x);
			break;
		case "Logarithmic":
			return logarithm(x);
			break;
		default:
	}
}

/*Notations*/
function scientific(x) {
	if (x.exponent < 4) {
		return round(x, 2)
	} else if (x.mantissa > 9.995) {
		return 1 + "e" + (x.exponent + 1);
	} else if (x.mantissa < 9.995) {
		return round(x.mantissa, 2)+ "e" + x.exponent;
	}
}

function logarithm(x) {
	if (x.exponent < 4) {
		return round(x, 2);
	} else {
		return (round(x.exponent + Math.log(x.mantissa, 10), 2));
	}
}