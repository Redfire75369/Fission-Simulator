var defaultData = {
	version: {alpha: 0, beta: 4},
	fuel: new Decimal(10),
	mine: {
		amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+7")],
		mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
		costMult: [new Decimal("1e+2"), new Decimal("1e+3"), new Decimal("1e+5"), new Decimal("1e+8")]
	},
	multMult: new Decimal(2)
}
const e = ["Th", "U", "Pu", "Am"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium"];

var player = defaultData;

function hardReset() {
	player = defaultData;
}

function buyMine(a) {
	if (player.fuel.gte(player.mine.cost[a])) {
		player.fuel = player.fuel.minus(player.mine.cost[a]) ;
		
		player.mine.amount[a] = player.mine.amount[a].plus(1);
		player.mine.cost[a] = player.mine.cost[a].multiply(player.mine.costMult[a]);
		player.mine.mult[a] = player.mine.mult[a].multiply(player.mine.MultMult);
		
		document.getElementById(e[a] + "Mine").innerText = player.mine.amount[a].toString();
		document.getElementById(e[a] + "MineCost").innerText = player.mine.cost[a].toString();
	}
}
		
		
function update() {
	let fuelPerSecond = player.mine.amount[0].multiply(player.mine.mult[0]);
	let ThMinePerSecond = player.mine.amount[1].multiply(player.mine.mult[1]);
	let UMinePerSecond = player.mine.amount[2].multiply(player.mine.mult[2]);
	let PuMinePerSecond = player.mine.amount[3].multiply(player.mine.mult[3]);
	
	player.fuel = player.fuel.plus(fuelPerSecond.dividedBy(20));
	player.mine.amount[0] = player.mine.amount[0].plus(ThMinePerSecond.dividedBy(20));
	player.mine.amount[1] = player.mine.amount[1].plus(UMinePerSecond.dividedBy(20));
	player.mine.amount[2] = player.mine.amount[2].plus(PuMinePerSecond.dividedBy(20));

	document.getElementById("fuel").innerText = "You have " + player.fuel.floor().toString() + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + fuelPerSecond.floor().toString() + " Nuclear Fuel per second.";

	for (let a = 0; a < 4; a++) {
		document.getElementById(e[a] + "Mine").innerText = player.mine.amount[a].floor().toString();
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + player.mine.cost[a].floor().toString();
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + player.mine.mult[a].floor().toString();
	}
}

/*Load Save*/
var save = JSON.parse(localStorage.getItem("fissionSimSave"));
function load_save() {
	player.version = save.version;
	player.fuel = new Decimal(save.fuel);
	for (let a = 0; a < 4; a++) {
		player.mine.amount[a] = new Decimal(save.mine.amount[a]);
		player.mine.cost[a] = new Decimal(save.mine.cost[a]);
		player.mine.mult[a] = new Decimal(save.mine.mult[a]);
		player.mine.costMult[a] = new Decimal(save.mine.costMult[a]);
	}
	player.mine.MultMult = new Decimal(save.mine.MultMult);

	if (player.version === undefined) { player.version = defaultSave.version; } 
	if (player.fuel === undefined) { player.fuel = defaultSave.fuel; }
	for (let b = 0; b < 4; b++) {
		if (player.mine.amount[b] === undefined) { player.mine.amount[b] = defaultSave.player.mine.amount[b]; }
		if (player.mine.cost[b] === undefined) { player.mine.cost[b] = defaultSave.player.mine.cost[b]; }
		if (player.mine.mult[b] === undefined) { player.mine.mult[b] = defaultSave.player.mine.mult[b]; }
		if (player.mine.costMult[b] === undefined) { player.mine.costMult[b] = defaultSave.player.mine.costMult[b]; }
	}
	if (player.mine.MultMult === undefined) { player.mine.MultMult = defaultSave.mine.MultMult; }
}

/*Initialise Game*/
load_save();

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}, 5000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);