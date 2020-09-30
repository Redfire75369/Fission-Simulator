function getDefaultData() {
	return {
		version: {
			release: 0,
			beta: 6,
			alpha: 12
		},

		options: {
			notation: 0,
			theme: 0
		},

		navigation: {
			naviTab: "production_tab",
			production: "reactors",
			meltdown: "ups_subtab",
			decay: "decay_subsubtab"
		},

		unlocked: {
			mines: false,
			prestige: false,
			naniteUps: false,
			meltdown: false,
			decayHasten: false
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

		energy: new Decimal(10),
		totalEnergy: new Decimal(10),

		moderator: 0,

		mines: new Mines(),
		fuels: {
			triso: [
				new TRISOFuel(0),
				new TRISOFuel(1),
				new TRISOFuel(2)
			]
		},
		reactors: {
			pebblebeds: [
				new PebblebedFissionReactor(0, 1, 2, 10),
				new PebblebedFissionReactor(1, 4, 6, 10),
				new PebblebedFissionReactor(2, 15, 10, 10)
			]
		},

		/*turbine: {
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
				steel: 1,
				titanium: 0,
				osmiridium: 0,
				extreme: 0,
				sicsiccmc: 0
			},
			activeRotor: "steel",
			activeCoil: "none",
			dimensions: 3,
			bearingDimensions: 1
		},*/

		prestige: {
			americium: 0,
			prestiges: 0,
			researchPoints: 0,
			respec: false,
			researches: [
				1,
				1,
				1,
				1
			]
		},

		nucleosynthesis: 0,

		nanites: {
			nanites: new Decimal(0),
			total: new Decimal(0),
			ups: [
				new TurbineNaniteUpgrade(),
				new NaniteUpgrade(11, 1),
				new NaniteUpgrade(12, 1),
				new NaniteUpgrade(21, 2),
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
				new MeltdownUpgrade(14, 2, 1, 1),
				new MeltdownUpgrade(21, 2, 1, 1),
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

		automation: {
			reactors: {
				pebblebeds: {
					buy: [
						new PebblebedBuyAutomation(2500, 0),
						new PebblebedBuyAutomation(6000, 1),
						new PebblebedBuyAutomation(20000, 2)
					],
					fuel: [
						new PebblebedFuelAutomation(2500, 0),
						new PebblebedFuelAutomation(6000, 1),
						new PebblebedFuelAutomation(20000, 2)
					]
				}
			},
			fuels: {
				triso: [
					new TRISOReprocessAutomation(2500, 0),
					new TRISOReprocessAutomation(6000, 1),
					new TRISOReprocessAutomation(20000, 2)
				]
			}
		},

		imported42: false,

		time: 0,
		timeOnline: 0,
		lastUpdate: Date.now()
	};
}

const isotopes = ["Thorium-227", "Uranium-235", "Neptunium-234", "Plutonium-237", "Americium-242m", "Curium-245", "Berkelium-248", "Californium-251"];
const notations = ["Scientific", "Logarithmic", "Brackets", "Omega", "Imperial", "Cancer", "Zalgo", "Prime", "Blind"];
const themes = ["Light", "Dark", "Inverted", "Midnight", "Void"];

//const diminishFactor = [100, 200, 350, 488, 600, 733, 850, 1000];
const infinity = Decimal.pow(2, 1024);
const zero = new Decimal(0);

var player = getDefaultData();

var focused = true;
window.onvisibilitychange = function() {
	focused = !focused;
	/*if (focused) {
		nextNews();
	}*/
};

function updateUI() {
	updateUIEnergy();
	updateUIHowToPlay();
}
function updateGame(tickInterval = 50) {
	simulateTRISOFuel(tickInterval);
	simulateMines(tickInterval);
	simulatePebblebedReactors(tickInterval);
	simulateTRISOAutomation(tickInterval);
	simulatePebblebedAutomation(tickInterval);
	//simulateFuelStorage(tickInterval);
	//simulateDecayIsotope("th227", tickInterval);
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
	if (ticks > 1000 && !actual) {
		tickInterval += (ticks - 1000) / 20;
		ticks = 1000;
	}
	let start = Object.assign({}, player);
	for (let complete = 0; complete < ticks; complete++) {
		/*if (testing) {
			buyMaxAll();
		}*/
		updateGame(tickInterval);
		player.lastUpdate = Date.now();
	}

	player.time += seconds * 1000;
	player.meltdown.time += seconds * 1000;

	let offlinePopup = "While you were away, ";
	if (player.energy.gt(start.energy)) {
		offlinePopup += "your energy increased by " + notation(player.energy.log10() - start.energy.log10()) + " Orders of Magnitude.";
	}
	if (offlinePopup === "While you were away, ") {
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
