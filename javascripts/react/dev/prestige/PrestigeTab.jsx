/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function PrestigeTabComponent() {
	const [active, setActive] = React.useState(false);
	const [research, setResearch] = React.useState(0);
	const [respec, setRespec] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "prestige_tab");
			setResearch(player.prestige.researchPoints);
			setRespec(player.prestige.respec);
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className="flex-col horizontal-center" style={{display: active ? "" : "none"}}>
			<p>You have {notation(research)} Research Points</p>
			<button onClick={toggleRespecResearch} className={respec ? "" : ""}>Respec Researches on Prestige</button>
			<GasCoolantsComponent/>

			{/*<div className="flex-row vertical-top">
				<GasCoolantStatsComponent tier={0}/>
				<GasCoolantStatsComponent tier={1}/>
				<GasCoolantStatsComponent tier={2}/>
			</div>*/}
		</div>
	);
}
