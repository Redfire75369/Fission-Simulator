/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useEffect, useRef, useState} from "react";
import {InlineMath} from "react-katex";

import {zero} from "../../../constants.js";
import {cache, player} from "../../../data.js";
import notation from "../../../notations.js";

function OverspinUpgrade(props) {
	let up = useRef(null);

	let [rerender, setRerender] = useState(false);

	let [bought, setBought] = useState(false);
	let [cost, setCost] = useState(zero);
	let [multiplier, setMultiplier] = useState(zero);

	useEffect(function() {
		update_once();

		let update_loop_id = setInterval(function() {
			setRerender(cache.overspin.upgrades.rerender);

			update_loop();
		}, 50);

		return function() {
			clearInterval(update_loop_id);
		};
	}, []);

	function update_once() {
		up.current = player.overspin.upgrades[props.index];

		setBought(up.current.bought);
		setCost(up.current.cost);
	}
	function update_loop() {
		up.current = player.overspin.upgrades[props.index];

		setMultiplier(up.current.multiplier);
	}

	useEffect(function() {
		if (rerender) {
			update_once();
			update_loop();
			cache.overspin.upgrades.rerender = false;
		}
	}, [rerender]);

	function buy() {
		player.overspin.upgrades[props.index].buy();

		setBought(player.overspin.upgrades[props.index].bought);
	}

	return (
		<div className={"vw-20 mh2 " + (bought ? "bg-blue" : "bg-light-blue") + " b--dark-gray b--solid br1 br--bottom pointer"} onClick={buy}>
			<div className="flex flex-column items-center justify-between h4 pa3">
				<span className="flex flex-row b tc">{props.description}</span>
				{props.multiplier ? <span className="flex flex-row tc">
					Formula: <span className="f6"><InlineMath>{props.formula}</InlineMath></span>
				</span> : <></>}
				{bought && props.multiplier ? <span className="flex flex-row tc">
					Multiplier: {notation(multiplier)}
				</span> : <span className="flex flex-row tc">
					Cost: {notation(cost)} Uranium
				</span>}
			</div>
		</div>
	);
}

export default OverspinUpgrade;
