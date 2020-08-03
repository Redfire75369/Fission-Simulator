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

		if (save.version.beta < 5 || (save.version.beta == 5 && save.version.alpha < 8)) {
			alert("Your save is from a much older version and is thus, incompatible with the current version. Your save has been cleared.");
			localStorage.removeItem("fissionSimSave1");
			save = JSON.parse(LZString.decompressFromBase64(LZString.compressToBase64(JSON.stringify(getDefaultData()))));
		}

		if (save !== undefined) {
			for (let i = 0, keys = Object.keys(getDefaultData()), ii = keys.length; i < ii; i++) {
				let key = keys[i];

				if (typeof getDefaultData()[key] == "object" && checkObj(getDefaultData()[key])) {
					for (let j = 0, keys2 = Object.keys(getDefaultData()[key]), jj = keys2.length; j < jj; j++) {
						let key2= keys2[j];

						if (typeof getDefaultData()[key][key2] == "object" && checkObj(getDefaultData()[key][key2])) {
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

			if (!player.navigation.naviTab.includes("_tab")) {
				player.navigation.naviTab = player.navigation.naviTab + "_tab";
			}
			if (!player.navigation.production.includes("_subtab")) {
				player.navigation.production = player.navigation.production + "_subtab";
			}

			if (!player.navigation.production.includes("resources")) {
				player.navigation.production = "fuel_subtab";
			}

			player.version = getDefaultData().version;

		} else {
			console.log("No existing save found");
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
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey4][assignToKey5] = objectify(assignFrom, getDefaultData()[assignToKey1][assignToKey2][assignToKey3][assignToKey4][assignToKey5]);
		} else if (assignToKey4 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < assignFrom.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, assignToKey4, x);
				}
			} else {
				player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = objectify(assignFrom, getDefaultData()[assignToKey1][assignToKey2][assignToKey3][assignToKey4]);
			}
		} else if (assignToKey3 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < assignFrom.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, x);
				}
			} else {
				player[assignToKey1][assignToKey2][assignToKey3] = objectify(assignFrom, getDefaultData()[assignToKey1][assignToKey2][assignToKey3]);
			}
		} else if (assignToKey2 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < assignFrom.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, x);
				}
			} else {
				player[assignToKey1][assignToKey2] = objectify(assignFrom, getDefaultData()[assignToKey1][assignToKey2]);
			}
		} else if (assignToKey1 !== undefined) {
			if (check instanceof Array) {
				for (let x = 0; x < assignFrom.length; x++){
					checkAssign(check[x], assignFrom[x], assignToKey1, x);
				}
			} else {
				player[assignToKey1] = objectify(assignFrom, getDefaultData()[assignToKey1]);
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

function checkObj(obj) {
	return !(obj instanceof Decimal) && !(obj instanceof Array) && !(obj instanceof Mine) && !(obj instanceof Reactor) && !(obj instanceof Efficiency);
}

function objectify(x, type) {
	if (type instanceof Decimal) {
		return new Decimal(x);
	} else if (type instanceof Mine) {
		let ret = new Mine(type.startCost.log10(), type.scaleCost.log10());
		ret.amount = new Decimal(x.amount);
		ret.bought = x.bought;
		return ret;
	} else if (type instanceof Reactor) {
		let ret = new Reactor(type.startCost.log10(), type.scaleCost.log10());
		ret.amount = new Decimal(x.amount);
		ret.bought = x.bought;
		ret.enabled = x.enabled;
		return ret;
	} else if (type instanceof TurbineBlade) {
		let ret = new TurbineBlade(x.name, x.efficiency, x.expansion, x.speed);
		ret.length = x.length;
		return ret;
	} else if (type instanceof Efficiency) {
		let ret = new Efficiency(type.startCost, type.scaleCost);
		ret.bought = x.bought;
		return ret;
	} else if (type instanceof EfficiencyNaniteUpgrade) {
		let ret = new EfficiencyNaniteUpgrade();
		ret.bought = x.bought;
		return ret;
	} else if (type instanceof NaniteUpgrade) {
		let ret = new NaniteUpgrade(type.id, type.startCost, type.tiers, type.scaleCost);
		ret.bought = x.bought;
		return ret;
	} else if (type instanceof MeltdownUpgrade) {
		let ret = new MeltdownUpgrade(type.id, type.startCost, type.tiers, type.scaleCost);
		ret.bought = x.bought;
		return ret;
	} else {
		return x;
	}
}
