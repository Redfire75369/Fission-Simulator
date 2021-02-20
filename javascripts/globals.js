/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const zero = new Decimal(0);

var errored = false;
var save_game_loop;


var player;

var mobile = isMobilePortrait();

function $(element_id) {
	return document.getElementById(element_id);
}

function isMobilePortrait() {
	return window.matchMedia("(min-width: 1.56in) and (max-width: 2.73in)").matches;
}
