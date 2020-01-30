/*Notations Change*/
function notationChange() {
	let notations = ["Scientific", "Logarithmic", "Engineering", "Standard", "YesNo"];
	if (player.options.notationNo + 1 == notations.length) {
		player.options.notationNo = 0;
		player.options.notation = notations[player.options.notationNo];
		document.getElementById("notation").innerText = "Notation: " +  player.options.notation;
	} else {
		player.options.notationNo += 1;
		player.options.notation = notations[player.options.notationNo];
		document.getElementById("notation").innerText = "Notation: " + player.options.notation;
	}
}

function targetedNotationChange(notation) {
	while (player.options.notation != notation) {
		notationChange();
	}
}

/*Import/Export*/
function importSave() {
}
function exportSave() {
}