function init_game() {
	loadSave();
	document.getElementById("production").style.display = "none";
	document.getElementById("nanite").style.display = "none";
	document.getElementById("options").style.display = "none";
	document.getElementById(player.navigation.naviTab).style.display = "inline-block";
	targetedNotationChange(player.options.notation);
	simulateTime(Date.now() - player.lastUpdate);
}

function simulateTime(d) {
	d /= 1000;
	let ticks = 1000
	if (d < 0.05) {
		let ticks = (d * 1000)/0.05
		d = 0.05;
	}
	for (let j = 0; j < ticks; j++) {
		for (let  i = min(4, player.meteor - 4); i >= 0; i--) {
			player.reactor.amount[i - 1] = player.reactor.amount[i - 1].add(player.reactor.amount[i].multiply(player.reactor.mult[i]).multiply(x));
		}
	}
}