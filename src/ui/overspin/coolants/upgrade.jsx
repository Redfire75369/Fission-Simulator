/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useEffect, useState} from "react";

import {player} from "../../../data.js";
import notation from "../../../notations.js";

function OverspinCoolantUpgrade(props) {
	const [cost, setCost] = useState(props.upgrades[props.id].cost);

	useEffect(function() {
		setCost(props.upgrades[props.id].cost);
	}, [props.upgrades]);

	function onClick() {
		player.overspin.coolant.upgrades[props.id].buy();

		const upgrades = [...props.upgrades];
		upgrades[props.id] = player.overspin.coolant.upgrades[props.id];
		props.setUpgrades(upgrades);
	}

	return (
		<div className="flex flex-column items-center justify-start mh3">
			<div className={"min-vh-40 w3 bg-" + props.colour}/>
			<div>{props.type}</div>
			<button onClick={onClick}>
				Upgrade for {notation(cost)} J
			</button>
		</div>
	);
}

export default OverspinCoolantUpgrade;
