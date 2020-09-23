function PrestigeTabComponent() {
	const [active, setActive] = React.useState(false);
	const [research, setResearch] = React.useState(new Decimal(0));
	const [respec, setRespec] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "prestige_tab");
			setResearch(player.prestige.researchPoints);
			setResearch(player.prestige.respec);
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
