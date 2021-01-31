/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const notations = [
	"Scientific"
];

const notationFunctions = {
	"Scientific": new ADNotations.ScientificNotation()
};

function get_limit() {
	return Decimal.pow(2, 1024);
}

function notation(x, dp = 2, dp_under_1e5 = 2, show_above_infinity = false) {
	if (Decimal.gte(x, get_limit()) && notations[player.options.notation] !== "Blind" && !show_above_infinity) {
		return "Infinite";
	}
	if (Object.keys(notationFunctions).includes(notations[player.options.notation])) {
		return notationFunctions[notations[player.options.notation]].format(x, dp, dp_under_1e5);
	}
	return "NaN";
}

function formatTime(time) {
	if (notations[player.options.notation] === "Blind") {
		return "";
	} else if (time >= 31536000000) {
		return Math.floor(time / 31536000000) + " years, " + Math.floor((time % 31536000000) / 86400000) + " days, " + Math.floor((time % 86400000) / 3600000) + " hours, " + Math.floor((time % 3600000) / 60000) + " minutes, and " + Math.floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 86400000) {
		return Math.floor(time / 86400000) + " days, " + Math.floor((time % 86400000) / 3600000) + " hours, " + Math.floor((time % 3600000) / 60000) + " minutes, and " + Math.floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 3600000) {
		return Math.floor(time / 3600000) + " hours, " + Math.floor((time % 3600000) / 60000) + " minutes, and " + Math.floor(time % 60000 / 1000) + " seconds";
	} else if (time >= 60000) {
		return Math.floor(time / 60000) + " minutes, and " + Math.floor(time % 60000 / 1000) + " seconds";
	}
	return Math.round(time / 1000, 3) + " seconds";
}
