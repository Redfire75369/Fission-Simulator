function velocity(depth) {
	let totalVel = 1;
	for (let i = 0; i < depth; i++) {
		if (player.turbine.rotors[i].length > 0) {
			totalVel *= player.turbine.rotors[i].velocity;
		}
	}
	return totalVel;
}

function totalVelocity() {
	let totalVel = 1;
	for (let i = 0; i < player.turbine.dimensions; i++) {
		if (player.turbine.rotors[i].length > 0) {
			totalVel *= player.turbine.rotors[i].velocity;
		}
	}
	return totalVel;
}

function idealExpansion(depth) {
	return Decimal.pow(8, (depth + 0.5) / player.turbine.dimensions);
}
function expansion(depth) {
	let totalExpansion = 1;
	for (let i = 0; i < depth; i++) {
		if (player.turbine.rotors[i].length > 0) {
			totalExpansion *= player.turbine.rotors[i].expansion;
		}
	}
	return Decimal.sqrt(player.turbine.rotors[depth].expansion).mul(totalExpansion);
}

function totalExpansion() {
	let totalExp = 1;
	for (let i = 0; i < player.turbine.dimensions; i++) {
		if (player.turbine.rotors[i].length > 0) {
			totalExp *= player.turbine.rotors[i].expansion;
		}
	}
	return new Decimal(totalExp);
}
function expansionIdeality(ideal, actual) {
	if (ideal.lte(0) || actual.lte(0)) {
		return 0;
	}
	return ideal.lt(actual) ? ideal.div(actual) : actual.div(ideal);
}

function rotorEfficiency() {
	let rotorEff = 0;
	let rotorCount = 0;
	for (let i = 0; i < player.turbine.dimensions; i++) {
		if (player.turbine.rotors[i].length > 0) {
			rotorEff += player.turbine.rotors[i].totalEff * expansionIdeality(idealExpansion(i), expansion(i));
			rotorCount++;
		}
	}
	return rotorCount == 0 ? zero : new Decimal(rotorEff).div(rotorCount);
}
