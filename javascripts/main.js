function getDefaultData() {
	return {
		version: {
			release: 0,
			beta: 5,
			alpha: 6
		},

		options: {
			notation: "Scientific",
			notationNo: 0,
			theme: "Light",
			themeNo: 0
		},

		navigation: {
			naviTab: "production_tab",
			production: "mines_subtab",
			meltdown: "ups_subtab",
			decay: "decay_subsubtab"
		},

		unlocked: {
			coils: false,
			naniteUps: false,
			meltdown: true,
			decayHasten: true
		},

		achievements: {
			11: false,
			12: false,
			13: false,
			14: false,
			15: false,
			16: false,
			17: false,
			18: false,
			21: false,
			22: false,
			23: false,
			24: false,
			25: false,
			26: false,
			27: false,
			28: false
		},

		energy: new Decimal(100),
		totalEnergy: new Decimal(100),

		moderator: 0,

		eff: new Efficiency(1e3, 1e1),
		mines: [
			new Mine(1, 2),
			new Mine(2, 3),
			new Mine(5, 4),
			new Mine(7, 6),
			new Mine(10, 8),
			new Mine(12, 11),
			new Mine(15, 14),
			new Mine(18, 17)
		],
		reactors: [
			new Reactor(1, 2),
			new Reactor(2, 3),
			new Reactor(5, 4),
			new Reactor(7, 5),
			new Reactor(10, 7),
			new Reactor(12, 9),
			new Reactor(15, 11),
			new Reactor(18, 12)
		],

		turbine: {
			rotors: [
				rotors.none,
				rotors.none,
				rotors.none
			],
			coils: [
				["none", "none", "none"],
				["none", "bearing", "none"],
				["none", "none", "none"]
			],
			totalRotors: {
				steel: 4,
				titanium: 0,
				osmiridium: 0,
				extreme: 0,
				sicsiccmc: 0
			},
			activeRotor: "steel",
			activeCoil: "none",
			dimensions: 3,
			bearingDimensions: 1
		},

		nucleosynthesis: 0,

		nanites: {
			nanites: new Decimal(0),
			total: new Decimal(0),
			ups: [
				new EfficiencyNaniteUpgrade(),
				new NaniteUpgrade(11, 1),
				new NaniteUpgrade(12, 2),
				new NaniteUpgrade(21, 1),
				new NaniteUpgrade(22, 2),
				new NaniteUpgrade(31, 3),
				new NaniteUpgrade(32, 4),
			]
		},

		meltdown: {
			totalNanites: new Decimal(0),

			amount: 0,
			corium: new Decimal(0),
			total: new Decimal(0),

			energyGoal: Decimal.pow(2, 1024),
			time: 0,
			bestTime: 756864000000,
			ups: [
				new MeltdownUpgrade(11, 1, 1, 1),
				new MeltdownUpgrade(12, 1, 1, 1),
				new MeltdownUpgrade(13, 1, 1, 1),
				new MeltdownUpgrade(14, 1, 1, 1),
				new MeltdownUpgrade(21, 1, 1, 1),
				new MeltdownUpgrade(22, 1, 1, 1),
				new MeltdownUpgrade(23, 1, 1, 1),
				new MeltdownUpgrade(24, 1, 1, 1),
				new MeltdownUpgrade(31, 1, 1, 1),
				new MeltdownUpgrade(32, 1, 1, 1),
				new MeltdownUpgrade(33, 1, 1, 1),
				new MeltdownUpgrade(34, 1, 1, 1),
				new MeltdownUpgrade(41, 1, 4, 2),
				new MeltdownUpgrade(42, 1, 4, 2),
				new MeltdownUpgrade(43, 1, 4, 2),
				new MeltdownUpgrade(44, 1, 4, 2),
			]
		},

		decay: {
			alpha: new Decimal(0),
			beta: new Decimal(0),
	
			isotopes: {
				"th227": new Decimal(0),
				"ra223": new Decimal(0),
				"rn219": new Decimal(0),
				"po215": new Decimal(0),
				"pb211": new Decimal(0),
				"bi211": new Decimal(0),
				"tl207": new Decimal(0),
				"pb207": new Decimal(0)
			},
			temperatures: {
				"th227": new Decimal(295),
				"ra223": new Decimal(295),
				"rn219": new Decimal(295),
				"po215": new Decimal(295),
				"pb211": new Decimal(295),
				"bi211": new Decimal(295),
				"tl207": new Decimal(295),
				"pb207": new Decimal(295)
			},
			decaying: [],
			
			speed: new Decimal(1),
			alphaOutput: new Decimal(1),
			betaOutput: new Decimal(1),
			coriumUse: new Decimal(1)
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
	focused = !focused;
	if (focused) {
		nextNews();
	}
}

function updateUI() {
	updateUIEnergy();
	updateUIMaxAll();
	updateUIFuel();
	updateUIMines();
	updateUIReactors();
	updateUITurbineRotors();
	updateUIDynamoCoils();
	updateUIEff();
	updateUINucleosynthesis();
	updateUINaniteUps();
	updateUINaniteResearch();
	updateUIMeltdown();
	updateUIMeltdownUps();
	updateUIDecayHastening();
	updateUIAchievements();
	updateUIStats();
}
function updateGame(tickInterval = 50) {
	if (leverMaxAll) {
		buyMaxAll();
	}
	simulateMines(tickInterval);
	simulateReactors(tickInterval);
	simulateTurbine(tickInterval);
	simulateFuelStorage(tickInterval);
	simulateDecayIsotope("th227", tickInterval);
	checkAchievementCompletion();
}

/* Offline Progress */
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
