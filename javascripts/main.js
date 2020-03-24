function getDefaultData() {
	return {
		version: {
			release: 0,
			beta: 3,
			alpha: 15
		},
		
		options: {
			notation: "Scientific",
			notationNo: 0,
			theme: "Light",
			themeNo: 0
		},
		navigation: {
			naviTab: "production",
			production: "resources"
		},
		
		unlocked: {
				naniteUps: false,
				meltdown: false,
				decayHasten: false
		},
		energy: new Decimal(100),
		totalEnergy: new Decimal(100),
		
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
			amount: 0,
			corium: new Decimal(0),
			total: new Decimal(0),
			energyGoal: Decimal.pow(2, 1024),
			time: 0,
			bestTime: 756864000000,
			ups: {},
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
const isotopes = ["Thorium-232", "Uranium-235", "Neptunium-237", "Plutonium-241", "Americium-243", "Curium-247", "Berkelium-247", "Californium-252"];
const LEF = ["LET", "LEU", "LENp", "LEPu", "LEAm", "LECu", "LEBk", "LECf"];
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

function hardReset() {
	let confirmation = prompt("This will completely reset your game. If you are sure, type in \"Hitchiker's Guide to the Fusion-Driven Galaxy\"");
	if (confirmation == "Hitchiker's Guide to the Fusion-Driven Galaxy") {
		showNaviTab("production");
		showProdTab("resources"); 
		player = getDefaultData();
		saveGame();
	}
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

var player = getDefaultData();

/*Game Loops*/
setInterval(function() {
	saveGame();
}, 15000);

setInterval(function() {
	if (Date.now() > player.lastUpdate + 1000 && focused) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	updateGame(25);
	player.lastUpdate = Date.now();
}, 25);

setInterval(function() {
	updateUI();
}, 50);

setInterval(function() {
	player.time += 50;
	player.time = floor(player.time);
	player.timeOnline += 50;
	player.timeOnline = floor(player.timeOnline);
	player.meltdown.time += 50;
	player.meltdown.time = floor(player.meltdown.time);
}, 50);