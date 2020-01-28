/*Load Save*/
function load_save() {
	player = getDefaultData();
	if (localStorage.getItem("fissionSimSave") !== null) {
		let save = JSON.parse(localStorage.getItem("fissionSimSave"));
		player.version = save.version;
		player.fuel = new Decimal(save.fuel);
		player.meteor = save.meteor;
		player.meteorMult = new Decimal(save.meteorMult);
		player.eff.bought = save.eff.bought;
		player.eff.cost = new Decimal(save.eff.cost);
		player.eff.costMult = new Decimal(save.eff.costMult);
		player.eff.mult = new Decimal(save.eff.mult);
		player.eff.multMult = new Decimal(save.eff.multMult);
		for (let tier = 0; tier < 8; tier++) {
			player.mine.amount[tier] = new Decimal(save.mine.amount[tier]);
			player.mine.bought[tier] = save.mine.bought[tier];
			player.mine.cost[tier] = new Decimal(save.mine.cost[tier]);
			player.mine.mult[tier] = new Decimal(save.mine.mult[tier]);
			player.mine.costMult[tier] = new Decimal(save.mine.costMult[tier]);
		}
		player.multMult = new Decimal(save.multMult);
	}
	if (player.version === undefined) { player.version = getDefaultData().version; } 
	if (player.fuel === undefined) { player.fuel = getDefaultData().fuel; }
	if (player.meteor === undefined) { player.meteor = getDefaultData().meteor; }
	if (player.meteorMult === undefined) { player.meteorMult = getDefaultData().meteorMult; }
	if (player.eff.bought === undefined) { player.eff.bought = getDefaultData().eff.bought; }
	if (player.eff.cost === undefined) { player.eff.cost = getDefaultData().eff.cost; }
	if (player.eff.costMult === undefined) { player.eff.costMult = getDefaultData().eff.costMult; }
	if (player.eff.mult === undefined) { player.eff.mult = getDefaultData().eff.mult; }
	if (player.eff.multMult === undefined) { player.eff.multMult = getDefaultData().eff.multMult; }
	for (let tier = 0; tier < 8; tier++) {
		if (player.mine.amount[tier] === undefined) { player.mine.amount[tier] = getDefaultData().mine.amount[tier]; }
		if (player.mine.bought[tier] === undefined) { player.mine.bought[tier] = getDefaultData().mine.bought[tier]; }
		if (player.mine.cost[tier] === undefined) { player.mine.cost[tier] = getDefaultData().mine.cost[tier]; }
		if (player.mine.costMult[tier] === undefined) { player.mine.costMult[tier] = getDefaultData().mine.costMult[tier]; }
		if (player.mine.mult[tier] === undefined) { player.mine.mult[tier] = getDefaultData().mine.mult[tier]; }
	}
	if (player.multMult === undefined) { player.multMult = getDefaultData().multMult; }
}

function init_game() {
	load_save();
	showNaviTab("production");
}