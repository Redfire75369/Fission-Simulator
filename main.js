var defaultData = {
	version: {alpha: 0, beta: 6},
	fuel: new Decimal(10),
	mine: {
		amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+7"), new Decimal("1e+11"), new Decimal("1e+16"), new Decimal("1e+22")],
		costMult: [new Decimal("1e+2"), new Decimal("1e+3"), new Decimal("1e+5"), new Decimal("1e+8"), new Decimal("1e+12"), new Decimal("1e+17"), new Decimal("1e+23")],
		bought: [0, 0, 0, 0, 0, 0, 0],
		mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
	},
	multMult: new Decimal(2),
	meteor: 0,
	meteorMult: new Decimal(2),
	notation: "scientific",
	notationNo: 0
}
const e = ["Th", "U", "Pu", "Am", "Cm", "Bk", "Cf"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];

var player = defaultData;

function hardReset() {
	player = defaultData;
}

function round(x, dp) {
	return (Math.round(x * Math.pow(10, dp)) / Math.pow(10, dp));
}

function buyMine(a) {
	if (player.fuel.gte(player.mine.cost[a])) {
		player.fuel = player.fuel.minus(player.mine.cost[a]) ;
		
		player.mine.amount[a] = player.mine.amount[a].plus(1);
		player.mine.bought[a] += 1;
		player.mine.cost[a] = player.mine.cost[a].multiply(player.mine.costMult[a]);
		player.mine.mult[a] = player.mine.mult[a].multiply(player.multMult);
		
		document.getElementById(e[a] + "Mine").innerText = notation(player.mine.amount[a]);
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + notation(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + notation(player.mine.mult[a]);
	}
}

function meteor() {
	if (player.meteor < 4) {
		if (player.mine.amount[player.meteor + 3].gte(2)) {
			player.meteor += 1;
			player.fuel = defaultData.fuel;
			for (let a = 0; a < player.meteor + 3; a++) {
				player.mine.amount[a] = defaultData.mine.amount[a];
				player.mine.cost[a] = defaultData.mine.cost[a];
				player.mine.bought[a] = defaultData.mine.bought[a];
				player.mine.costMult[a] = defaultData.mine.costMult[a];
				player.mine.mult[a] = defaultData.mine.mult[a];
			}
			for (let b = 0; b < player.meteor;  b++) {	
				player.mine.mult[b] = player.mine.mult[b].multiply(player.meteorMult);
			}
			document.getElementById("meteorCost").innerText = "Meteor Strike: Requires 2 " + elements[player.meteor + 3] + " Mines"
			document.getElementById("row" + (player.meteor + 4)).style.display = "table-row";
		}
	} else if (player.meteor < 9) {
		if (player.mine.amount[7].gte(2 + ((player.meteor - 4) * 2))) {
			player.meteor += 1;
			for (let a = 0; a < player.meteor;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.meteorMult);
			}
		}
	} else {
		if (player.mine.amount[7].gte(2 + ((player.meteor - 4) * 2))) {
			player.meteor += 1;
			for (let a = 0; a < 8;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.meteorMult);
			}
		}
	}
}
function notationChange() {
	let notations = ["scientific", "logarithm"];
	let notationsCap = ["Scientific", "Logarithmic"];
	if (player.notationNo + 1 == notations.length) {
		player.notation = notations[0];
		player.notationNo = 0;
		document.getElementById("notation").innerText = "Notation: " +  notationsCap[0];
	} else {
		player.notation = notations[player.notationNo + 1];
		player.notationNo += 1;
		document.getElementById("notation").innerText = "Notation: " +  notationsCap[player.notationNo];
	}
}
function notation(x) {
	switch(player.notation) {
		case "scientific":
			return scientific(x);
			break;
		case "logarithm":
			return logarithm(x);
			break;
		default:
	}
}
			
function scientific(x) {
	if (x.exponent < 4) {
		return x
	} else if (x.mantissa > 9.995) {
		return 1 + "e" + (x.exponent + 1);
	} else if (x.mantissa < 9.995) {
		return round(x.mantissa, 2)+ "e" + x.exponent;
	}
}

function logarithm(x) {
	if (x.exponent < 4) {
		return x;
	} else {
		return "e" + (x.exponent + round(Math.log(x.mantissa, 10), 2));
	}
}

function setFuel() {
	player.fuel = new Decimal("1e+16");
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

	document.getElementById("fuel").innerText = "You have " + notation(player.fuel.floor()) + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + notation(fuelPerSecond.floor()) + " Nuclear Fuel per second.";

	for (let a = 0; a < Math.min(player.meteor + 4, 7); a++) {
		document.getElementById(e[a] + "Mine").innerText = notation(player.mine.amount[a].floor());
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + notation(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + notation(player.mine.mult[a]);
	}
}

/*Load Save*/
function load_save() {
	if (localStorage.getItem("fissionSimSave") !== null) {
		let save = JSON.parse(localStorage.getItem("fissionSimSave"));
		player.version = save.version;
		player.fuel = new Decimal(save.fuel);
		for (let a = 0; a < Math.min(player.meteor + 4, 7); a++) {
			player.mine.amount[a] = new Decimal(save.mine.amount[a]);
			player.mine.cost[a] = new Decimal(save.mine.cost[a]);
			player.mine.mult[a] = new Decimal(save.mine.mult[a]);
			player.mine.costMult[a] = new Decimal(save.mine.costMult[a]);
		}
		player.multMult = new Decimal(save.multMult);
		player.meteor = save.meteor;
		player.meteorMult = new Decimal(save.meteorMult);
		player.notation = save.notation;
	}
	if (player.version === undefined) { player.version = defaultData.version; } 
	if (player.fuel === undefined) { player.fuel = defaultData.fuel; }
	for (let b = 0; b < 7; b++) {
		if (player.mine.amount[b] === undefined) { player.mine.amount[b] = defaultData.player.mine.amount[b]; }
		if (player.mine.cost[b] === undefined) { player.mine.cost[b] = defaultData.player.mine.cost[b]; }
		if (player.mine.mult[b] === undefined) { player.mine.mult[b] = defaultData.player.mine.mult[b]; }
		if (player.mine.costMult[b] === undefined) { player.mine.costMult[b] = defaultData.player.mine.costMult[b]; }
	}
	if (player.multMult === undefined) { player.multMult = defaultData.multMult; }
	if (player.meteor === undefined) { player.meteor = defaultData.meteor; }
	if (player.meteorMult === undefined) { player.meteorMult = defaultData.meteorMult; }
	if (player.notation === undefined) { player.notation = defaultData.notation; } 
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