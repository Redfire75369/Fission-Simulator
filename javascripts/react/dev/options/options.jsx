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
		copyStringToClipboard(get_save_string());
		alert("Save copied to clipboard");
	}

	/* Hard Reset */
	function hard_reset() {
		let confirmation = prompt("This will completely reset your game. If you are sure, type in “Fusion-Driven Galaxy”");
		if (confirmation === "Fusion-Driven Galaxy") {
			pre_load();
			player = getDefaultData();
			post_load();
			save_game();
		}



	return (
		<div className="flex flex-column">
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button onClick={save}>Save Game</button>
				</div>
				<div className="flex flex-column">
					<button onClick={load}>Load Game</button>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button onClick={import_save}>Save Game</button>
				</div>
				<div className="flex flex-column">
					<button onClick={export_save}>Load Game</button>
				</div>
			</div>
			<div className="flex flex-row">
				<div className="flex flex-column">
					<button onClick={hard_reset}>Hard Reset</button>
				</div>
				<div className="flex flex-column">
					<button onClick={}>Empty Button</button>
				</div>
			</div>
		</div>
	);
}
