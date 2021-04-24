/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function OptionsComponent() {
	/* Saving & Loading */
	function save() {
		save_game();
	}

	function load() {
		pre_load();
		load_save(get_save());
		post_load();
	}

	/* Imports & Exports */
	function import_save() {
		let save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
		if (save === null) {
			return;
		}
		pre_load();
		load_save(save, true);
		post_load();
		save_game();
	}

	function export_save() {
		save_game();
		copy_string_to_clipboard(get_save_string());
		alert("Save copied to clipboard");
	}

	/* Hard Reset */
	function hard_reset() {
		let confirmation = prompt("This will completely reset your game. If you are sure, type in “Fusion-Driven Galaxy”");
		if (confirmation === "Fusion-Driven Galaxy") {
			pre_load();
			player = get_default_data();
			post_load();
			save_game();
		}
	}


	return (
		<div className="flex flex-column items-center justify-center">
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1" onClick={save}>Save Game</button>
				</div>
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1" onClick={load}>Load Game</button>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1" onClick={import_save}>Import Save</button>
				</div>
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1" onClick={export_save}>Export Save</button>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1" onClick={hard_reset}>Hard Reset</button>
				</div>
				<div className="flex flex-column">
					<button className="bg-washed-red b--light-red br1 bw1 ma1">Empty Button</button>
				</div>
			</div>
		</div>
	);
}
