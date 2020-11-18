/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function AutomationTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "automation_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className="flex-row" style={{display: active ? "" : "none"}}>
			<PebblebedFuelHandlingAutomationComponent tier={0}/>
			<PebblebedFuelHandlingAutomationComponent tier={1}/>
			<PebblebedFuelHandlingAutomationComponent tier={2}/>
		</div>
	);
}
