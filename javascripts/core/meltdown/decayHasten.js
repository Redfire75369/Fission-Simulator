const decay = Decimal.pow(2, 0.05);

const halflife = {
	"th227": 2000
}

const alpha = {
	"th227": 1
}

const beta = {
	"th227": 0
}

const stable = [
	"pb207"
];

const decayProducts = {
	th227: "ra223",
	ra233: "rn219",
	rn219: "po215",
	po215: "pb211",
	pb211: "bi211",
	bi211: "tl207",
	tl207: "pb207"
};

const tieredFuels = [
	"th227",
	"u235",
	"np234",
	"pu237",
	"am242m",
	"cu245",
	"bk248",
	"cf251"
];

function showToggleReactors() {
	document.getElementById("toggle_reactors_popup").style.display = "";
}
function hideToggleReactors() {
	document.getElementById("toggle_reactors_popup").style.display = "none";
}

function showSelectIsotope() {
	if (document.getElementById("isotope_dropdown").style.display == "none") {
		document.getElementById("isotope_dropdown").style.display = "";
	} else {
		document.getElementById("isotope_dropdown").style.display = "none";
	}
}

function selectIsotope(isotope) {
	document.getElementById("isotope_dropdown").style.display = "none";
	for (let i = 0, ii = Object.keys(player.isotopes); i < ii.length; i++) {
		if (!stable.includes(ii[i])) {
			document.getElementById("isotope_decay_" + ii[i]).style.display = "none";
		}
	}
	document.getElementById("isotope_decay_" + isotope).style.display = "";
}

function startDecayIsotope(isotope) {
	player.decaying = isotope;
}

function simulateFuelStorage(tickInterval = 50) {
	for (let i = 0; i < 1; i++) {
		if (!player.reactors[i].enabled) {
			player.isotopes[tieredFuels[i]] = player.isotopes[tieredFuels[i]].add(getTotalFuelGain(i).mul(tickInterval / 1000));
		}
		if (player.isotopes[tieredFuels[i]].gte(Decimal.pow(2, 64 * (9 - (i + 1))))) {
			player.meltdown.time = 0;
			player.meltdown.amount += meltdownGain();

			resetEnergy();
			resetEff();
			resetMines();
			resetReactors();
			resetTurbineRotors();
			resetDynamoCoils();
			resetNucleosynthesis();
			resetNaniteResearch();
			resetNaniteUps();
		}
	}
}

function simulateDecayIsotope(isotope, tickInterval = 50) {
	if (player.meltdown.corium.gte(tickInterval / 1000)) {
		player.meltdown.corium = player.meltdown.corium.sub(tickInterval / 1000);
		let output = decayProducts[isotope];
		let decay = Decimal.pow(2, - tickInterval / halflifes[isotope]);
		let decayAbsolute = player.isotopes[isotope].sub(player.isotopes[isotope].div(decay));

		player.alpha = player.alpha.add(decayAbsolute.mul(alphaDecays[isotope]));

		player.isotopes[output]= player.isotopes[output].add(decayAbsolute);
		player.isotopes[isotope] = player.isotopes[isotope].div(decay);
	} else {
		//player.decaying.remove(isotope);
	}
}

function updateUIDecayHastening() {
	document.getElementById("alpha_particles").innerText = notation(player.alpha);

	for (let i = 0, ii = Object.keys(player.isotopes); i < ii.length; i++) {
		document.getElementById("stored_isotope_" + ii[i]).innerText = notation(player.isotopes[ii[i]]);
	}
}