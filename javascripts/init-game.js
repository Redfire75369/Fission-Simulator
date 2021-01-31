function pre_load() {}

function post_load() {}

function init_game() {
	pre_load();
	load_save();
	post_load();

	if (Date.now() > player.lastUpdate + 1000) {
		simulate_time((Date.now() - player.lastUpdate) / 1000);
	}
	//nextNews();

	/*Game Loops*/
	save_game_loop = setInterval(function() {
		save_game();
	}, 15000);

	setInterval(function() {
		try {
			if (player.lastUpdate === undefined) {
				player.lastUpdate = Date.now();
			}
			if (Date.now() > player.lastUpdate && document.visibilityState === "visible") {
				simulate_time((Date.now() - player.lastUpdate) / 1000);
			}
		} catch (e) {
			if (!errored) {
				alert("The game has encountered a fatal error. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
				alert("--DEBUG Information--\n" + e.stack);
				console.error(e);
				errored = true;
			}
		}
	}, 25);
}

init_game();
