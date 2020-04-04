const notations = ["Scientific", "Logarithmic", "Brackets", "Omega", "Cancer", "Zalgo", "Prime", "Blind"];
const themes = ["Light", "Dark", "Inverted", "Midnight", "Void"];

/*Notations Change*/
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

/*Theme Change*/
function themeChange() {
	player.options.themeNo = (player.options.themeNo + 1 == themes.length) ? 0 : player.options.themeNo + 1;
	player.options.theme = themes[player.options.themeNo];
	document.getElementById("theme").innerText = "Theme: " + player.options.theme;
	document.getElementById("style").setAttribute("href", "stylesheets/" + player.options.theme.toLowerCase() + ".css");
}

function targetedThemeChange(theme) {
	while (player.options.theme != theme) {
		themeChange();
	}
	document.getElementById("theme").innerText = "Theme: " + player.options.theme;
	document.getElementById("style").setAttribute("href", "stylesheets/" + player.options.theme.toLowerCase() + ".css");
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
	if (save === null || save == "42") {
		return;
	}
	loadSave(save, true);
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSaveString());
	alert("Save copied to clipboard");
}