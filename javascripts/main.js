function getDefaultData() {
	return {
		version: {
			x: 0,
			alpha: 1,
			beta: 1
		},
		
		options: {
			notation: "Scientific",
			notationNo: 0
		},
		navigation: {
			naviTab: "production",
			production: "reactors"
		},
		
		unlocked: {
				naniteUps: 0,
				meltdown: 0,
				decayHasten: 0
		},
		energy: new Decimal(80),
		totalEnergy: new Decimal(80),
		
		eff: {
			bought: 0,
			cost: new Decimal("1e+3"),
			costMult: new Decimal("1e+1"),
			costMultMult: new Decimal(10),
			mult: new Decimal(1),
			multMult: new Decimal(1.1)
		},
		reactor: {
			amount: [new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0), new Decimal(0)],
			cost: [new Decimal("1e+1"), new Decimal("1e+2"), new Decimal("1e+4"), new Decimal("1e+6"), new Decimal("1e+9"), new Decimal("1e+13"), new Decimal("1e+18"), new Decimal("1e+24")],
			costMult: [new Decimal("1e+3"), new Decimal("1e+4"), new Decimal("1e+5"), new Decimal("1e+6"), new Decimal("1e+8"), new Decimal("1e+10"), new Decimal("1e+12"), new Decimal("1e+15")],
			bought: [0, 0, 0, 0, 0, 0, 0, 0],
			mult: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
			costMultMult: new Decimal(10),
			multMult: new Decimal(2),
			maxTier: 3
		},
		
		meteor: {
			shower: 0,
			meteorMult: new Decimal(2)
		},
		
		nanites: {
			nanites: new Decimal(0),
			total: new Decimal(0),
			lastResearch: new Decimal(0),
			ups: {
				0: 0,
				11: 0,
				21: 0,
				22: 0,
				31: 0,
				32: 0,
				41: 0,
				42: 0
			},
			effUpCost: new Decimal(1),
		},
		
		meltdown: {
			corium: new Decimal(0),
			total: new Decimal(0),
			energyGoal: Decimal.pow(2, 1024),
			time: 0
		},
		
		time: 0,
		timeOnline: 0,
		lastUpdate: Date.now()
	}
}
const elements = ["Thorium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium"];
const isotopes = ["Thorium-232", "Uranium-235", "Neptunium-237", "Plutonium-241", "Americium-243", "Curium-247", "Berkelium-247", "Californium-252"];
var focused = true;

window.onfocus = function(){  
  focused=true;  
}
window.onblur = function(){  
  focused=false;  
}  

function hardReset() {
	showNaviTab("production");
	player = getDefaultData();
	localStorage.setItem("fissionSimSave", JSON.stringify(player));
}

function updateUI() {
	updateUIEnergy();
	updateUIReactors();
	updateUIEff();
	updateUIMeteor();
	updateUINaniteUps();
	updateUINaniteResearch();
	updateUIMeltdown();
	updateUIStats();
}
function updateGame(tickInterval) {
	simulateReactors(tickInterval);
	simulateEnergy(tickInterval);
}

var player = getDefaultData();

/*Game Loops*/
var saveGameLoop = setInterval(function() {
	saveGame();
}, 15000);

var updateGameLoop = setInterval(function() {
	if (Date.now() > player.lastUpdate + 1000 & focused) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	updateGame(25);
	player.lastUpdate = Date.now();
}, 25);

var updateUILoop = setInterval(function() {
	updateUI();
}, 50);

var timerLoop = setInterval(function() {
	player.time += 50;
	player.time = floor(player.time);
	player.timeOnline += 50;
	player.timeOnline = floor(player.timeOnline);
	player.meltdown.time += 50;
	player.meltdown.time = floor(player.meltdown.time);
}, 50);