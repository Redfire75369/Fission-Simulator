/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*function rot(s, i) {
	return s.replace(/[a-zA-Z]/g, function (c) {
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
	});
}*/

function getSaveString() {
	return LZString.compressToBase64(JSON.stringify(player));
}

function getSave() {
	return localStorage.getItem("FissionSimulatorSave1");
}
function saveGame() {
	try {
		localStorage.setItem("FissionSimulatorSave1", getSaveString());
	} catch(err) {
		console.log("Saving Error:");
		console.error(err);
	}
}

function loadSave(save, imported = false) {
	try {
		if (typeof save !== "string") {
			save = getSave();
			if (save == null) {
				console.log("No existing save found");
				player = getDefaultData();
				return;
			}
		}
		save.trim();

		if (save.startsWith("ey")) {
			save = JSON.parse(atob(save));
		} else {
			save = JSON.parse(LZString.decompressFromBase64(save));
		}

		if (save.version.beta < 6 || (save.version.beta === 6 && save.version.alpha < 12)) {
			if (imported) {
				alert("The imported save is from a much older version and is thus, incompatible with the current version. The save has not been imported.");
				return;
			}
			alert("Your save is from a much older version and is thus, incompatible with the current version. Your save has been cleared.");
			localStorage.removeItem("fissionSimSave1");
			player = getDefaultData();
			return;
		}

		checkAssign(getDefaultData(), save, []);

		if (typeof player.options.notation === "string") {
			player.options.notation = notations.indexOf(player.options.notation);
		}
		if (typeof player.options.theme === "string") {
			player.options.theme = themes.indexOf(player.options.theme);
		}
		player.version = getDefaultData().version;

		if (imported) {
			alert("Save imported successfully.");
		}
	} catch(err) {
		if (imported) {
			console.log("Save Import Error:");
			alert("Error: Imported save is in an invalid format, please make sure you've copied the save correctly and aren't just typing gibberish.");
		} else {
			console.log("Save Loading Error:");
			alert("The game has encountered a fatal error while loading. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
			alert("--DEBUG Information--\n" + err.stack);
		}
		console.error(err);
	}
}

function checkAssign(check, item, keys = []) {
	if (item !== undefined) {
		if (check.constructor.name === "Array") {
			for (let i = 0; i < item.length; i++) {
				checkAssign(check[i], item[i], keys.concat([i]));
			}
		} else if (check.constructor.name === "Object") {
			for (let i = 0, ii = Object.keys(check); i < ii.length; i++) {
				checkAssign(check[ii[i]], item[ii[i]], keys.concat([ii[i]]));
			}
		} else {
			let output = player;
			let type = getDefaultData();
			for (let i = 0; i < keys.length - 1; i++) {
				output = output[keys[i]];
				type = type[keys[i]];
			}
			output[keys[keys.length - 1]] = objectify(item, type[keys[keys.length - 1]]);
			/*if (keys.includes("turbine") && keys.includes("rotors")) {
				output[keys[keys.length - 1]] = objectify(item, rotors.none);
			}*/
		}
	} else {
		let output = player;
		let def = getDefaultData();
		for (let i = 0; i < keys.length - 1; i++) {
			output = output[keys[i]];
			def = def[keys[i]];
		}
		output[keys[keys.length - 1]] = def[keys[keys.length - 1]];
	}
}

function objectify(obj, type) {
	if (type.constructor.name === "Decimal") {
		return new Decimal(obj);
	} else if (type.constructor.name === "TRISOFuel") {
		let ret = new TRISOFuel(type.tier);
		ret.enriched = new Decimal(obj.enriched);
		ret.depleted = new Decimal(obj.depleted);
		return ret;
	} else if (type.constructor.name === "Mines") {
		let ret = new Mines();
		ret.tier = obj.tier;
		ret.amount = new Decimal(obj.amount);
		ret.depleted = new Decimal(obj.depleted);
		ret.depletion = new Decimal(obj.depletion);
		ret.ratio = obj.ratio;
		return ret;
	} else if (type.constructor.name === "PebblebedFissionReactor") {
		let ret = new PebblebedFissionReactor(type.tier, type.startCost.log10(), type.scaleCost.log10());
		ret.amount = new Decimal(obj.amount);
		ret.bought = obj.bought;
		ret.fuel = new Decimal(obj.fuel);
		ret.spent = new Decimal(obj.spent);
		return ret;
	/* } else if (type instanceof TurbineBlade) {
		let ret = new TurbineBlade(obj.name, obj.efficiency, obj.eobjpansion, obj.speed);
		ret.length = obj.length;
		return ret; */
	} else if (type.constructor.name === "TurbineNaniteUpgrade") {
		let ret = new TurbineNaniteUpgrade();
		ret.bought = obj.bought;
		return ret;
	} else if (type.constructor.name === "NaniteUpgrade") {
		let ret = new NaniteUpgrade(type.id, type.startCost, type.tiers, type.scaleCost);
		ret.bought = obj.bought;
		return ret;
	} else if (type.constructor.name === "MeltdownUpgrade") {
		let ret = new MeltdownUpgrade(type.id, type.startCost, type.tiers, type.scaleCost);
		ret.bought = obj.bought;
		return ret;
	} else if (type.constructor.name === "PebblebedBuyAutomation") {
		let ret = new PebblebedBuyAutomation(obj.interval, type.tier);
		ret.cooldown = obj.cooldown;
		ret.active = obj.active;
		return ret;
	} else if (type.constructor.name === "PebblebedFuelAutomation") {
		let ret = new PebblebedFuelAutomation(obj.interval, type.tier);
		ret.cooldown = obj.cooldown;
		ret.active = obj.active;
		return ret;
	} else if (type.constructor.name === "TRISOReprocessAutomation") {
		let ret = new TRISOReprocessAutomation(obj.interval, type.tier);
		ret.cooldown = obj.cooldown;
		ret.active = obj.active;
		return ret;
	}
	return obj;
}
