class TurbineBlade {
	constructor(name, eff = 1, exp = 1.1, speed = 0.8) {
		this.name = name;
		this.length = 0;
		this.efficiency = eff;
		this.expansion = exp;
		this.speed = speed;
	}

	get totalEff() {
		return pow(4 * this.length, 2) * this.efficiency;
	}

	lengthen() {
		if (this.length < (player.turbine.dimensions - player.turbine.bearingDimensions) / 2 && player.turbine.totalRotors[player.turbine.activeRotor] >= usedRotors() + 4 * player.turbine.bearingDimensions) {
			this.length++;
		}
	}
	shorten() {
		if (this.length > 0) {
			this.length--;
		}
	}
}

class DynamoCoil {
	constructor(name, eff = 1) {
		this.name = name;
		this.efficiency = eff;
	}
}

const rotorCosts = {
	steel: [4, 2],
	titanium: [6, 4],
	osmiridium: [8, 6],
	extreme: [12, 8],
	sicsiccmc: [16, 12]
}
const rotorLevels = {
	steel: 1,
	titanium: 2,
	osmiridium: 3,
	extreme: 4,
	sicsiccmc: 5
};
const rotors = {
	none: new TurbineBlade("none", 0, 1, 1),
	stator: new TurbineBlade("stator", 0, 0.6, 2.4),
	steel: new TurbineBlade("steel", 1, 1.4, 0.8),
	titanium: new TurbineBlade("titanium", 1.8, 1.65, 0.7),
	osmiridium: new TurbineBlade("osmiridium", 2.4, 2, 0.6),
	extreme: new TurbineBlade("extreme", 3, 2.5, 0.5),
	sicsiccmc: new TurbineBlade("sicsiccmc", 3.9, 3.2, 0.35)
};
const coils = {
	none: new DynamoCoil("none", 1),
	bearing: new DynamoCoil("bearing", 1),
	connector: new DynamoCoil("connector", 1),
	magnesium: new DynamoCoil("magnesium", 1.4),
	beryllium: new DynamoCoil("beryllium", 2.1),
	lithium: new DynamoCoil("lithium", 3.6),
	aluminium: new DynamoCoil("aluminium", 2.9),
	gold: new DynamoCoil("gold", 4),
	copper: new DynamoCoil("copper", 4.8),
	silver: new DynamoCoil("silver", 6)
};

const rotorDisplayNames = {
	none: "No Rotor",
	stator: "Stator",
	steel: "Steel Rotor",
	titanium: "Titanium Rotor",
	osmiridium: "Osmiridium Rotor",
	extreme: "Extreme Rotor",
	sicsiccmc: "SiC SiC CMC Rotor"
};

var activeCoils = [
	[false, false, false],
	[false, true, false],
	[false, false, false]
];

function selectRotor(rotor) {
	document.getElementById("turbine_rotor_" + player.turbine.activeRotor).parentElement.className = "tooltip turbinebox";
	document.getElementById("turbine_rotor_" + rotor).parentElement.className = "tooltip turbinebox selected";
	player.turbine.activeRotor = rotor;
}
function setRotor(shaftPos) {
	if (player.turbine.totalRotors[player.turbine.activeRotor] >= usedRotors() + 4 * player.turbine.bearingDimensions) {
		let rotor = rotors[player.turbine.activeRotor];
		player.turbine.rotors[shaftPos] = new TurbineBlade(rotor.name, rotor.efficiency, rotor.expansion, rotor.speed);
		player.turbine.rotors[shaftPos].length++;
	}
}

function usedRotors() {
	let current = 0;
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		if (player.turbine.rotors[i - 1].name == player.turbine.activeRotor) {
			current += 4 * player.turbine.rotors[i - 1].length * player.turbine.bearingDimensions;
		}
	}
	return current;
}

function getRotorCost() {
	return Decimal.pow(10, rotorCosts[player.turbine.activeRotor][0] + rotorCosts[player.turbine.activeRotor][1] * (player.turbine.totalRotors[player.turbine.activeRotor] - getDefaultRotors()[player.turbine.activeRotor]));
}
function canBuyRotor() {
	return player.energy.gte(getRotorCost());
}
function buyRotor() {
	if (canBuyRotor()) {
		player.energy = player.energy.sub(getRotorCost());
		player.turbine.totalRotors[player.turbine.activeRotor]++;
	}
}

function getFourRotorsCost() {
	return Decimal.pow(10, rotorCosts[player.turbine.activeRotor][0] + rotorCosts[player.turbine.activeRotor][1] * (player.turbine.totalRotors[player.turbine.activeRotor] - (getDefaultRotors()[player.turbine.activeRotor] - 3)));
}
function canBuyFourRotors() {
	return player.energy.gte(getFourRotorsCost());
}
function buyFourRotors() {
	if (canBuyFourRotors()) {
		player.energy = player.energy.sub(getFourRotorsCost());
		player.turbine.totalRotors[player.turbine.activeRotor] += 4;
	}
}

function getDefaultRotors() {
	return {
		steel: 4 + 2 * max(0, player.nucleosynthesis),
		titanium: 2 * max(0, player.nucleosynthesis - 2),
		osmiridium: 2 * max(0, player.nucleosynthesis - 4),
		extreme: 2 * max(0, player.nucleosynthesis - 6),
		sicsiccmc: 2 * max(0, player.nucleosynthesis - 8)
	}
}

function resetTurbineRotors() {
	drawTurbineRotors(true);
	player.turbine.totalRotors = getDefaultRotors();
	selectRotor(getDefaultData().turbine.activeRotor);
}

function showCoils() {
	document.getElementById("turbine_coils_popup").style.display = "block";
}
function hideCoils() {
	document.getElementById("turbine_coils_popup").style.display = "none";
}

function selectCoil(coil) {
	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col tooltip turbinebox turbinecoil " + player.turbine.activeCoil;
	document.getElementById("turbine_coil_" + coil).className = "flex__col tooltip turbinebox turbinecoil selected " + coil;
	player.turbine.activeCoil = coil;
}
function setCoil(x, y) {
	if (player.turbine.coils[y][x] != "bearing") {
		player.turbine.coils[y][x] = player.turbine.activeCoil;
		activeDynamoCoils();
	}
}
function removeCoil(x, y) {
	if (player.turbine.coils[y][x] != "bearing") {
		player.turbine.coils[y][x] = "none";
		activeDynamoCoils();
	}
}

function resetDynamoCoils() {
	drawBearing(player.turbine.bearingDimensions);
	drawDynamoCoils(true);
	selectCoil(getDefaultData().turbine.activeCoil);
}

function getTotalCoilEff() {
	let ret = new Decimal(1);
	for (let x = 0; x < player.turbine.coils.length; x++) {
		for (let y = 0; y < player.turbine.coils[x].length; y++) {
			if (activeCoils[y][x]) {
				ret = ret.mul(coils[player.turbine.coils[y][x]].efficiency);
			}
		}
	}
	return ret.max(1);
}

function activeDynamoCoils() {
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			switch (player.turbine.coils[j - 1][i - 1]) {
				case "bearing":
					activeCoils[j - 1][i - 1] = true;
					break;
				case "connector":
					activeCoils[j - 1][i - 1] = atLeast(1, "magnesium", i - 1, j - 1) || atLeast(1, "beryllium", i - 1, j - 1) || atLeast(1, "lithium", i - 1, j - 1) || atLeast(1, "aluminium", i - 1, j - 1) || atLeast(1, "gold", i - 1, j - 1) || atLeast(1, "copper", i - 1, j - 1) || atLeast(1, "silver", i - 1, j - 1);
					break;
				case "magnesium":
					activeCoils[j - 1][i - 1] = atLeast(1, "bearing", i - 1, j - 1) || atLeast(1, "connector", i - 1, j - 1);
					break;
				case "beryllium":
					activeCoils[j - 1][i - 1] = atLeast(1, "magnesium", i - 1, j - 1);
					break;
				case "lithium":
					activeCoils[j - 1][i - 1] = atLeast(1, "beryllium", i - 1, j - 1) && (atLeast(1, "bearing", i - 1, j - 1) || atLeast(1, "connector", i - 1, j - 1));
					break;
				case "aluminium":
					activeCoils[j - 1][i - 1] = atLeast(2, "beryllium", i - 1, j - 1);
					break;
				case "gold":
					activeCoils[j - 1][i - 1] = atLeast(1, "aluminium", i - 1, j - 1);
					break;
				case "copper":
					activeCoils[j - 1][i - 1] = atLeast(1, "lithium", i - 1, j - 1);
					break;
				case "silver":
					activeCoils[j - 1][i - 1] = atLeast(1, "copper", i - 1, j - 1) && atLeast(1, "gold", i - 1, j - 1);
					break;
				default:
					activeCoils[j - 1][i - 1] = false;
			}
		}
	}
}

function getHorizontalCoils(x, y) {
	if (x == 0 && y == 0) {
		return {
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		};
	} else if (x == 0 && y == player.turbine.dimensions - 1) {
		return {
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1]
		};
	} else if (x == player.turbine.dimensions - 1 && y == 0) {
		return {
			0: player.turbine.coils[y][x - 1],
			3: player.turbine.coils[y + 1][x]
		}
	} else if (x == player.turbine.dimensions - 1 && y == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x]
		}
	} else if (x == 0) {
		return {
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		}
	} else if (y == 0) {
		return {
			0: player.turbine.coils[y][x - 1],
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		}
	} else if (x == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x],
			3: player.turbine.coils[y + 1][x]
		}
	} else if (y == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1]
		};
	} else {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		}
	}
}

function keyIntoActivation(key, x, y) {
	if (key === undefined) {
		return false;
	}
	switch (key.toString()) {
		case "0":
			return activeCoils[y][x - 1];
		case "1":
			return activeCoils[y - 1][x];
		case "2":
			return activeCoils[y][x + 1];
		case "3":
			return activeCoils[y + 1][x];
		default:
			return false;
	}
}

function atLeast(amount, type, x, y) {
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	let bool = true;
	let activated = true;
	let key = 4;
	for (let i = 0; i < min(4, amount); i++) {
		key = Object.keys(adjacent).filter(key => adjacent[key] == type)[0];
		bool &= adjacent[key] == type;
		activated &= keyIntoActivation(key, x, y);
		for (let j = 0; j < 4 && !keyIntoActivation(key, x, y); j++) {
			adjacent[key] = undefined;
			key = Object.keys(adjacent).filter(key => adjacent[key] == type)[0];
			bool &= adjacent[key] == type;
			activated = keyIntoActivation(key, x, y);
		}
		adjacent[key] = undefined;
	}
	return bool && activated;
}

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
	let rotorCount = 0
	for (let i = 0; i < player.turbine.dimensions; i++) {
		if (player.turbine.rotors[i].length > 0) {
			rotorEff += player.turbine.rotors[i].totalEff * expansionIdeality(idealExpansion(i), expansion(i));
			rotorCount++;
		}
	}
	return rotorCount == 0 ? zero : new Decimal(rotorEff).div(rotorCount);
}

function resetTurbine() {
	player.turbine = getDefaultData().turbine;
	resetTurbineRotors();
	resetDynamoCoils();
}

function simulateTurbine(tickInterval = 50) {
	activeDynamoCoils();

	let speed = getTotalSteamGain();
	let energy = zero;
	for (let i = 0; i < player.turbine.rotors.length; i++) {
		if (player.turbine.rotors[i].totalEff > 0) {
			speed = speed.mul(player.turbine.rotors[i].speed);
			energy = energy.add(speed.pow(1.5));
		}
	}
	let gain = energy.mul(getTotalCoilEff()).mul(rotorEfficiency()).mul(expansionIdeality(idealExpansion(player.turbine.dimensions), totalExpansion()));

	document.getElementById("turbine_steam").innerText = gain == 0 ? "Generating no energy as the turbine contains no rotors" : "Processing " + notation(getTotalSteamGain()) + " L/s of Steam";
	document.getElementById("energy_gain").innerText = notation(gain);

	player.energy = player.energy.add(gain.mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.add(gain.mul(tickInterval / 1000));
}

function updateUITurbineRotors() {
	document.getElementById("turbine_rotoreff").innerText = notation(rotorEfficiency().mul(100));
	document.getElementById("turbine_totalexp").innerText = notation(totalExpansion());

	document.getElementById("turbine_rotors_count").style.display = player.turbine.activeRotor == "none" ? "none" : "block";
	document.getElementById("turbine_rotors_total").innerText = player.turbine.totalRotors[player.turbine.activeRotor] + " " + rotorDisplayNames[player.turbine.activeRotor] + "s";
	document.getElementById("turbine_rotors_current").innerText = usedRotors();

	document.getElementById("buy_rotor").style.display = player.turbine.activeRotor == "none" ? "none" : "block";
	document.getElementById("buy_rotor").className = canBuyRotor() ? "storebtn buy" : "storebtn locked";
	document.getElementById("rotor_type").innerText = rotorDisplayNames[player.turbine.activeRotor];
	document.getElementById("rotor_cost").innerText = notation(getRotorCost());

	document.getElementById("buy_four_rotor").style.display = player.turbine.activeRotor == "none" ? "none" : "block";
	document.getElementById("buy_four_rotor").className = canBuyFourRotors() ? "storebtn buy" : "storebtn locked";
	document.getElementById("rotor_four_type").innerText = rotorDisplayNames[player.turbine.activeRotor] + "s";
	document.getElementById("rotor_four_cost").innerText = notation(getFourRotorsCost());

	document.getElementById("turbine_rotor_titanium").parentElement.style.display = player.nucleosynthesis > 1 ? "block" : "none";
	document.getElementById("turbine_rotor_osmiridium").parentElement.style.display = player.nucleosynthesis > 3 ? "block" : "none";
	document.getElementById("turbine_rotor_extreme").parentElement.style.display = player.nucleosynthesis > 5 ? "block" : "none";
	document.getElementById("turbine_rotor_sicsiccmc").parentElement.style.display = player.nucleosynthesis > 7 ? "block" : "none";

	let start = player.turbine.dimensions % 2 == 0 ? player.turbine.dimensions / 2 - (player.turbine.bearingDimensions / 2) + 1 : (player.turbine.dimensions + 1) / 2 - (player.turbine.bearingDimensions + 1) / 2 + 1;
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		let rotorStart = start - player.turbine.rotors[i - 1].length;

		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			if (j >= start && j < start + player.turbine.bearingDimensions) {
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("class", "flex__row turbine turbinebox rotorbox turbineshaft");
				if (player.turbine.rotors[i - 1].length >= 1) {
					document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor " + player.turbine.rotors[i - 1].name);
				} else {
					document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor");
				}
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("onclick", "setRotor(" + (i - 1)+ ")");
			} else {
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox rotorbox");
				if (j >= rotorStart && j < start + player.turbine.bearingDimensions + player.turbine.rotors[i - 1].length) {
					if (j == rotorStart) {
						document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal top " + player.turbine.rotors[i - 1].name);
					} else if (j == start + player.turbine.bearingDimensions + player.turbine.rotors[i - 1].length - 1) {
						document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal bottom " + player.turbine.rotors[i - 1].name);
					} else {
						document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal " + player.turbine.rotors[i - 1].name);
					}
				} else {
					document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor horizontal");
				}
			}
		}
	}
}

function updateUIDynamoCoils() {
	if (player.unlocked.coils || player.unlocked.naniteUps || player.unlocked.meltdown) {
		document.getElementById("show_coils").style.display = "block";
	} else {
		document.getElementById("show_coils").style.display = "none";
	}

	document.getElementById("turbine_coil_efficiency").innerText = notation(getTotalCoilEff());

	document.getElementById("turbine_coil_beryllium").style.display = player.nucleosynthesis > 1 ? "block" : "none";
	document.getElementById("turbine_coil_lithium").style.display = player.nucleosynthesis > 2 ? "block" : "none";
	document.getElementById("turbine_coil_aluminium").style.display = player.nucleosynthesis > 3 ? "block" : "none";
	document.getElementById("turbine_coil_gold").style.display = player.nucleosynthesis > 4 ? "block" : "none";
	document.getElementById("turbine_coil_copper").style.display = player.nucleosynthesis > 5 ? "block" : "none";
	document.getElementById("turbine_coil_connector").style.display = player.nucleosynthesis > 6 ? "block" : "none";
	document.getElementById("turbine_coil_silver").style.display = player.nucleosynthesis > 7 ? "block" : "none";

	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			if (player.turbine.coils[j - 1][i - 1] != "none" && player.turbine.coils[j - 1][i - 1] != "bearing") {
				if (activeCoils[j - 1][i - 1]) {
					document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row tooltip turbinebox turbinecoil active " + player.turbine.coils[j - 1][i - 1]);
				} else  {
					document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row tooltip turbinebox turbinecoil inactive " + player.turbine.coils[j - 1][i - 1]);
				}
			} else {
				document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row tooltip turbinebox turbinecoil " + player.turbine.coils[j - 1][i - 1]);
			}
		}
	}
}

function newTurbine() {
	drawTurbineRotors(true, true);
	drawDynamoCoils(true, true);
	drawBearing(player.turbine.bearingDimensions);
}
