/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function ProductionTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "production_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div style={{display: active ? "" : "none"}}>
			<div>
				<MinesComponent/>
			</div>

			<div>
				<FissionReactorsSubTabComponent/>
			</div>
		</div>
	);
}
