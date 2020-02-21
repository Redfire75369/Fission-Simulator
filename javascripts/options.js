/*Notations Change*/
function notationChange() {
	let notations = ["Scientific", "Logarithmic", "Brackets", "Omega", "Cancer", "Zalgo", "Prime", "Blind"];
	if (player.options.notationNo + 1 == notations.length) {
		player.options.notationNo = 0;
		player.options.notation = notations[player.options.notationNo];
	} else {
		player.options.notationNo += 1;
		player.options.notation = notations[player.options.notationNo];
	}
	document.getElementById("notation").innerText = "Notation: " + player.options.notation;
}

function targetedNotationChange(notation) {
	while (player.options.notation != notation) {
		notationChange();
	}
	document.getElementById("notation").innerText = "Notation: " + player.options.notation;
}

/*Save/Load*/
function save() {
	saveGame();
}
function load() {
	loadSave(getSave());
}

/*Import/Export*/
function importSave() {
	var save = prompt("Input your save (your current save file will be overwritten!)");
	loadSave(save, true);
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSaveString());
}