/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function get_default_data() {
	return {
		version: {
			major: 0,
			minor: 1,
			hotfix: 3
		},

		navigation: {
			primary: "reactors"
		},
		options: {
			notation: 0
		},

		unlocked: {
			light_water: {
				centrifuge: false
			},
			overspin: {
				overspin: false
			}
		},

		last_update: Date.now(),

		energy: new Decimal(100),
		total_energy: zero,

		fuels: {
			light_water: new LightWaterFuel()
		},
		reactors: {
			light_water: new LightWaterReactor()
		},
		centrifuges: {
			light_water: new LightWaterCentrifuge()
		},

		overspin: {
			uranium: zero
		}
	};
}

function get_default_cache() {
	return {
		popups: [],
		light_water: {
			rerender: false
		},
	};
}

player = get_default_data();
cache = get_default_cache();

document.addEventListener("keydown", function(e) {
	if (e.key === "U+000A" || e.key === "Enter" || e.keyCode === 13) {
		if (e.target.nodeName === "BUTTON") {
			e.preventDefault();
			return false;
		}
	}
}, true);

document.addEventListener("orientationchange", function () {
	mobile = is_mobile_portrait();
});

function update_game(tick_interval = 50) {
	simulate_light_water_reactor(tick_interval);
	simulate_light_water_centrifuge(tick_interval);
}

function simulate_time(seconds, actual) {
	let ticks = seconds * 20;
	let tick_interval = 50;
	if (ticks > 1000 && !actual) {
		tick_interval += (ticks - 1000) / 20;
		ticks = 1000;
	}

	// const start = Object.assign({}, player);
	for (let complete = 0; complete < ticks; complete++) {
		update_game(tick_interval);
		player.last_update = Date.now();
	}

	player.time += seconds * 1000;
}
