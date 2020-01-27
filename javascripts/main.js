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
const el = ["Th", "U", "Pu", "Am", "Cm", "Bk", "Cf", "Es"];
const elements = ["Thorium", "Uranium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium"];
var player = getDefaultData();

function hardReset() {
	player = getDefaultData();
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
	hideMines();
}

function notationChange() {
	let notations = ["Scientific", "Logarithmic", "Engineering", "Standard"];
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
	updateMeteor();
	updateMines();
	updateEff();
	updateFuel();
}

/*Initialise Game*/
//init_game();

/*Game Loops*/
var saveGameLoop = window.setInterval(function() {
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}, 10000);

var mainGameLoop = window.setInterval(function() {
	update();
}, 50);