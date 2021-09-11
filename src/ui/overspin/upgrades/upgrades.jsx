/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React from "react";

import OverspinUpgrade from "./upgrade.jsx";
import {persistent_cache} from "../../../data.js";

function OverspinUpgrades() {
	const upgrade_descriptions = [
		"Increase Fuel Density based on Reactor Upgrades",
		"Decrease Centrifuge Time from 8000 ms to 5000ms",
		"Increase Quantity of Fuel Mined and Fuel Usage based on Energy",
		"Increase Centrifuge Softcap based on Weapon-Grade Uranium",
		"Unlocks ???????"
	];

	const upgrade_formulas = [
		"r^{1.5}",
		"log_{15}(e)",
		"\\frac{u}{6}"
	];

	return !persistent_cache.mobile ? <div className="flex flex-column items-center justify-center">
		<div className="flex flex-row items-center justify-center mv1">
			<OverspinUpgrade index={0} description={upgrade_descriptions[0]} multiplier={true} formula={upgrade_formulas[0]}/>
			<OverspinUpgrade index={1} description={upgrade_descriptions[1]} multiplier={false}/>
			<OverspinUpgrade index={2} description={upgrade_descriptions[2]} multiplier={true} formula={upgrade_formulas[1]}/>
			<OverspinUpgrade index={3} description={upgrade_descriptions[3]} multiplier={true} formula={upgrade_formulas[2]}/>
		</div>
		<div className="flex flex-row items-center justify-center mv1">
			<OverspinUpgrade index={4} description={upgrade_descriptions[4]} multiplier={false}/>
		</div>
	</div> : <div className="flex flex-column items-center justify-center">
		<div className="flex flex-row items-center justify-center mv1">
			<OverspinUpgrade index={0} description={upgrade_descriptions[0]} multiplier={true} formula={upgrade_formulas[0]}/>
			<OverspinUpgrade index={1} description={upgrade_descriptions[1]} multiplier={false}/>
		</div>
		<div className="flex flex-row items-center justify-center mv1">
			<OverspinUpgrade index={2} description={upgrade_descriptions[2]} multiplier={true} formula={upgrade_formulas[1]}/>
			<OverspinUpgrade index={3} description={upgrade_descriptions[3]} multiplier={true} formula={upgrade_formulas[2]}/>
		</div>
		<div className="flex flex-row items-center justify-center mv1">
			<OverspinUpgrade index={4} description={upgrade_descriptions[4]} multiplier={false}/>
		</div>
	</div>;
}

export default OverspinUpgrades;
