/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React from "react";

import {player} from "../../data.js";

function NavigationOverspinComponent(props) {
	function setNavigation(tab) {
		player.navigation.overspin = tab;
		props.setNavigation({
			...player.navigation,
			overspin: tab
		});
	}

	function NavigationButton(props) {
		function changeTab() {
			setNavigation(props.tab);
		}

		return (
			<button className="bg-light-gray b--dark-gray b--solid br2 bw1 mh1 f3" onClick={changeTab}>
				{props.text}
			</button>
		);
	}

	return (
		<div className="flex flex-row items-center justify-center bg-moon-gray min-vw-40 pv2 br--top br3">
			<NavigationButton tab="upgrades" text="Upgrades"/>
			<NavigationButton tab="coolants" text="Coolants"/>
		</div>
	);
}

export default NavigationOverspinComponent;
