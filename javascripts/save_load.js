/*Save/Load*/
function getSaveString() {
	return btoa(JSON.stringify(player));
}
function getSave() {
	if (!localStorage.getItem("fissionSimSave")) return;
	return JSON.parse(atob(localStorage.getItem("fissionSimSave")));
}
function saveGame() {
	localStorage.setItem("fissionSimSave", getSaveString());
}
function loadSave(save) {
	if (save === undefined) {
		return;
	} else {
		for (let key in player) {
			if (player[key] instanceof HashMap) {
				for (let k in player[key]) {
					if (Array.isArray(player[key][k])) {
						for (let ki in player[key][k]) {
							if (getDefaultData[key][k][ki].isDecimal()) {
								player[key][k][ki] = new Decimal(save[key][k][ki)];
							}
							if (player[key][k][ki] === undefined) {
								player[key][k][ki] = getDefaultData()[key][k][ki]
							}
						}
					}
				}
			} else if (player[key] instanceof Array) {
				for (let k in player[key]) {
					player[key][k] = save[key][k];
					if (player[key][k] === undefined) {
						player[key][k] = getDefaultData()[key][k];
					}
				}
			} else {
				player[key] = save[key];
				if (player[key] === undefined) {
					player[key] = getDefaultData()[key];
				}
			}
		}
	}
}