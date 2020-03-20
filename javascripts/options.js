/*Notations Change*/
const notations = ["Scientific", "Logarithmic", "Brackets", "Omega", "Cancer", "Zalgo", "Prime", "Blind"];
function notationChange() {
	player.options.notationNo = (player.options.notationNo + 1 == notations.length) ? 0 : player.options.notationNo + 1;
	player.options.notation = notations[player.options.notationNo];
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
	let save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
	player.import42 = (save == "42") ? true : player.import42;
	if (save === null) {
		return
	}
	loadSave(save, true);
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSaveString());
	alert("Save copied to clipboard");
}