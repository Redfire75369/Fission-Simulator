function rot(s, i) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
    });
}

function getSaveString() {
	return LZString.compressToBase64(JSON.stringify(player));
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
			save = getSave();
		}
		if (save.startsWith("ey")) {
			save = JSON.parse(atob(save));
		} else {
			save = JSON.parse(LZString.decompressFromBase64(save));
		}
			
		for (let i = 0, keys = Object.keys(getDefaultData()), ii = keys.length; i < ii; i++) {
			let key = keys[i];
			if (typeof getDefaultData()[key] == "object" && !(getDefaultData()[key] instanceof Decimal) && !(getDefaultData()[key] instanceof Array)) {
				for (let j = 0, keys2 = Object.keys(getDefaultData()[key]), jj = keys2.length; j < jj; j++) {
					let key2= keys2[j];
					
					if (typeof getDefaultData()[key][key2] == "object" && !(getDefaultData()[key][key2] instanceof Decimal) && !(getDefaultData()[key][key2] instanceof Array)) {
						for (let k = 0, keys3 = Object.keys(getDefaultData()[key][key2]), kk = keys3.length; k < kk; k++) {							
							let key3 = keys3[k];
							
							checkAssign(getDefaultData()[key][key2][key3], save[key][key2][key3], key, key2, key3);
						}
					} else {
						checkAssign(getDefaultData()[key][key2], save[key][key2], key, key2);
					}
				}
			} else {
				checkAssign(getDefaultData()[key], save[key], key);
			}
		}
		
		if (imported) {
			alert("Save imported successfully.");
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

function checkAssign(check, assignFrom, assignToKey1, assignToKey2, assignToKey3, assignToKey4, assignToKey5) {
	if (assignFrom !== undefined) {
		if (assignToKey5 !== undefined) {
			if (check instanceof Decimal) {
				player[assignToKey1][assignToKey2][assignToKey3][assignToKey5] = new Decimal(assignFrom);
			} else {
				player[assignToKey1][assignToKey2][assignToKey3][assignToKey5] = assignFrom;
			}
		} else if (assignToKey4 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < check.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, assignToKey4, x);
				}
			} else if (check instanceof Decimal) {
				player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = new Decimal(assignFrom);
			} else {
				player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = assignFrom;
			}
		} else if (assignToKey3 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < check.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, x);
				}
			} else if (check instanceof Decimal) {
				player[assignToKey1][assignToKey2][assignToKey3] = new Decimal(assignFrom);
			} else {
				player[assignToKey1][assignToKey2][assignToKey3] = assignFrom;
			}
		} else if (assignToKey2 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < check.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, x);
				}
			} else if (check instanceof Decimal) {
				player[assignToKey1][assignToKey2] = new Decimal(assignFrom);
			} else {
				player[assignToKey1][assignToKey2] = assignFrom;
			}
		} else if (assignToKey1 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < check.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, x);
				}
			} else if (check instanceof Decimal) {
				player[assignToKey1] = new Decimal(assignFrom);
			} else {
				player[assignToKey1] = assignFrom;
			}
		}
	} else {
		if (assignToKey5 !== undefined) {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey5] = getDefaultData()[assignToKey1][assignToKey2][assignToKey3][assignToKey4][assignToKey5];
		} else if (assignToKey4 !== undefined) {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = getDefaultData()[assignToKey1][assignToKey2][assignToKey3][assignToKey4];
		} else if (assignToKey3 !== undefined) {
			player[assignToKey1][assignToKey2][assignToKey3] = getDefaultData()[assignToKey1][assignToKey2][assignToKey3];
		} else if (assignToKey2 !== undefined) {
			player[assignToKey1][assignToKey2] = getDefaultData()[assignToKey1][assignToKey2];
		} else if (assignToKey1 !== undefined) {
			player[assignToKey1] = getDefaultData()[assignToKey1];
		}
	}
}