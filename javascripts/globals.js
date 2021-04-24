/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const zero = new Decimal(0);

var errored = false;
var save_game_loop;

var cache;
var player;

var mobile = is_mobile_portrait();

function is_mobile_portrait() {
	return window.matchMedia("only (max-height: 8.5in) and (max-width: 4in) and (orientation: portrait)").matches;
}

function $(element_id) {
	return document.getElementById(element_id);
}
