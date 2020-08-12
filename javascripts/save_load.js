function rot(s, i) {
	return s.replace(/[a-zA-Z]/g, function (c) {
		return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
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

		save.trim();

		if (save.startsWith("ey")) {
			save = JSON.parse(atob(save));
		} else {
			save = JSON.parse(LZString.decompressFromBase64(save));
		}

		if (save.version.beta < 5 || (save.version.beta == 5 && save.version.alpha < 11)) {
			if (imported) {
				alert("The imported save is from a much older version and is thus, incompatible with the current version. The save has not been imported.");
				return;
			} else {
				alert("Your save is from a much older version and is thus, incompatible with the current version. Your save has been cleared.");
				localStorage.removeItem("fissionSimSave1");
				save = JSON.parse(LZString.decompressFromBase64(LZString.compressToBase64(JSON.stringify(getDefaultData()))));
			}
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
		console.log(err);
		if (imported) {
			alert("Error: Imported save is in an invalid format, please make sure you've copied the save correctly and aren't just typing gibberish.");
		} else {
			console.log("The save didn't load.");
		}
	}
}

function checkAssign(check, assignFrom, assignTo = []) {
	if (assignFrom !== undefined) {
		if (check instanceof Array) {
			for (let i = 0; i < assignFrom.length; i++) {
				checkAssign(check[i], assignFrom[i], assignTo.concat([i]));
			}
		} else if (typeof check == "object" && !checkObj(check)) {
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
			if (assignTo.includes("turbine") && assignTo.includes("rotors")) {
				output[assignTo[assignTo.length - 1]] = objectify(assignFrom, rotors.none);
			}
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
		|| obj instanceof GenericEnergyProducer
		|| obj instanceof GenericUpgrade
		|| obj instanceof TurbineBlade;
}

function objectify(x, type) {
	if (type instanceof Decimal) {
		return new Decimal(x);
	} else if (type instanceof ImprovedMines) {
		let ret = new ImprovedMines();
		ret.tier = x.tier;
		ret.amount = x.amount;
		ret.depleted = x.depleted;
		ret.depletion = x.depletion;
		ret.ratio = x.ratio;
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
	} else {
		return x;
	}
}
