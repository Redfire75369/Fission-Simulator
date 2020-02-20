function init_game() {
	loadSave();
	document.getElementById("production").style.display = "none";
	document.getElementById("nanite").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById(player.navigation.naviTab).style.display = "inline-block";
	targetedNotationChange(player.options.notation);
	simulateTime(player.lastUpdate - Date.now());
}

function simulateTime(x) {
	x /= 1000;
	let ticks = 1000
	if (x < 0.05) {
		let ticks = x/0.05
		x = 0.05;
	}
	for (let j = 0; j < ticks; j++) {
		for (let  i= min(4, player.meteor - 4); i >= 0; i--) {
			player.reactor.amount[a] += player.reactor.amount[i].multiply(player.reactor.mult[i]).multiply(x);
		}
	}
}