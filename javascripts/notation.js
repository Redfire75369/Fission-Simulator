function notation(x) {
	switch(player.options.notation) {
		case "Scientific":
			return scientific(x);
			break;
		case "Logarithmic":
			return logarithm(x);
			break;
		case "Engineering":
			return engineering(x);
			break;
		case "Standard":
			return standard(x);
		case "YesNo":
			return yesNo(x);
		default:
	}
}

/*Notations*/
function scientific(x) {
	if (x.exponent < 3) {
		return round(x, 2);
	} else if (x.mantissa > 9.995) {
		return 1 + "e" + (x.exponent + 1);
	} else if (x.mantissa < 9.995) {
		return round(x.mantissa, 2) + "e" + x.exponent;
	}
}

function logarithm(x) {
	if (x.exponent < 3) {
		return round(x, 2);
	} else {
		return "e" + (round(x.exponent + Math.log(x.mantissa, 10), 2));
	}
}

function engineering(x) {
	if (x.exponent < 3) {
		return round(x, 2);
	} else {
		switch(x.exponent % 3) {
			case 0:
				return round(x.mantissa, 2) + "e" + x.exponent;
				break;
			case 1:
				return round(x.mantissa * 10, 2) + "e" + (x.exponent - 1);
				break;
			case 2:
				return round(x.mantissa * 100, 2) + "e" + (x.exponent - 2);
				break;
			default:
		}
	}
}

function standard(x) {
	let basic = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc"];
	let advanced = [
		["", "U", "D", "T", "Qa", "Qt", "Sx", "Sp", "O", "N"],
		["", "Dc", "Vg", "Tg", "Qd", "Qi", "Se", "St", "Og", "Nn"],
		["", "Ce", "Dn", "Tc", "Qe", "Qu", "Sc", "Si", "Oe", "Ne"]
	];
	if (x.exponent < 3) {
		return round(x, 2);
	} else if (x.exponent < 36) {
		switch(x.exponent % 3) {
			case 0:
				return round(x.mantissa, 2) + " " + basic[x.exponent / 3 - 1];
				break;
			case 1:
				return round(x.mantissa * 10, 2) + " " + basic[(x.exponent - 1) / 3 - 1];
				break;
			case 2:
				return round(x.mantissa * 100, 2) + " " + basic[(x. exponent - 2) / 3 - 1];
				break;
			default:
		}
	} else {
		let exp = Math.floor(x.exponent / 3) - 1;
		suffix = advanced[0][exp % 10] + advanced[1][(exp % 100 - exp % 10) / 10] + advanced[2][(exp - (exp % 100)) / 100]; 
		switch(x.exponent % 3) {
			case 0:
				return round(x.mantissa, 2) + " " + suffix;
				break;
			case 1:
				return round(x.mantissa * 10, 2) + " " + suffix;
				break;
			case 2:
				return round(x.mantissa * 100, 2) + " " + suffix;
				break;
			default:
		}
	}
}

function yesNo(x) {
	if (player.fuel ==0) {
		return "No";
	} else {
		return "Yes";
	}
}