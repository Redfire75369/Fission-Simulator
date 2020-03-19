function updateUIStats() {
	document.getElementById("statsTimePlayedTotal").innerText = formatTime(player.time);
	document.getElementById("statsTotalEnergy").innerText = notation(player.totalEnergy);
	document.getElementById("statsTotalNanites").innerText = notation(player.nanites.total);
	if (player.unlocked.meltdown) {
		document.getElementById("statsFastestMeltdown").innerText = formatTime(player.meltdown.bestTime);
	}
	document.getElementById("fastestMeltdown").style.display = (player.unlocked.meltdown) ? "table-row" : "none";
}