function getSaveString() {
	return btoa(JSON.stringify(player));
}

function getSave() {
	return localStorage.getItem("fissionSimSave1");
}
function saveGame() {
	try {
		localStorage.setItem("fissionSimSave1", getSaveString());
	} catch(err) {
		console.log(err);
		console.log("Game failed to save");
	}
}

function loadSave(save, imported = false) {
	try {
		if (save === undefined) {
			save = localStorage.getItem("fissionSimSave1");
		}
		
		save = JSON.parse(atob(save));
		let diffVer = ((getDefaultData().version.release != save.version.release) && (getDefaultData().version.beta != save.version.beta) && (getDefaultData().version.alpha != save.version.alpha));
		let diffProp = false;
		for (let i = 0, keys = Object.keys(getDefaultData()), ii = keys.length; i < ii; i++) {
			if (keys[i] != Object.keys(save)[i]) {
				diffProp = true;
			}
		}
		if (diffProp && diffVer && imported) {
			if (!confirm("Your imported save seems to be missing some values, which means importing this save might be destructive, if you have made a backup of your current save and are sure about importing this save please press OK, if not, press cancel and the save will not be imported.")) {
				return;
			}
		}
		for (let i = 0, keys = Object.keys(getDefaultData()), ii = keys.length; i < ii; i++) {
			if (typeof getDefaultData()[keys[i]] == "object" && !(getDefaultData()[keys[i]] instanceof Decimal)) {
				for (let j = 0, keys2 = Object.keys(getDefaultData()[keys[i]]), jj = keys2.length; j < jj; j++) {
					if (getDefaultData()[keys[i]][keys2[j]] instanceof Array) {
						for (let k = 0; k < getDefaultData()[keys[i]][keys2[j]].length; k++) {
							if (getDefaultData()[keys[i]][keys2[j]][k] instanceof Decimal) {
								player[keys[i]][keys2[j]][k] = new Decimal(save[keys[i]][keys2[j]][k]);
							} else {
								player[keys[i]][keys2[j]][k] = save[keys[i]][keys2[j]][k];
							}
						}
					} else if (getDefaultData()[keys[i]][keys2[j]] instanceof Decimal) {
						player[keys[i]][keys2[j]] = new Decimal(save[keys[i]][keys2[j]]);
					} else {
						player[keys[i]][keys2[j]] = save[keys[i]][keys2[j]];
					}
				}
			} else if (getDefaultData()[keys[i]] instanceof Array) {
				for (let j = 0; j < getDefaultData()[keys[i]].length; j++){
					if (getDefaultData()[keys[i]][j] instanceof Decimal) {
						player[keys[i]][j] = new Decimal(save[keys[i]][j]);
					} else {
						player[keys[i]][j] = save[keys[i]][j];
					}
				}
			} else {
				if (getDefaultData()[keys[i]] instanceof Decimal) {
					player[keys[i]] = new Decimal(save[keys[i]]);
				} else {
					player[keys[i]] = save[keys[i]];
				}
			}
		}
		if (imported) {
			alert("Save imported successfully.");
		} else {
			console.log("Save succesfully loaded");
		}
	} catch(err) {
		console.log(err);
		if (imported) {
			alert("Error: Imported save is in invalid format, please make sure you've copied the save correctly and isn't just typing gibberish.");
		} else {
			console.log("The save didn't load.");
		}
	}
}
