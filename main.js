var defaultData = {
	version: {alpha: 0, beta: 7},
	fuel: new Decimal(10),
	eff: {
		bought: 0,
		cost: new Decimal("1e+3"),
		costMult: new Decimal("1e+1"),
		mult: new Decimal(1),
		multMult: new Decimal(1.1)
	},
	mine: {
		amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
		cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+6"), new Decimal("1e+9"), new Decimal("1e+13"), new Decimal("1e+18")],
		costMult: [new Decimal("1e+3"), new Decimal("1e+4"), new Decimal("1e+5"), new Decimal("1e+6"), new Decimal("1e+8"), new Decimal("1e+10"), new Decimal("1e+12")],
		bought: [0, 0, 0, 0, 0, 0, 0],
		mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
	},
	multMult: new Decimal(2),
	meteor: 0,
	meteorMult: new Decimal(2),
	notation: "scientific",
	notationNo: 0,
	lastPlayed: new Date().getTime()
}
const e = ["Th", "U", "Pu", "Am", "Cm", "Bk", "Cf"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];
var player = defaultData;

function hardReset() {
	player = defaultData;
}
function setFuel() {
	player.fuel = new Decimal("1e+100");
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
function buyEff() {
	if (player.fuel.gte(player.eff.cost)) {
		player.fuel = player.fuel.minus(player.eff.cost);
		
		player.eff.bought += 1;
		player.eff.cost = player.eff.cost.multiply(player.eff.costMult);
		player.eff.mult = player.eff.mult.multiply(player.eff.mineMult);
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


function update() {
	
	let fuelPerSecond = player.mine.amount[0].multiply(player.mine.mult[0]);
	let perSecond = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
	
	player.fuel = player.fuel.plus(fuelPerSecond.dividedBy(20));
	document.getElementById("fuel").innerText = "You have " + notation(player.fuel.floor()) + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + notation(fuelPerSecond.floor()) + " Nuclear Fuel per second.";

	for (let a = 0; a < Math.min(player.meteor + 4, 7); a++) {
		player.mine.amount[a] = player.mine.amount[a].plus((player.mine.amount[a + 1].multiply(player.mine.mult[a + 1])).dividedBy(20));
		document.getElementById(e[a] + "Mine").innerText = notation(player.mine.amount[a].floor());
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + notation(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + notation(player.mine.mult[a]);
	}
}

/*Initialise Game*/
init_game();

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}, 10000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);