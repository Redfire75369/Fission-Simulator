/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function NavigationComponent(props) {
	function setNavigation(tab) {
		player.navigation.primary = tab;
		props.setNavigation({
			...player.navigation,
			primary: tab
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
		<div className="flex flex-row items-center justify-center fixed bottom-0 z-4 bg-mid-gray min-vw-100 pv2">
			<NavigationButton tab="reactors" text="Reactors" setNavigation={props.setNavigation}/>
			<NavigationButton tab="options" text="Options" setNavigation={props.setNavigation}/>
			{props.unlocked.overspin.overspin ? <NavigationButton tab="overspin" text="Overspin" setNavigation={props.setNavigation}/>
				: <></>}
		</div>
	);
}
