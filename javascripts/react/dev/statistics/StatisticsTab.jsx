/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function StatisticsTabComponent() {
	const [active, setActive] = React.useState(false);
	const [totalTime, setTotalTime] = React.useState(0);
	const [totalEnergy, setTotalEnergy] = React.useState(zero);
	const [totalNanites, setTotalNanites] = React.useState(0);
	const [unlockedMeltdown, setUnlockedMeltdown] = React.useState(false);
	const [bestMeltdownTime, setBestMeltdownTime] = React.useState(0);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "statistics_tab");
			setTotalTime(player.time);
			setTotalEnergy(player.totalEnergy);
			setTotalNanites(player.nanites.total);
			setUnlockedMeltdown(player.unlocked.meltdown);
			setBestMeltdownTime(player.meltdown.bestTime);
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className="flex-col statistics" style={{display: active ? "" : "none"}}>
			<div>Total time played: {formatTime(totalTime)}</div>
			<div>Total energy generated: {notation(totalEnergy)}</div>
			<div>Total nanites researched: {notation(totalNanites)}</div>
			<div style={{display: unlockedMeltdown ? "" : "none"}}>Fastest Meltdown Time: {formatTime(bestMeltdownTime)}</div>
		</div>
	);
}
