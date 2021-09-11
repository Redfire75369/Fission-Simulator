/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import Decimal from "break_infinity.js";
import {compressToBase64, decompressFromBase64} from "lz-string";

import LightWaterCentrifuge from "./core/centrifuges/light-water/light-water.js";
import {LightWaterFuel, LightWaterMine} from "./core/fuels/light-water/light-water.js";
import OverspinUpgrade from "./core/overspin/upgrades.js";
import LightWaterReactor from "./core/reactors/light-water/light-water.js";
import {get_default_data, player} from "./data.js";

export function get_save_string() {
	return compressToBase64(JSON.stringify(player));
}

export function get_save() {
	return localStorage.getItem("FissionSimulatorSave1");
}

export function save_game() {
	try {
		localStorage.setItem("FissionSimulatorSave1", get_save_string());
	} catch (err) {
		console.log("Saving Error:");
		console.error(err);
	}
}

export function load_save(save, imported = false) {
	try {
		if (typeof save !== "string") {
			save = get_save();
			if (save == null && !imported) {
				console.debug("No existing save found");
				player.reset();
				return;
			}
		}
		save.trim();

		save = JSON.parse(decompressFromBase64(save));

		check_assign(get_default_data(), save);

		if (player.version.minor === 1 && player.version.hotfix === 0) {
			player.reset();
			return;
		}

		player.version = get_default_data().version;

		if (imported) {
			alert("Save imported successfully.");
		}
	} catch (err) {
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
			let type = get_default_data();
			for (let i = 0; i < keys.length - 1; i++) {
				output = output[keys[i]];
				type = type[keys[i]];
			}
			output[keys[keys.length - 1]] = objectify(item, type[keys[keys.length - 1]]);
		}
	} else {
		let output = player;
		let def = get_default_data();
		for (let i = 0; i < keys.length - 1; i++) {
			output = output[keys[i]];
			def = def[keys[i]];
		}
		output[keys[keys.length - 1]] = def[keys[keys.length - 1]];
	}
}

function objectify(obj, type) {
	if (type instanceof Decimal) {
		return new Decimal(obj);
	} else if (type instanceof LightWaterFuel) {
		let ret = new LightWaterFuel();
		ret.regular = new Decimal(obj.regular);
		ret.enriched = new Decimal(obj.enriched);

		ret.mine = new LightWaterMine();
		ret.mine.bought = obj.mine.bought;
		return ret;
	} else if (type instanceof LightWaterReactor) {
		let ret = new LightWaterReactor();
		ret.fuel = new Decimal(obj.fuel);
		ret.fuel_enriched = obj.fuel_enriched;

		ret.bought = obj.bought;
		ret.amount = new Decimal(obj.amount);
		return ret;
	} else if (type instanceof LightWaterCentrifuge) {
		let ret = new LightWaterCentrifuge();
		ret.fuel = new Decimal(obj.fuel);
		ret.time = obj.time;

		ret.bought = obj.bought;
		return ret;
	} else if (type instanceof OverspinUpgrade) {
		let ret = new OverspinUpgrade(type.cost, type.method);

		ret.bought = obj.bought;
		return ret;
	}

	return obj;
}
