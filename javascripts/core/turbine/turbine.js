class TurbineBlade {
	constructor(name, eff = 1, exp = 1.1, speed = 0.8) {
		this.name = name;
		this.length = 0;
		this.efficiency = eff;
		this.expansion = exp;
		this.speed = speed;
	}

	get totalEff() {
		return pow(4 * this.efficiency, 2);
	}

	lengthen() {
		let current = 0;
		for (let i = 1; i < player.turbine.dimensions + 1; i++) {
			if (player.turbine.rotors[i - 1].name == player.turbine.activeRotor) {
				current += 4 * player.turbine.rotors[i - 1].length * player.turbine.bearingDimensions;
			}
		}
		if (this.length < (player.turbine.dimensions - player.turbine.bearingDimensions) / 2 && player.turbine.totalRotors[player.turbine.activeRotor] >= current + 4 * player.turbine.bearingDimensions) {
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
	none: [0, 0],
	steel: [4, 2]
}
const rotors = {
	none: new TurbineBlade("none", 0, 1, 1),
	stator: new TurbineBlade("stator", 0, 0.6, 2.4),
	steel: new TurbineBlade("steel", 1, 1.1, 0.8)
};
const coils = {
	none: new DynamoCoil("none", 1),
	bearing: new DynamoCoil("bearing", 1),
	magnesium: new DynamoCoil("magnesium", 1.4),
	beryllium: new DynamoCoil("beryllium", 2.1),
	lithium: new DynamoCoil("lithium", 3),
	aluminium: new DynamoCoil("aluminium", 3.2)
};

var activeCoils = [
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, true, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false],
	[false, false, false, false, false, false, false, false, false]
];

function getHorizontalCoils(x, y) {
	if (x == 0 && y == 0) {
		return [player.turbine.coils[x][y + 1], player.turbine.coils[x + 1][y]];
	} else if (x == 0 && y == player.turbine.dimensions) {
		return [player.turbine.coils[x][y - 1], player.turbine.coils[x + 1][y]];
	} else if (x == player.turbine.dimensions && y == 0) {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y + 1]];
	} else if (x == player.turbine.dimensions && y == player.turbine.dimensions) {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y - 1]]; 
	} else if (x == 0) {
		return [player.turbine.coils[x][y - 1], player.turbine.coils[x][y + 1], player.turbine.coils[x + 1][y]];
	} else if (y == 0) {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y + 1], player.turbine.coils[x + 1][y]];
	} else if (x == player.turbine.dimensions) {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y - 1], player.turbine.coils[x][y + 1]];
	} else if (y == player.turbine.dimensions) {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y - 1], player.turbine.coils[x + 1][y]];
	} else {
		return [player.turbine.coils[x - 1][y], player.turbine.coils[x][y - 1], player.turbine.coils[x][y + 1], player.turbine.coils[x + 1][y]];
	}
}

function selectRotor(rotor) {
	document.getElementById("rotor_" + player.turbine.activeRotor).parentElement.className = "turbinebox";
	document.getElementById("rotor_" + rotor).parentElement.className = "turbinebox selected";
	player.turbine.activeRotor = rotor;
}

function setRotor(shaftPos) {
	let current = 0;
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		if (player.turbine.rotors[i - 1].name == player.turbine.activeRotor) {
			current += 4 * player.turbine.rotors[i - 1].length * player.turbine.bearingDimensions;
		}
	}
	if (this.length < (player.turbine.dimensions - player.turbine.bearingDimensions) / 2 && player.turbine.totalRotors[player.turbine.activeRotor] >= current + 4 * player.turbine.bearingDimensions) {
		player.turbine.rotors[shaftPos] = rotors[player.turbine.activeRotor];
		player.turbine.rotors[shaftPos].lengthen();
	}
}

function canBuyRotor() {
	return player.energy.gte(Decimal.pow(10, rotorCosts[player.turbine.activeRotor][0] + rotorCosts[player.turbine.activeRotor][0] * (player.turbine.totalRotors[player.turbine.activeRotor] - 4)));
}
function buyRotor() {
	if (canBuyRotor()) {
		player.energy = player.energy.sub(Decimal.pow(10, rotorCosts[player.turbine.activeRotor][0] + rotorCosts[player.turbine.activeRotor][1] * (player.turbine.totalRotors[player.turbine.activeRotor] - 4)));
		player.turbine.totalRotors[player.turbine.activeRotor]++;
	}
}

function resetTurbineRotors() {
	drawTurbineRotors(true);
	player.turbine.totalRotors = getDefaultData().turbine.totalRotors;
}

function showCoils() {
	document.getElementById("turbine_coils_popup").style.display = "block";
}
function hideCoils() {
	document.getElementById("turbine_coils_popup").style.display = "none";
}

function selectCoil(coil) {
	document.getElementById("turbine_coil_" + player.turbine.activeCoil).className = "flex__col turbinebox turbinecoil " + player.turbine.activeCoil;
	document.getElementById("turbine_coil_" + coil).className = "flex__col turbinebox turbinecoil selected " + coil;
	document.getElementById("turbine_coil_desc_" + player.turbine.activeCoil).style.display = "none";
	document.getElementById("turbine_coil_desc_" + coil).style.display = "block";
	player.turbine.activeCoil = coil;
}

function setCoil(x, y) {
	if (player.turbine.coils[x][y] != "bearing") {
		player.turbine.coils[x][y] = player.turbine.activeCoil;
		activeDynamoCoils();
	}
}

function getTotalCoilEff() {
	let ret = new Decimal(1);
	for (let x = 0; x < player.turbine.coils.length; x++) {
		for (let y = 0; y < player.turbine.coils[x].length; y++) {
			ret = ret.mul(coils[player.turbine.coils[x][y]].efficiency);
		}
	}
	return ret.max(1);
}

function activeDynamoCoils() {
	for (let x = 0; x < player.turbine.coils.length; x++) {
		for (let y = 0; y < player.turbine.coils[x].length; y++) {
			switch (player.turbine.coils[x][y]) {
				case "bearing":
					if (x == 4 && y == 4) {
						activeCoils[x][y] = true;
					} else {
						activeCoils[x][y] = false;
					}
					break;
				case "magnesium":
					if (getHorizontalCoils(x, y).includes("bearing")) {
						activeCoils[x][y] = true;
					} else {
						activeCoils[x][y] = false;
					}
					break;
				case "beryllium":
					if (getHorizontalCoils(x, y).includes("magnesium")) {
						activeCoils[x][y] = true;
					} else {
						activeCoils[x][y] = false;
					}
					break;
				case "lithium":
					if (getHorizontalCoils(x, y).includes("beryllium") && getHorizontalCoils(x, y).includes("bearing")) {
						activeCoils[x][y] = true;
					} else {
						activeCoils[x][y] = false;
					}
					break;
				case "aluminium":
					let coils = getHorizontalCoils(x, y);
					if (coils.includes("beryllium")) {
						coils.splice(coils.findIndex(p == "beryllium"), 1);
						if (coils.contains("beryllium")) {
							activeCoils[x][y] = true;
						} else {
							activeCoils[x][y] = false;
						}
					} else {
						activeCoils[x][y] = false;
					}
					break;
				default:
					activeCoils[x][y] = false;
			}
		}
	}
}

function simulateTurbine(tickInterval = 50) {
	let speed = new Decimal(1);
	let vol = getTotalSteamGain();
	let exp = new Decimal(1);
	let energy = zero;
	for (let i = 0; i < player.turbine.rotors.length; i++) {
		let rotor = player.turbine.rotors[i];
		speed = speed.mul(rotor.speed);
		vol = vol.mul(rotor.expansion);
		exp = exp.mul(rotor.expansion);
		energy = energy.add(speed.pow(1.5).mul(vol).mul(rotor.totalEff).mul(0.1));
	}
	let gain = energy.mul(exp.max(1)).mul(getTotalCoilEff());
	document.getElementById("steam").innerText = gain == 0 ? 0 : notation(getTotalSteamGain());
	document.getElementById("energy_gain").innerText = notation(gain);
	player.energy = player.energy.add(gain.mul(tickInterval / 1000));
	player.totalEnergy = player.totalEnergy.add(gain.mul(tickInterval / 1000));
}

function updateUITurbineRotors() {
	document.getElementById("turbine_rotors_count").style.display = player.turbine.activeRotor == "none" ? "none" : "block";
	document.getElementById("turbine_rotors_total").innerText = player.turbine.totalRotors[player.turbine.activeRotor] + " " + player.turbine.activeRotor.charAt(0).toUpperCase() + player.turbine.activeRotor.substring(1).toLowerCase();;
	document.getElementById("buy_rotor").style.display = player.turbine.activeRotor == "none" ? "none" : "block";
	document.getElementById("buy_rotor").className = canBuyRotor() ? "storebtn buy" : "storebtn locked";
	document.getElementById("rotor_type").innerText = player.turbine.activeRotor.charAt(0).toUpperCase() + player.turbine.activeRotor.substring(1).toLowerCase();

	let start = player.turbine.dimensions % 2 == 0 ? player.turbine.dimensions / 2 - (player.turbine.bearingDimensions / 2) + 1 : (player.turbine.dimensions + 1) / 2 - (player.turbine.bearingDimensions + 1) / 2 + 1;
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		let rotorStart = start - player.turbine.rotors[i - 1].length;
		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			if (j >= start && j < start + player.turbine.bearingDimensions) {
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox turbineshaft");
				if (player.turbine.rotors[i - 1].length >= 1) {
					document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor " + player.turbine.rotors[i - 1].name);
				} else {
					document.getElementById("turbine_rotors_row_" + j + "_" + i).children[0].setAttribute("class", "turbinerotor");
				}
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("onclick", "setRotor(" + (i - 1)+ ")");
			} else {
				document.getElementById("turbine_rotors_row_" + j + "_" + i).setAttribute("class", "flex__row turbinebox");
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
		//document.getElementById("turbine_coils_popup").style.display = "block";
	} else {
		document.getElementById("show_coils").style.display = "none";
		//document.getElementById("turbine_coils_popup").style.display = "none";
	}

	document.getElementById("turbine_coil_magnesium").style.display = player.nucleosynthesis > 0 ? "block" : "none";
	document.getElementById("turbine_coil_magnesium").style.display = player.nucleosynthesis > 1 ? "block" : "none";
	document.getElementById("turbine_coil_lithium").style.display = player.nucleosynthesis > 2 ? "block" : "none";
	document.getElementById("turbine_coil_aluminium").style.display = player.nucleosynthesis > 3 ? "block" : "none";

	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			if (coils[player.turbine.coils[i - 1][j - 1]].efficiency > 0) {
				if (activeCoils[i - 1][j - 1]) {
					document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil active " + player.turbine.coils[i - 1][j - 1]);
				} else  {
					document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil inactive " + player.turbine.coils[i - 1][j - 1]);
				}
			} else {
				document.getElementById("turbine_coils_row_" + j +"_" + i).setAttribute("class", "flex__row turbinebox turbinecoil " + player.turbine.coils[i - 1][j - 1]);
			}
		}
	}
}

function newTurbine() {
	drawTurbineRotors(true);
	drawBearing(player.turbine.dimensions % 2 + 5 % 3 + 1);
	drawDynamoCoils(true);
}