/*Load Save*/
function load_save() {
	player = getDefaultData();
	if (localStorage.getItem("fissionSimSave") !== null) {
		let save = JSON.parse(localStorage.getItem("fissionSimSave"));
		player.version = save.version;
		player.energy = new Decimal(save.energy);
		player.nano = save.nano;
		player.nanomaterial = new Decimal(save.nanomaterial);
		player.meteor = save.meteor;
		player.meteorMult = new Decimal(save.meteorMult);
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
	}
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

function init_game() {
	load_save();
	showNaviTab("production");
}