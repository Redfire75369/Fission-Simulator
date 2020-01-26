/*Load Save*/
function load_save() {
	player = getDefaultData();
	if (localStorage.getItem("fissionSimSave") !== null) {
		let save = JSON.parse(localStorage.getItem("fissionSimSave"));
		player.version = save.version;
		player.fuel = new Decimal(save.fuel);
		player.meteor = save.meteor;
		player.meteorMult = new Decimal(save.meteorMult);
		player.notation = save.notation;
		for (let a = 0; a < 8; a++) {
			player.mine.amount[a] = new Decimal(save.mine.amount[a]);
			player.mine.cost[a] = new Decimal(save.mine.cost[a]);
			player.mine.mult[a] = new Decimal(save.mine.mult[a]);
			player.mine.costMult[a] = new Decimal(save.mine.costMult[a]);
		}
		player.multMult = new Decimal(save.multMult);
	}
	if (player.version === undefined) { player.version = getDefaultData().version; } 
	if (player.fuel === undefined) { player.fuel = getDefaultData().fuel; }
	if (player.meteor === undefined) { player.meteor = getDefaultData().meteor; }
	if (player.meteorMult === undefined) { player.meteorMult = getDefaultData().meteorMult; }
	if (player.notation === undefined) { player.notation = getDefaultData().notation; }
	for (let b = 0; b < 8; b++) {
		if (player.mine.amount[b] === undefined) { player.mine.amount[b] = getDefaultData().player.mine.amount[b]; }
		if (player.mine.cost[b] === undefined) { player.mine.cost[b] = getDefaultData().player.mine.cost[b]; }
		if (player.mine.mult[b] === undefined) { player.mine.mult[b] = getDefaultData().player.mine.mult[b]; }
		if (player.mine.costMult[b] === undefined) { player.mine.costMult[b] = getDefaultData().player.mine.costMult[b]; }
	}
	if (player.multMult === undefined) { player.multMult = getDefaultData().multMult; }
}

/*Hide higher tier mines*/
function hideMines() {
	switch(player.meteor) {
		case 0:
			document.getElementById("row5").style.display = "none";
		case 1:
			document.getElementById("row6").style.display = "none";
		case 2:
			document.getElementById("row7").style.display = "none";
		case 3:
			document.getElementById("row8").style.display = "none";
		default:
	}
}

function init_game() {
	load_save();
	hideMines();
	document.getElementById("meteorCost").innerText = "Meteor Strike: Requires 2 " + elements[player.meteor + 3] + " Mines"
}