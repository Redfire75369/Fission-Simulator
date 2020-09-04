function rot(s, i) {
	return s.replace(/[a-zA-Z]/g, function (c) {
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
	});
}

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
		if (save === undefined) {
			save = getSave();
		}
		save.trim();

		if (save.startsWith("ey")) {
			save = JSON.parse(atob(save));
		} else {
			save = JSON.parse(LZString.decompressFromBase64(save));
		}

		if (save.version.beta < 6 || (save.version.beta === 6 && save.version.alpha < 7)) {
			if (imported) {
				alert("The imported save is from a much older version and is thus, incompatible with the current version. The save has not been imported.");
				return;
			}
			alert("Your save is from a much older version and is thus, incompatible with the current version. Your save has been cleared.");
			localStorage.removeItem("fissionSimSave1");
			player = getDefaultData();
			return;
		}

		if (save !== undefined) {
			checkAssign(getDefaultData(), save, []);

			player.version = getDefaultData().version;
		} else {
			console.log("No existing save found");
		}
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

function checkAssign(check, assignFrom, assignTo = []) {
	if (assignFrom !== undefined) {
		if (check instanceof Array) {
			for (let i = 0; i < assignFrom.length; i++) {
				checkAssign(check[i], assignFrom[i], assignTo.concat([i]));
			}
		} else if (typeof check === "object" && !checkObj(check)) {
			for (let i = 0, ii = Object.keys(check); i < ii.length; i++) {
				checkAssign(check[ii[i]], assignFrom[ii[i]], assignTo.concat([ii[i]]));
			}
		} else {
			let output = player;
			let type = getDefaultData();
			for (let i = 0; i < assignTo.length - 1; i++) {
				output = output[assignTo[i]];
				type = type[assignTo[i]];
			}
			output[assignTo[assignTo.length - 1]] = objectify(assignFrom, type[assignTo[assignTo.length - 1]]);
			/*if (assignTo.includes("turbine") && assignTo.includes("rotors")) {
				output[assignTo[assignTo.length - 1]] = objectify(assignFrom, rotors.none);
			}*/
		}
	} else {
		let output = player;
		let def = getDefaultData();
		for (let i = 0; i < assignTo.length - 1; i++) {
			output = output[assignTo[i]];
			def = def[assignTo[i]];
		}
		output[assignTo[assignTo.length - 1]] = def[assignTo[assignTo.length - 1]];
	}
}

function checkObj(obj) {
	return obj instanceof Decimal
		|| obj instanceof Array
		|| obj instanceof GenericProducer
		|| obj instanceof GenericUpgrade
		|| obj instanceof TRISOFuel
		|| obj instanceof Mines;
}

function objectify(x, type) {
	if (type instanceof Decimal) {
		return new Decimal(x);
	} else if (type instanceof TRISOFuel) {
		let ret = new TRISOFuel(type.tier);
		ret.enriched = new Decimal(x.enriched);
		ret.depleted = new Decimal(x.depleted);
		return ret;
	} else if (type instanceof Mines) {
		let ret = new Mines();
		ret.tier = x.tier;
		ret.amount = new Decimal(x.amount);
		ret.depleted = new Decimal(x.depleted);
		ret.depletion = new Decimal(x.depletion);
		ret.ratio = x.ratio;
		return ret;
	} else if (type instanceof PebblebedFissionReactor) {
		let ret = new PebblebedFissionReactor(type.tier, type.startCost.log10(), type.scaleCost.log10());
		ret.amount = new Decimal(x.amount);
		ret.bought = x.bought;
		ret.fuel = new Decimal(x.fuel);
		ret.spent = new Decimal(x.spent);
		return ret;
	/* } else if (type instanceof TurbineBlade) {
		let ret = new TurbineBlade(x.name, x.efficiency, x.expansion, x.speed);
		ret.length = x.length;
		return ret; */
	} else if (type instanceof TurbineNaniteUpgrade) {
		let ret = new TurbineNaniteUpgrade();
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
	}
	return x;
}
