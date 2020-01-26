function notation(x) {
	switch(player.notation) {
		case "scientific":
			return scientific(x);
			break;
		case "logarithm":
			return logarithm(x);
			break;
		default:
	}
}

/*Notations*/
function scientific(x) {
	if (x.exponent < 4) {
		return x
	} else if (x.mantissa > 9.995) {
		return 1 + "e" + (x.exponent + 1);
	} else if (x.mantissa < 9.995) {
		return round(x.mantissa, 2)+ "e" + x.exponent;
	}
}

function logarithm(x) {
	if (x.exponent < 4) {
		return x;
	} else {
		return "e" + (round(x.exponent + Math.log(x.mantissa, 10), 2));
	}
}