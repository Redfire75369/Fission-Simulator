/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useEffect, useState} from "react";

import {player} from "../data.js";
import notation from "../notations.js";

function Resources(props) {
	let [energy, setEnergy] = useState(player.energy);
	let [uranium, setUranium] = useState(player.overspin.uranium);

	useEffect(function() {
		let update_loop_id = setInterval(function() {
			setEnergy(player.energy);
			setUranium(player.overspin.uranium);
		}, 50);

		return function() {
			clearInterval(update_loop_id);
		};
	}, []);

	return (
		<div className="flex flex-column items-center justify-center pa2">
			<span className="flex flex-row">You have {notation(energy)} J of Energy</span>
			{props.unlocked.overspin.overspin ? <span className="flex flex-row">
				You have {notation(uranium)} Weapon-Grade Uranium
			</span> : <></>}
		</div>
	);
}

export default Resources;
