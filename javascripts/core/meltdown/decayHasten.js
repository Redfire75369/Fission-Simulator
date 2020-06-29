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

function getFuelFromTier(tier) {
	switch (tier) {
		case 0:
			return "th227";
		default:
			return "th227";
	}
}

function getDecayProduct(isotope) {
	switch (isotope) {
		case "th227":
			return "ra223";
		case "ra223":
			return "rn219";
		case "rn219":
			return "po215";
		case "po215":
			return "pb211";
		case "pb211":
			return "bi211";
		case "bi211":
			return "tl207";
		case "tl207":
			return "pb207";
		default:
			return "ra223";
	}
}

function showSelectIsotope() {
	document.getElementById("isotope_dropdown").classList.toggle("visible");
}

/*window.onclick = function(event) {
	if (!event.target.id == "select_isotope_dropdown") {
		console.log("hiding");
		var dropdowns = document.getElementsByClassName("dropdownisotope");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			openDropdown.style.display = openDropdown.style.display == "none" ? "block" : "none";
		}
	}
}*/

function selectIsotope(isotope) {
	document.getElementById("isotope_dropdown").style.display = "none";
	for (let i = 0, ii = Object.keys(player.isotopes).length; i < ii.length; i++) {
		document.getElementById("isotope_decay_" + isotope).style.display = "none";
	}
	document.getElementById("isotope_decay_" + isotope).style.display = "inline-block";
}

function simulateFuelStorage(tickInterval = 50) {
	for (let i = 0; i < 8; i++) {
		if (!player.reactors[i].enabled) {
			player.isotopes[getFuelFromTier(i)].add(getTotalFuelGain(i).mul(tickInterval / 1000));
		}
		if (player.isotopes[getFuelFromTier(i)].gte(Decimal.pow(2, 64 * (9 - tier)))) {
			player.meltdown.time = 0;
			player.meltdown.amount += meltdownGain();
			resetEnergy();
			resetEff();
			resetMines();
			resetReactors();
			resetNucleosynthesis();
			resetNaniteResearch();
			resetNaniteUps();
		}
	}
}

function startDecayIsotope(isotope) {
	//player.decaying.add(isotope);
}

function simulateDecayIsotope(isotope, tickInterval = 50) {
	if (player.meltdown.corium.gte(1)) {
		let output = getDecayProduct(isotope);
		player.alpha = player.alpha.add(player.isotopes[isotope].sub(player.isotopes[isotope].div(decay)));
		player.isotopess[output]= player.isotopes[output].add(player.isotopes[isotope].sub(player.isotopes[isotope].div(decay)));
		player.isotopes[isotope] = player.isotopes[isotope].div(decay);
		player.meltdown.corium = player.meltdown.corium.sub(1);
	} else {
		//player.decaying.remove(isotope);
	}
}