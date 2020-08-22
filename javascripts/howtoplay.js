function updateUIHowToPlay() {
	document.getElementById("how_to_play_reactor_pebblebed_span1").style.display = player.unlocked.mines ? "" : "none";

	document.getElementById("how_to_play_fuel_triso").style.display = player.unlocked.mines ? "" : "none";
	document.getElementById("how_to_play_mines").style.display = player.unlocked.mines ? "" : "none";
	document.getElementById("how_to_play_fuel_triso_span1").style.display = player.unlocked.fuelReprocessing ? "" : "none";
}
