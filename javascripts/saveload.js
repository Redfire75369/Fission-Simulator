function getSaveString() {
	return btoa(JSON.stringify(player));
}

function getSave() {
	localStorage.getItem("fissionSimSave1");
}
function saveGame() {
	try {
		localStorage.setItem("fissionSimSave1", getSaveString());
		console.log("Game saved.")
	} catch(err) {
		console.log(err);
		console.log("Game failed to save");
	}
}

function loadSave(save) {
	try {
		if (save === undefined) {
			save = localStorage.getItem("fissionSimSave1");
		}
		save = JSON.parse(atob(save));
		
		for (let i = 0, keys = Object.keys(getDefault()), ii = keys.length; i < ii; i++) {
			if (typeof getDefault()[keys[i]] == "object" && !(getDefault()[keys[i]] instanceof Decimal)) {
				for (let j = 0, keys2 = Object.keys(getDefault()[keys[i]]), jj = keys2.length; j < jj; j++) {
					if (getDefault()[keys[i]][keys2[j]] instanceof Array) {
						for (let k = 0; k < getDefault()[keys[i]][keys2[j]].length; k++) {
							if (getDefault()[keys[i]][keys2[j]][k] instanceof Decimal) {
								player[keys[i]][keys2[j]][k] = new Decimal(save[keys[i]][keys2[j]][k]);
							} else {
								player[keys[i]][keys2[j]][k] = save[keys[i]][keys2[j]][k];
							}
						}
					} else if (getDefault()[keys[i]][keys2[j]] instanceof Decimal) {
						player[keys[i]][keys2[j]] = new Decimal(save[keys[i]][keys2[j]]);
					} else {
						player[keys[i]][keys2[j]] = save[keys[i]][keys2[j]];
					}
				}
			} else if (getDefault()[keys[i]] instanceof Array) {
				for (let j = 0; j < getDefault()[keys[i]].length; j++){
					if (getDefault()[keys[i]][j] instanceof Decimal) {
						player[keys[i]][j] = new Decimal(save[keys[i]][j]);
					} else {
						player[keys[i]][j] = save[keys[i]][j];
					}
				}
			} else {
				if (getDefault()[keys[i]] instanceof Decimal) {
					player[keys[i]] = new Decimal(save[keys[i]]);
				} else {
					player[keys[i]] = save[keys[i]];
				}
			}
		}
		console.log("Save succesfully loaded");
	} catch(err) {
		console.log(err);
		console.log("Save failed to load");
	}
}
