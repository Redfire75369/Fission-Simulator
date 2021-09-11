/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React from "react";

import OverspinCoolants from "./coolants/coolants.jsx";
import OverspinUpgrades from "./upgrades/upgrades.jsx";

function OverspinTab(props) {
	function CurrentTab(props) {
		switch (props.navigation.overspin) {
			case "upgrades":
				return <OverspinUpgrades/>;
			case "coolants":
				return <OverspinCoolants/>;
			default:
				return <></>;
		}
	}

	return <CurrentTab navigation={props.navigation}/>;
}

export default OverspinTab;
