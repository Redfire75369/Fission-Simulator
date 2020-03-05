function updateUIStats() {
	document.getElementById("statsTimePlayedTotal").innerText = formatTime(player.time);
	document.getElementById("statsTotalEnergy").innerText = notation(player.totalEnergy);
	document.getElementById("statsTotalNanites").innerText = notation(player.nanites.total);
}