/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* Coil Placement */
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

/* Coil Actication */
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
		};
	} else if (x == player.turbine.dimensions - 1 && y == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x]
		};
	} else if (x == 0) {
		return {
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		};
	} else if (y == 0) {
		return {
			0: player.turbine.coils[y][x - 1],
			2: player.turbine.coils[y][x + 1],
			3: player.turbine.coils[y + 1][x]
		};
	} else if (x == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x],
			3: player.turbine.coils[y + 1][x]
		};
	} else if (y == player.turbine.dimensions - 1) {
		return {
			0: player.turbine.coils[y][x - 1],
			1: player.turbine.coils[y - 1][x],
			2: player.turbine.coils[y][x + 1]
		};
	}
	return {
		0: player.turbine.coils[y][x - 1],
		1: player.turbine.coils[y - 1][x],
		2: player.turbine.coils[y][x + 1],
		3: player.turbine.coils[y + 1][x]
	};
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

function atLeast(amount, requirement, x, y) {
	let activated = true;
	let count = 0;
	let adjacent = getHorizontalCoils(x, y);
	let keys = Object.keys(adjacent);
	if (requirement != "any") {
		keys = keys.filter(key => adjacent[key] == requirement);
	} else {
		keys = keys.filter(key => adjacent[key] != "none" && adjacent[key] != "bearing" && adjacent[key] != "connector");
	}

	for (let i = 0; i < keys.length; i++) {
		activated = keyIntoActivation(keys[i], x, y);
		if (activated) {
			count++;
		}
	}

	return count >= amount;
}
