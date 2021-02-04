/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function get_save_string() {
	return LZString.compressToBase64(JSON.stringify(player));
}

function get_save() {
	// localStorage.setItem("FissionSimulatorSave1", "");
	return localStorage.getItem("FissionSimulatorSave1");
}
function save_game() {
	try {
		localStorage.setItem("FissionSimulatorSave1", get_save_string());
	} catch(err) {
		console.log("Saving Error:");
		console.error(err);
	}
}

function load_save(save, imported = false) {
	try {
		if (typeof save !== "string") {
			save = get_save();
			if (save == null && !imported) {
				console.debug("No existing save found");
				player = getDefaultData();
				return;
			}
		}
		save.trim();

		save = JSON.parse(LZString.decompressFromBase64(save));

		check_assign(getDefaultData(), save, []);

		player.version = getDefaultData().version;

		if (imported) {
			alert("Save imported successfully.");
		}
	} catch(err) {
		if (imported) {
			console.log("Save Import Error:");
			alert("Error: Imported save is in an invalid format, please make sure you've copied the save correctly and aren't just typing gibberish.");
		} else {
			console.log("Save Load Error:");
			alert("The game has encountered a fatal error while loading. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
			alert("--DEBUG Information--\n" + err.stack);
		}
		console.error(err);
	}
}

function check_assign(check, item, keys = []) {
	if (item !== undefined) {
		if (check.constructor.name === "Array") {
			for (let i = 0; i < item.length; i++) {
				check_assign(check[i], item[i], keys.concat([i]));
			}
		} else if (check.constructor.name === "Object") {
			for (let i = 0, ii = Object.keys(check); i < ii.length; i++) {
				check_assign(check[ii[i]], item[ii[i]], keys.concat([ii[i]]));
			}
		} else {
			let output = player;
			let type = getDefaultData();
			for (let i = 0; i < keys.length - 1; i++) {
				output = output[keys[i]];
				type = type[keys[i]];
			}
			output[keys[keys.length - 1]] = objectify(item, type[keys[keys.length - 1]]);
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
	} else if (type.constructor.name === "LightWaterFuel") {
		let ret = new LightWaterFuel();
		ret.regular = new Decimal(obj.regular);
		ret.enriched = new Decimal(obj.enriched);
		ret.enrichment = new Decimal(obj.enrichment);
		
		ret.mine = new LightWaterMine();
		ret.mine.bought = obj.mine.bought;
		return ret;
	} else if (type.constructor.name === "LightWaterReactor") {
		let ret = new LightWaterReactor();
		ret.fuel.amount = new Decimal(obj.fuel.amount);
		ret.fuel.enriched = new Decimal(obj.fuel.enriched);
		
		ret.bought = obj.bought;
		ret.amount = new Decimal(obj.amount);
		return ret;
	} else if (type.constructor.name === "LightWaterCentrifuge") {
		let ret = new LightWaterCentrifuge();
		ret.fuel = new Decimal(obj.fuel);
		ret.time = obj.time;
		
		ret.bought = obj.bought;
		return ret;
	}

	return obj;
}
