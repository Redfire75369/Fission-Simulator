/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {is_mobile_portrait, persistent_cache} from "./data.js";
import {init_game} from "./init-game.js";
import render_ui from "./ui/root.jsx";

init_game();
render_ui();

document.addEventListener("keydown", function(e) {
	if (e.key === "U+000A" || e.key === "Enter" || e.keyCode === 13) {
		if (e.target.nodeName === "BUTTON") {
			e.preventDefault();
			return false;
		}
	}
}, true);

document.addEventListener("orientationchange", function() {
	persistent_cache.mobile = is_mobile_portrait();
});
