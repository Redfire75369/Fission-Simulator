function getDefaultData() {
	return {
		version: {
			release: 0,
			beta: 4,
			alpha: 2
		},
		
		options: {
			notation: "Scientific",
			notationNo: 0,
			theme: "Light",
			themeNo: 0
		},
		
		navigation: {
			naviTab: "production",
			production: "mines"
		},
		
		unlocked: {
				naniteUps: false,
				meltdown: false,
				decayHasten: false
		},
		
		achs: {
			r11: false,
			r12: false
		},
		
		energy: new Decimal(100),
		totalEnergy: new Decimal(100),
		
		moderator: 0,
		
		eff: {
			bought: 0
		},
		mine: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			bought: [0, 0, 0, 0, 0, 0, 0, 0]
		},
		reactor: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			bought: [0, 0, 0, 0, 0, 0, 0, 0]
		},
		
		nucleosynthesis: 0,
		
		nanites: {
			nanites: new Decimal(0),
			total: new Decimal(0),
			effUpCost: new Decimal(1),
			ups: {
				0: 0,
				11: 0,
				12: 0,
				21: 0,
				22: 0,
				31: 0,
				32: 0
			}
		},
		
		meltdown: {
			totalNanites: new Decimal(0),
			
			amount: 0,
			corium: new Decimal(0),
			total: new Decimal(0),
			
			energyGoal: Decimal.pow(2, 1024),
			time: 0,
			bestTime: 756864000000,
			ups: {
				11: 0,
				12: 0,
				13: 0,
				14: 0,
				21: 0,
				22: 0,
				23: 0,
				24: 0,
				31: 0,
				32: 0,
				33: 0,
				34: 0,
				41: 0,
				42: 0,
				43: 0,
				44: 0,
			},
			breakUps: {0: 0}
		},
		
		imported42: false,
		
		time: 0,
		timeOnline: 0,
		lastUpdate: Date.now()
	}
}
const mining = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];
const fissile = ["Thorium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];
const isotopes = ["Thorium-227", "Uranium-235", "Neptunium-234", "Plutonium-237", "Americium-242m", "Curium-245", "Berkelium-248", "Californium-251"];
const LEF = ["LET", "LEU", "LENp", "LEPu", "LEAm", "LECm", "LEBk", "LECf"];
const JkgLEF = [new Decimal(4), new Decimal(16), new Decimal(64), new Decimal(256), new Decimal(1024), new Decimal(4096), new Decimal(16384), new Decimal(65536)];
const infinity = Decimal.pow(2, 1024);
const zero = new Decimal(0);

var focused = true;
window.onfocus = function() {
  focused=true;  
}
window.onblur = function() {
  focused=false;  
}  

function updateUI() {
	updateUIEnergy();
	updateUIFuel();
	updateUIMines();
	updateUIReactors();
	updateUIEff();
	updateUINucleosynthesis();
	updateUINaniteUps();
	updateUINaniteResearch();
	updateUIMeltdown();
	updateUIMeltdownUps();
	updateUIStats();
}
function updateGame(tickInterval) {
	if (leverMaxAll) {
		buyMaxAll();
	}
	simulateMines(tickInterval);
	simulateReactors(tickInterval);
	simulateEnergy(tickInterval);
}

/*Offline Progress*/
function simulateTime(seconds, actual, testing) {
	if (seconds > 10) {
		document.getElementById("offlinePopup").style.display = "block";
		document.getElementById("offlineProgress").innerText = "Simulating " + seconds + " seconds of progress.";
	}
	let ticks = seconds * 20;
	let tickInterval = 50;
	if (ticks > 1000 & !actual) {
		tickInterval += (ticks - 1000) / 20;
		ticks = 1000;
	}
	let start = Object.assign({}, player);
	for (let complete = 0; complete < ticks; complete++) {
		if (testing) {
			buyMaxAll();
		}
		updateGame(tickInterval);
		player.lastUpdate = Date.now();
	}
	
	player.time += seconds * 1000;
	player.meltdown.time += seconds * 1000;
	
	let offlinePopup = "While you were away, "
	if (player.energy.gt(start.energy)) {
		offlinePopup += "your energy increased by " + notation(player.energy.log10() - start.energy.log10()) + " Orders of Magnitude.";
	}
	if (offlinePopup == "While you were away, ") {
		offlinePopup += "nothing happened...";
	}
	if (seconds > 1) {
		document.getElementById("offlinePopup").style.display = "none";
	}
	if (seconds > 1000) {
		document.getElementById("offlinePopup").style.display = "block";
		document.getElementById("offlineProgress").innerText = offlinePopup;
	}
}

function closeOfflineProgress() {
	document.getElementById("offlinePopup").style.display = "none";
}

var player = getDefaultData();

/*Game Loops*/
var saveGameLoop = setInterval(function() {
	saveGame();
}, 15000);

setInterval(function() {
	if (player.lastUpdate === undefined) {
		player.lastUpdate = Date.now();
	}
	if (Date.now() > player.lastUpdate && focused) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
}, 25);

setInterval(function() {
	updateUI();
}, 50);