function getDefaultData() {
	return {
		version: {alpha: 0, beta: 8},
		options: {
			notation: "Scientific",
			notationNo: 0,
			updateRate: 50
		},
		navigation: {
			naviTab: "options",
			prodTab: "mines"
		},
		fuel: new Decimal(10),
		eff: {
			bought: 0,
			cost: new Decimal("1e+3"),
			costMult: new Decimal("1e+1"),
			mult: new Decimal(1),
			multMult: new Decimal(1.1)
		},
		mine: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+6"), new Decimal("1e+9"), new Decimal("1e+13"), new Decimal("1e+18"), new Decimal("1e+24")],
			costMult: [new Decimal("1e+3"), new Decimal("1e+4"), new Decimal("1e+5"), new Decimal("1e+6"), new Decimal("1e+8"), new Decimal("1e+10"), new Decimal("1e+12"), new Decimal("1e+15")],
			bought: [0, 0, 0, 0, 0, 0, 0, 0],
			mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
		},
		multMult: new Decimal(2),
		meteor: 0,
		meteorMult: new Decimal(2)
	}
}
const e = ["Th", "U", "Pu", "Am", "Cm", "Bk", "Cf", "Es"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium"];
var player = getDefaultData();

function hardReset() {
	player = getDefaultData();
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
	hideMines();
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
		player.eff.mult = player.eff.mult.multiply(player.eff.multMult);
		document.getElementById("effCost").innerText = "Cost: " + notation(player.eff.cost);
		document.getElementById("eff").innerText = "Efficiency: " + notation(player.eff.mult);
	}
}

function meteor() {
	if (player.meteor < 4) {
		if (player.mine.amount[player.meteor + 3].gte(2)) {
			player.meteor += 1;
			player.fuel = getDefaultData().fuel;
			for (let a = 0; a < player.meteor + 3; a++) {
				player.mine.amount[a] = getDefaultData().mine.amount[a];
				player.mine.cost[a] = getDefaultData().mine.cost[a];
				player.mine.bought[a] = getDefaultData().mine.bought[a];
				player.mine.costMult[a] = getDefaultData().mine.costMult[a];
				player.mine.mult[a] = getDefaultData().mine.mult[a];
			}
			for (let a = 0; a < player.meteor;  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.meteorMult.pow(player.meteor - a));
			}
			document.getElementById("meteorCost").innerText = "Meteor Strike: Requires 2 " + elements[player.meteor + 3] + " Mines"
			document.getElementById("row" + (player.meteor + 4)).style.display = "table-row";
		}
	} else if (player.meteor < 9) {
		if (player.mine.amount[7].gte(2 + ((player.meteor - 4) * 2))) {
			player.meteor += 1;
			player.fuel = getDefaultData().fuel;
			for (let a = 0; a < player.meteor + 3; a++) {
				player.mine.amount[a] = getDefaultData().mine.amount[a];
				player.mine.cost[a] = getDefaultData().mine.cost[a];
				player.mine.bought[a] = getDefaultData().mine.bought[a];
				player.mine.costMult[a] = getDefaultData().mine.costMult[a];
				player.mine.mult[a] = getDefaultData().mine.mult[a];
			}
			for (let a = 0; a < Math.min(player.meteor, 8);  a++) {
				player.mine.mult[a] = player.mine.mult[a].multiply(player.meteorMult.pow(player.meteor - a));
			}
			document.getElementById("meteorCost").innerText = "Tectonic Initiation: Requires " + (2 + ((player.meteor - 4) * 2)) + " Einsteinium Mines";
		}
	}
}
let notations = ["Scientific", "Logarithmic"];
function notationChange() {
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

document.getElementById("updaterateslider").oninput = function() {
	document.getElementById("updaterate").innerText = "Game Update Rate: " + this.value + "ms";
}

function showNaviTab(tab) {
	document.getElementById(player.navigation.naviTab).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.currentNaviTab = tab;
}

function update() {
	let fuelPerSecond = player.mine.amount[0].multiply(player.mine.mult[0]);
	let perSecond = [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)];
	
	player.fuel = player.fuel.plus(fuelPerSecond.multiply(player.options.updateRate/1000));
	document.getElementById("fuel").innerText = "You have " + notation(player.fuel) + " Nuclear Fuel.";
	document.getElementById("fuelPerSecond").innerText = "You are gaining " + notation(fuelPerSecond) + " Nuclear Fuel per second.";

	for (let a = 0; a < Math.min(player.meteor + 4, 8); a++) {
		if (a != 7) {
			player.mine.amount[a] = player.mine.amount[a].plus((player.mine.amount[a + 1].multiply(player.mine.mult[a + 1]).multiply(player.eff.mult)).multiply(player.options.updateRate/1000));
		}
		document.getElementById(e[a] + "Mine").innerText = notation(player.mine.amount[a]);
		document.getElementById(e[a] + "MineCost").innerText = "Cost: " + notation(player.mine.cost[a]);
		document.getElementById(e[a] + "MineMult").innerText = elements[a] + " Mine ×" + notation(player.mine.mult[a]);
	}

	switch(player.meteor) {
		case 0:
		case 1:
		case 2:
		case 3:
			document.getElementById("meteorCost").innerText = "Meteor Strike: Requires 2 " + elements[player.meteor + 3] + " Mines"
			break;
		default:
			document.getElementById("meteorCost").innerText = "Tectonic Initiation: Requires " + (2 + ((player.meteor - 4) * 2)) + " Einsteinium Mines";
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
}, player.options.updateRate);