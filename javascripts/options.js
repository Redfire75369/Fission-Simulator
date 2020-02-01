/*Notations Change*/
function notationChange() {
	let notations = ["Scientific", "Logarithmic", "Engineering", "Standard", "YesNo"];
	if (player.options.notationNo + 1 == notations.length) {
		player.options.notationNo = 0;
		player.options.notation = notations[player.options.notationNo];
		document.getElementById("notation").innerText = "Notation: " +  player.options.notation;
	} else {
		player.options.notationNo += 1;
		player.options.notation = notations[player.options.notationNo];
		document.getElementById("notation").innerText = "Notation: " + player.options.notation;
	}
}

function targetedNotationChange(notation) {
	while (player.options.notation != notation) {
		notationChange();
	}
}

/*Save/Load*/
function getSaveString() {
	return btoa(JSON.stringify(player));
}
function getSave() {
	if (!localStorage.getItem("fissionSimSave")) return;
	return JSON.parse(atob(localStorage.getItem("fissionSimSave")));
}
function saveGame() {
	localStorage.setItem("fissionSimSave", getSaveString());
}
function loadSave(save) {
	player.version = save.version;
	player.time = save.time;
	player.navigation.naviTab = save.navigation.naviTab;
	player.options.notation = save.options.notation;
	player.options.notationNo = save.options.notationNo;
	player.energy = new Decimal(save.energy);
	player.nanites.research = save.nanites.research;
	player.nanites.nanites = new Decimal(save.nanites.nanites);
	player.nanites.naniteUpg = save.nanites.naniteUpg;
	player.nanites.time = save.nanites.time;
	player.meteor.shower = save.meteor.shower;
	player.meteor.meteorMult = new Decimal(save.meteor.meteorMult);
	player.meteor.time = save.meteor.time;
	player.eff.bought = save.eff.bought;
	player.eff.cost = new Decimal(save.eff.cost);
	player.eff.costMult = new Decimal(save.eff.costMult);
	player.eff.mult = new Decimal(save.eff.mult);
	player.eff.multMult = new Decimal(save.eff.multMult);
	for (let tier = 0; tier < 8; tier++) {
		player.reactor.amount[tier] = new Decimal(save.reactor.amount[tier]);
		player.reactor.bought[tier] = save.reactor.bought[tier];
		player.reactor.cost[tier] = new Decimal(save.reactor.cost[tier]);
		player.reactor.mult[tier] = new Decimal(save.reactor.mult[tier]);
		player.reactor.costMult[tier] = new Decimal(save.reactor.costMult[tier]);
	}
	player.multMult = new Decimal(save.multMult);
	
	if (player.version === undefined) { player.version = getDefaultData().version; }
	if (player.navigation.naviTab === undefined) { player.navigation.naviTab = getDefaultData().navigation.naviTab; }
	if (player.version === undefined) { player.version = getDefaultData().version; }
	if (player.energy === undefined) { player.energy = getDefaultData().energy; }
	if (player.meteor === undefined) { player.meteor = getDefaultData().meteor; }
	if (player.meteorMult === undefined) { player.meteorMult = getDefaultData().meteorMult; }
	if (player.eff.bought === undefined) { player.eff.bought = getDefaultData().eff.bought; }
	if (player.eff.cost === undefined) { player.eff.cost = getDefaultData().eff.cost; }
	if (player.eff.costMult === undefined) { player.eff.costMult = getDefaultData().eff.costMult; }
	if (player.eff.mult === undefined) { player.eff.mult = getDefaultData().eff.mult; }
	if (player.eff.multMult === undefined) { player.eff.multMult = getDefaultData().eff.multMult; }
	for (let tier = 0; tier < 8; tier++) {
		if (player.reactor.amount[tier] === undefined) { player.reactor.amount[tier] = getDefaultData().reactor.amount[tier]; }
		if (player.reactor.bought[tier] === undefined) { player.reactor.bought[tier] = getDefaultData().reactor.bought[tier]; }
		if (player.reactor.cost[tier] === undefined) { player.reactor.cost[tier] = getDefaultData().reactor.cost[tier]; }
		if (player.reactor.costMult[tier] === undefined) { player.reactor.costMult[tier] = getDefaultData().reactor.costMult[tier]; }
		if (player.reactor.mult[tier] === undefined) { player.reactor.mult[tier] = getDefaultData().reactor.mult[tier]; }
	}
	if (player.multMult === undefined) { player.multMult = getDefaultData().multMult; }
}
/*Import/Export*/
function importSave() {
	var save = prompt("Input your save (your current save file will be overwritten!)");
	loadSave(save);
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSaveString());
}