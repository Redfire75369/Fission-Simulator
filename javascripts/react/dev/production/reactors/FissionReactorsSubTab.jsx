/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function FissionReactorsSubTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.production === "reactors");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div style={{display: active ? "" : "none"}}>
			<div className="flex-row">
				<TRISOFuelComponent tier={0}/>
				<TRISOFuelComponent tier={1}/>
				<TRISOFuelComponent tier={2}/>
			</div>
			<div className="flex-row">
				<PebblebedFissionReactorComponent tier={0}/>
				<PebblebedFissionReactorComponent tier={1}/>
				<PebblebedFissionReactorComponent tier={2}/>
			</div>
		</div>
	);
}
