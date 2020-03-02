function updateUIStats() {
	document.getElementById("statsTotalEnergy").innerText = notation(player.totalEnergy);
	document.getElementById("statsTotalNanites").innerText = notation(player.nanites.total);
}