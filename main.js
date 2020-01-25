var defaultData = {
	version: {alpha: 0, beta: 5},
	fuel: new Decimal(10),
	mine: {
		amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+7"), new Decimal("1e+11"), new Decimal("1e+16"), new Decimal("1e+22")],
		costMult: [new Decimal("1e+2"), new Decimal("1e+3"), new Decimal("1e+5"), new Decimal("1e+8"), new Decimal("1e+12"), new Decimal("1e+17"), new Decimal("1e+23")],
		bought: [0, 0, 0, 0, 0, 0, 0],
		mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
	},
	multMult: new Decimal(2),
	crust: 0,
	crustMult: new Decimal(2)
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
		player.mine.bought[a] += 1;
		player.mine.cost[a] = player.mine.cost[a].multiply(player.mine.costMult[a]);
		player.mine.mult[a] = player.mine.mult[a].multiply(player.multMult);
		
		document.getElementById(e[a] + "Mine").innerText = scientific(player.mine.amount[a]);
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + scientific(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + scientific(player.mine.mult[a]);
	}
}

function crust() {
	if (player.crust < 4) {
		if (player.mine.amount[player.crust + 4] > 2) {
			player.crust += 1;
			for (let a = 0; a < player.crust;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.crustMult);
			}
			document.getElementById("row" + (player.crust + 4)).style.display = "table-row";
		}
	} else if (player.crust < 9) {
		if (player.mine.amount[7] > 2 + ((player.crust - 4) * 2)) {
			player.crust += 1;
			for (let a = 0; a < player.crust;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.crustMult);
			}
		}
	} else {
		if (player.mine.amount[7] > 2 + ((player.crust - 4) * 2)) {
			player.crust += 1;
			for (let a = 0; a < 8;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.crustMult);
			}
		}
	}
}


function scientific(x) {
	if (x.exponent <=3) {
		return x;
	} else {
		return Math.round(x.mantissa * 100) / 100 + "e" + x.exponent;
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

	document.getElementById("fuel").innerText = "You have " + scientific(player.fuel.floor()) + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + scientific(fuelPerSecond.floor()) + " Nuclear Fuel per second.";

	for (let a = 0; a < (player.crust + 4); a++) {
		document.getElementById(e[a] + "Mine").innerText = scientific(player.mine.amount[a].floor());
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + scientific(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + scientific(player.mine.mult[a]);
	}
}

/*Load Save*/
function load_save() {
	let save = JSON.parse(localStorage.getItem("fissionSimSave"));
	player.version = save.version;
	player.fuel = new Decimal(save.fuel);
	for (let a = 0; a < player.crust + 4; a++) {
		player.mine.amount[a] = new Decimal(save.mine.amount[a]);
		player.mine.cost[a] = new Decimal(save.mine.cost[a]);
		player.mine.mult[a] = new Decimal(save.mine.mult[a]);
		player.mine.costMult[a] = new Decimal(save.mine.costMult[a]);
	}
	player.multMult = new Decimal(save.multMult);

	if (player.version === undefined) { player.version = defaultSave.version; } 
	if (player.fuel === undefined) { player.fuel = defaultSave.fuel; }
	for (let b = 0; b < 7; b++) {
		if (player.mine.amount[b] === undefined) { player.mine.amount[b] = defaultSave.player.mine.amount[b]; }
		if (player.mine.cost[b] === undefined) { player.mine.cost[b] = defaultSave.player.mine.cost[b]; }
		if (player.mine.mult[b] === undefined) { player.mine.mult[b] = defaultSave.player.mine.mult[b]; }
		if (player.mine.costMult[b] === undefined) { player.mine.costMult[b] = defaultSave.player.mine.costMult[b]; }
	}
	if (player.multMult === undefined) { player.multMult = defaultSave.multMult; }
}

/*Initialise Game*/
load_save();
document.getElementById("row5").style.display = "none";
document.getElementById("row6").style.display = "none";
document.getElementById("row7").style.display = "none";

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}, 10000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);