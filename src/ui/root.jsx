/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useState} from "react";
import {render} from "react-dom";

import Navigation from "./navigation/navigation.jsx";
import OptionsTab from "./options/options.jsx";
import OverspinTab from "./overspin/overspin.jsx";
import Popup from "./popup.jsx";
import ReactorsTab from "./reactors/reactors.jsx";
import Resources from "./resources.jsx";
import {player} from "../data.js";

function Root() {
	let [navigation, setNavigation] = useState(player.navigation);
	let [unlocked] = useState(player.unlocked);

	function CurrentTab(props) {
		switch(props.navigation.primary) {
			case "reactors":
				return <ReactorsTab unlocked={unlocked}/>;
			case "options":
				return <OptionsTab/>;
			case "overspin":
				return <OverspinTab navigation={navigation}/>;
			default:
				return <></>;
		}
	}

	return (
		<>
			<Resources unlocked={unlocked}/>

			<CurrentTab navigation={navigation}/>

			<Navigation unlocked={unlocked} navigation={navigation} setNavigation={setNavigation}/>
			<Popup/>
		</>
	);
}

function render_ui() {
	render(<Root/>, document.getElementById("root"));
}

export default render_ui;
