/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ScientificNotation} from "@antimatter-dimensions/notations";
import Decimal from "break_infinity.js";

import {player} from "./data.js";

const notations = [
	"Scientific"
];

const notation_functions = {
	"Scientific": new ScientificNotation()
};

export function get_limit() {
	return Decimal.pow(2, 1024);
}

export function notation(x, dp = 2, dp_under_1e5 = 2, show_above_infinity = false) {
	if (Decimal.gte(x, get_limit()) && notations[player.options.notation] !== "Blind" && !show_above_infinity) {
		return "Infinite";
	}
	if (Object.keys(notation_functions).includes(notations[player.options.notation])) {
		return notation_functions[notations[player.options.notation]].format(x, dp, dp_under_1e5);
	}
	return "NaN";
}

export function format_time(time) {
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
	return Math.round(time / 1000) + " seconds";
}

export default notation;
