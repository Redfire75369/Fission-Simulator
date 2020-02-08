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
		for (let a in player) {
			switch (getType(player[a])) {
				case "object":
					for (let b in player[a]) {
						switch (getType(player[a][b])) {
							case "Array":
								for (let c in player[a][b]) {
									if (Decimal.isDecimal(getDefaultData()[a][b][c])) {
										player[a][b][c] = new Decimal(save[a][b][c]);
									} else {
										player[a][b][c] = save[a][b][c];
									}
								}
								break;
							default:
								if (Decimal.isDecimal(getDefaultData()[a][b])) {
									player[a][b] = new Decimal(save[a][b]);
								} else {
									player[a][b] = save[a][b];
								}
						}
					}
					break;
				default:
					if (Decimal.isDecimal(getDefaultData()[a])) {
						player[a] = new Decimal(save[a]);
					} else {
						player[a] = save[a];
					}
			}
		}
	}
}