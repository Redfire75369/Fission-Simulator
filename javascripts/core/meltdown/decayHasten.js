const halflives = {
	"th227": 2000
};

const alpha = {
	"th227": 1
};

const beta = {
	"th227": 0
};

const stable = [
	"pb207"
];

const decayProducts = {
	th227: "ra223",
	ra223: "rn219",
	rn219: "po215",
	po215: "pb211",
	pb211: "bi211",
	bi211: "tl207",
	tl207: "pb207"
};

const isotopeDisplayNames = {
	th227: "Thorium-227",
	ra223: "Radium-223",
	rn219: "Radon-219",
	po215: "Polonium-215",
	pb211: "Lead-211",
	bi211: "Bismuth-211",
	tl207: "Thallium-207",
	pb207: "Lead-207"
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
	if (document.getElementById("isotope_dropdown").style.display === "none") {
		document.getElementById("isotope_dropdown").style.display = "";
	} else {
		document.getElementById("isotope_dropdown").style.display = "none";
	}
}

function startDecayIsotope(isotope) {
	if (player.decay.decaying.includes(isotope)) {
		player.decay.decaying.splice(player.decay.decaying.indexOf(isotope), 1);
	} else {
		player.decay.decaying.push(isotope);
	}
}

function simulateFuelStorage(tickInterval = 50) {
	for (let i = 0; i < 1; i++) {
		if (!player.reactors[i].enabled) {
			player.decay.isotopes[tieredFuels[i]] = player.decay.isotopes[tieredFuels[i]].add(getTotalFuelGain(i).mul(tickInterval / 1000));
		}
		if (player.decay.isotopes[tieredFuels[i]].gte(Decimal.pow(2, 64 * (9 - (i + 1))))) {
			player.meltdown.time = 0;
			player.meltdown.amount += meltdownGain();

			resetEnergy();
			resetMines();
			resetNucleosynthesis();
			resetNaniteResearch();
			resetNaniteUps();
		}
	}
}

function simulateDecayIsotope(isotope, tickInterval = 50) {
	if (player.decay.decaying.includes(isotope)) {
		if (player.meltdown.corium.gte(player.decay.coriumUse.mul(tickInterval).div(1000))) {
			player.meltdown.corium = player.meltdown.corium.sub(player.decay.coriumUse.mul(tickInterval).div(1000));

			let output = decayProducts[isotope];
			let decay = Decimal.pow(2, player.decay.speed.mul(- tickInterval).div(halflives[isotope])).div(player.decay.temperatures[isotope].div(5900).add(1));
			let decayAbsolute = player.decay.isotopes[isotope].sub(player.decay.isotopes[isotope].mul(decay));

			player.decay.alpha = player.decay.alpha.add(decayAbsolute.mul(alpha[isotope]).mul(player.decay.alphaOutput));
			player.decay.temperatures[isotope] = player.decay.temperatures[isotope].add(halflives[isotope] * tickInterval / 1000);

			player.decay.isotopes[output] = player.decay.isotopes[output].add(decayAbsolute);
			player.decay.isotopes[isotope] = player.decay.isotopes[isotope].mul(decay);
		} else {
			player.decay.decaying.splice(player.decay.decaying.indexOf(isotope), 1);
		}
	} else {
		player.decay.temperatures[isotope] = player.decay.temperatures[isotope].sub(halflives[isotope] * tickInterval / 125).max(295);
	}
}

function updateUIDecayHastening() {
	document.getElementById("alpha_particles").innerText = notation(player.decay.alpha);

	let str = "";
	for (let i = 0; i < player.decay.decaying.length; i++) {
		if (i === 0 || i === player.decay.decaying.length - 2) {
			str += isotopeDisplayNames[player.decay.decaying[i]] + " ";
		} else if (i === player.decay.decaying.length - 1) {
			str += "and " + isotopeDisplayNames[player.decay.decaying[i]];
		} else {
			str += isotopeDisplayNames[player.decay.decaying[i]] + ", ";
		}
	}
	/*document.getElementById("decaying_isotopes").innerText = str;

	for (let i = 0, ii = Object.keys(player.decay.isotopes); i < ii.length; i++) {
		document.getElementById("stored_isotope_" + ii[i]).innerText = notation(player.decay.isotopes[ii[i]]);
	}*/
}
