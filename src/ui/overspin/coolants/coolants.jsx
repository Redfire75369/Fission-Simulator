/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useEffect, useRef, useState} from "react";

import OverspinCoolantUpgrade from "./upgrade.jsx";
import {zero} from "../../../constants.js";
import {cache, player} from "../../../data.js";
import notation from "../../../notations.js";

function OverspinCoolants() {
	const coolants = [
		"Light Water",
		"Heavy Water",
		"Pressurised Light Water",
		"Pressurised Heavy Water"
	];

	let coolant = useRef(player.overspin.coolant);
	let [rerender, setRerender] = useState(false);

	let [tier, setTier] = useState(0);
	let [upgrades, setUpgrades] = useState([]);
	let [cost, setCost] = useState(zero);

	useEffect(function() {
		update_once();
		const update_loop_id = setInterval(function() {
			setRerender(cache.overspin.coolants.rerender);
		}, 50);

		return function() {
			clearInterval(update_loop_id);
		};
	}, []);

	useEffect(function() {
		if (rerender) {
			update_once();
			cache.overspin.coolants.rerender = false;
		}
	}, [rerender]);

	function update_once() {
		coolant.current = player.overspin.coolant;

		setTier(coolant.current.tier);
		setUpgrades(coolant.current.upgrades);
		setCost(coolant.current.cost);
	}

	useEffect(function() {
		setCost(coolant.current.cost);
	}, [tier]);


	function upgradeCoolant() {
		player.overspin.coolants.buy();

		coolant.current = player.overspin.coolant;
		setTier(player.overspin.coolant.tier);
	}

	return (
		<div className={"flex flex-column justify-center"}>
			{coolant < coolants.length ? <div className="flex flex-row items-center justify-center mv3">
				<button onClick={upgradeCoolant}>
					Upgrade Coolant to {coolants[coolant + 1]} for {notation(cost)} J
				</button>
			</div> : <></>}
			<div className="flex flex-row items-center justify-center">
				<OverspinCoolantUpgrade colour="blue" type="Flow Rate" id={0} upgrades={upgrades} setUpgrades={setUpgrades}/>
				<OverspinCoolantUpgrade colour="green" type="Stability" id={1} upgrades={upgrades} setUpgrades={setUpgrades}/>
				{coolant > 1 ? <OverspinCoolantUpgrade colour="purple" type="Pressure" id={2} upgrades={upgrades} setUpgrades={setUpgrades}/> : <></>}
			</div>
		</div>
	);
}

export default OverspinCoolants;
