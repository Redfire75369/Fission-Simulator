function getDefaultData() {
	return {
		version: {
			release: 0,
			beta: 4,
			alpha: 7
		},
		
		options: {
			notation: "Scientific",
			notationNo: 0,
			theme: "Light",
			themeNo: 0
		},
		
		navigation: {
			naviTab: "production_tab",
			production: "mines_subtab"
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
		
		eff: new Efficiency(1e3, 1e1),
		mines: [new Mine(0, 1e1, 1e3), new Mine(1, 1e2, 1e5), new Mine(2, 1e5, 1e7), new Mine(3, 1e8, 1e10), new Mine(4, 1e13, 1e13), new Mine(5, 1e18, 1e16), new Mine(6, 1e24, 1e20), new Mine(7, 1e30, 1e25)],
		reactors: [new Reactor(0, 1e1, 1e3), new Reactor(1, 1e2, 1e5), new Reactor(2, 1e5, 1e7), new Reactor(3, 1e8, 1e10), new Reactor(4, 1e13, 1e13), new Reactor(5, 1e18, 1e16), new Reactor(6, 1e24, 1e20), new Reactor(7, 1e30, 1e25)],
		
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
const isotopes = ["Thorium-227", "Uranium-235", "Neptunium-234", "Plutonium-237", "Americium-242m", "Curium-245", "Berkelium-248", "Californium-251"];
const diminishFactor = [100, 200, 350, 488, 600, 733, 850, 1000];
const infinity = Decimal.pow(2, 1024);
const zero = new Decimal(0);

var focused = true;
window.onvisibilitychange = function() {
  focused=!focused;  
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
	updateHotkeys();
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
		document.getElementById("offline_popup").style.display = "block";
		document.getElementById("offline_progress").innerText = "Simulating " + seconds + " seconds of progress.";
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
		document.getElementById("offline_popup").style.display = "none";
	}
	if (seconds > 1000) {
		document.getElementById("offline_popup").style.display = "block";
		document.getElementById("offline_progress").innerText = offlinePopup;
	}
}

function closeOfflineProgress() {
	document.getElementById("offline_popup").style.display = "none";
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