function drawTurbineRotors(needRefresh) {
	if (player.turbine.dimensions < 3) {
		alert("Invalid Turbine Dimensions");
		return;
	}

	document.getElementById("turbine_rotors").innerHTML = "";
	document.getElementById("turbine_rotors_length").innerHTML = "";

	if (needRefresh) {
		player.turbine.rotors = [];
	}

	for (let i = 0; i < player.turbine.dimensions + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "turbine_rotors_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		document.getElementById("turbine_rotors").append(column);

		if (i > 0 && i < player.turbine.dimensions + 1) {
			if (needRefresh) {
				player.turbine.rotors[i - 1] = rotors["none"];
			}
			let length = document.createElement("DIV");
			length.setAttribute("id", "turbine_rotor_length_" + (i - 1));
			length.setAttribute("class", "flex__col turbine");
			let increase = document.createElement("BUTTON");
			increase.setAttribute("class", "flex__row turbinerotorlengthbtn");
			increase.setAttribute("onclick", "player.turbine.rotors[" + (i - 1) + "].lengthen()");
			increase.innerText = "▲";
			let decrease = document.createElement("BUTTON");
			decrease.setAttribute("class", "flex__row turbinerotorlengthbtn");
			decrease.setAttribute("onclick", "player.turbine.rotors[" + (i - 1) + "].shorten()");
			decrease.innerText = "▼";
			length.append(increase);
			length.append(decrease);
			document.getElementById("turbine_rotors_length").append(length);
		}
		for (let j = 0; j < player.turbine.dimensions + 2; j++) {
			let row = document.createElement("DIV");

			row.setAttribute("id", "turbine_rotors_row_" + j + "_" + i);
			if (!(j == 0 || j == player.turbine.dimensions + 1 || i == 0 || i == player.turbine.dimensions + 1)) {
				row.append(document.createElement("DIV"));
			} else {
				row.setAttribute("class", "flex__row turbinebox turbinecasing");
			}
			document.getElementById("turbine_rotors_col_" + i).append(row);
		}
	}
	updateUITurbineRotors();
}

function drawBearing(bearingDiameter) {
	if (player.turbine.dimensions % 2 != bearingDiameter % 2 || bearingDiameter + 2 > player.turbine.dimensions) {
		alert("Invalid Bearing Diameter");
		return;
	}
	player.turbine.bearingDimensions = bearingDiameter;
	let start = player.turbine.dimensions % 2 == 0 ? player.turbine.dimensions / 2 - (bearingDiameter / 2) + 1 : (player.turbine.dimensions + 1) / 2 - (bearingDiameter + 1) / 2 + 1;
	for (let i = 1; i < player.turbine.dimensions + 1; i++) {
		for (let j = 1; j < player.turbine.dimensions + 1; j++) {
			if (j >= start && j < start + bearingDiameter && i >= start && i < start + bearingDiameter) {
				player.turbine.coils[i - 1][j - 1] = "bearing";
			} else {
				player.turbine.coils[i - 1][j - 1] = "none";
			}
		}
	}
	activeDynamoCoils();
}

function drawDynamoCoils(needRefresh) {
	let start = player.turbine.dimensions % 2 == 0 ? player.turbine.dimensions / 2 - (player.turbine.bearingDimensions / 2) + 1 : (player.turbine.dimensions + 1) / 2 - (player.turbine.bearingDimensions + 1) / 2 + 1;
	document.getElementById("turbine_coils").innerHTML = "";
	if (needRefresh) {
		player.turbine.coils = [];
	}

	for (let i = 0; i < player.turbine.dimensions + 2; i++) {
		let column = document.createElement("DIV");
		column.setAttribute("id", "turbine_coils_col_" + i);
		column.setAttribute("class", "flex__col turbine");
		document.getElementById("turbine_coils").append(column);

		if (i > 0 && i < player.turbine.dimensions + 2 && needRefresh) {
			player.turbine.coils[i - 1] = [];
			activeCoils[i - 1] = [];
		}
		for (let j = 0; j < player.turbine.dimensions + 2; j++) {
			if (needRefresh) {
				if (j > 0 && j < player.turbine.dimensions + 1 && i > 0 && i < player.turbine.dimensions + 1) {
					player.turbine.coils[i - 1][j - 1] = "none";
					activeCoils[i - 1][j - 1] = false;
				}
				if ((player.turbine.dimensions % 2 == 0 && ((j == player.turbine.dimensions / 2 || j == (player.turbine.dimensions + 2) / 2)) && ((i == player.turbine.dimensions / 2 || i == (player.turbine.dimensions + 2) / 2))) || (player.turbine.dimensions % 2 == 1 && j == (player.turbine.dimensions + 1) / 2 && i == (player.turbine.dimensions + 1) /2)) {
					player.turbine.coils[i - 1][j - 1] = "bearing";
				}
			}

			let coil = document.createElement("DIV");

			coil.setAttribute("id", "turbine_coils_row_" + j + "_" + i);
			if (!(j == 0 || j == player.turbine.dimensions + 1 || i == 0 || i == player.turbine.dimensions + 1)) {
				if (j < start || j >= start + player.turbine.bearingDimensions || i < start || i >= start + player.turbine.bearingDimensions) {
					coil.setAttribute("onclick", "setCoil(" + (i - 1) + ", " + (j - 1) + ")");
				}
			} else {
				coil.setAttribute("class", "flex__row turbinebox turbinecasing coil");
			}
			document.getElementById("turbine_coils_col_" + i).append(coil);
		}
	}
}
