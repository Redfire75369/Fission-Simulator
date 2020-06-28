function updateUIStats() {
	document.getElementById("statistics_totaltime").innerText = formatTime(player.time);
	document.getElementById("statistics_totalenergy").innerText = notation(player.totalEnergy);
	document.getElementById("statistics_totalnanites").innerText = notation(player.nanites.total);
	if (player.unlocked.meltdown) {
		document.getElementById("statistics_bestmeltdowntime").innerText = formatTime(player.meltdown.bestTime);
	}
	// CodedSakura was here Jun 2020
	document.getElementById("statistics_rowbestmeltdowntime").style.display = (player.unlocked.meltdown) ? "" : "none";
}