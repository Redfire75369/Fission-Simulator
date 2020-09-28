const notations = ["Scientific", "Logarithmic", "Brackets", "Omega", "Imperial", "Cancer", "Zalgo", "Prime", "Blind"];
const themes = ["Light", "Dark", "Inverted", "Midnight", "Void"];

/* Save/Load */
function save() {
	saveGame();
}
function load() {
	preLoad();
	loadSave(getSave());
	postLoad();
}

/* Import/Export */
function importSave() {
	const save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
	player.import42 |= save === "42";
	if (save === null || save === "42") {
		return;
	}
	preLoad();
	loadSave(save, true);
	postLoad();
	save();
}
function exportSave() {
	save();
	copyStringToClipboard(getSaveString());
	alert("Save copied to clipboard");
}

/* Hard Reset */
function hardReset() {
	const confirmation = prompt("This will completely reset your game. If you are sure, type in “Hitchhiker's Guide to the Fusion-Driven Galaxy”");
	if (confirmation === "Hitchhiker's Guide to the Fusion-Driven Galaxy") {
		preLoad();
		player = getDefaultData();
		postLoad();
		save();
	}
}
