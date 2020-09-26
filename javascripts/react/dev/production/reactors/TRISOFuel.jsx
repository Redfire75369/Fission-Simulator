const trisoFuelTypes = ["TBU", "LEU-235", "LEP-239"];

function TRISOFuelComponent(props) {
	const [type, setType] = React.useState(trisoFuelTypes[props.tier]);

	const [unlocked, setUnlocked] = React.useState(false);
	const [unlockedReprocessing, setUnlockedReprocessing] = React.useState(false);
	const [hasFuel, setHasFuel] = React.useState(false);
	const [enriched, setEnriched] = React.useState(zero);
	const [enrichedPercentage, setEnrichedPercentage] = React.useState(0);
	const [depleted, setDepleted] = React.useState(zero);
	const [canReprocess, setCanReprocess] = React.useState(false);
	const [reprocessCost, setReprocessCost] = React.useState(zero);
	const [reprocessing, setReprocessing] = React.useState(false);
	const [gain, setGain] = React.useState(zero); 

	const [goal, setGoal] = React.useState(zero); 

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setUnlocked(player.mines.tier > - 1 && (props.tier === 0 || ((player.fuels.triso[props.tier - 1].enriched.add(player.fuels.triso[props.tier - 1].depleted).gt(0) || player.fuels.triso[props.tier].enriched.add(player.fuels.triso[props.tier].depleted).gt(0)) && player.reactors.pebblebeds[props.tier - 1].bought > 0)));
			setUnlockedReprocessing(player.mines.tier > 0);
			setHasFuel(player.fuels.triso[props.tier].enriched.add(player.fuels.triso[props.tier].depleted).gt(0));
			setEnriched(player.fuels.triso[props.tier].enriched);
			setEnrichedPercentage(player.fuels.triso[props.tier].enriched.div(player.fuels.triso[props.tier].enriched.add(player.fuels.triso[props.tier].depleted)).toNumber());
			setDepleted(player.fuels.triso[props.tier].depleted);
			setCanReprocess(player.fuels.triso[props.tier].canReprocessDepleted);
			setReprocessCost(player.fuels.triso[props.tier].reprocessEnergyCost);
			setReprocessing(reprocessing[props.tier]);
			setGain(getTRISOFuelGain(props.tier));
			if (props.tier === 2) {
				setGoal(prestigeGoal());
			}
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);
	
	function reprocessDepleted() {
		player.fuels.triso[props.tier].reprocessDepleted();
	}

	return (
		<div className="trisodiv" style={{display: unlocked ? "" : "none"}}>
			<div className="flex-row title">
				<div className="type"><b>{type} TRISO Fuel</b></div>
				<div className="tooltip info">
					i
					<div className="tooltiptext"  style={{fontSize: "90%", maxWidth: "15vw", minWidth: "15vw", padding: "1vw"}}>
						Mines are producing {notation(gain)} Enriched {type} Fuel per second.<br/>
						{props.tier !== 2 ? <span>Depleted {type} Fuel can be reprocessed into Enriched {trisoFuelTypes[props.tier + 1]} Fuel</span> : <span>Reprocessing {notation(goal)} Depleted LEP-239 Fuel will result in a prestige</span>}
					</div>
				</div>
			</div>

			<div className="flex-row body">
				<div className="flex-col vertical-top fuelinfo">
					<div><b>Fuel Pebbles</b></div>
					<div>Enriched: {notation(enriched)}</div>
					<div>Depleted: {notation(depleted)}</div>
				</div>

				<div className="flex-col vertical-top reprocess" style={{display: unlockedReprocessing ? "" : "none"}}>
					<div>Fuel Handling:</div>
					<button onClick={reprocessDepleted} className={canReprocess ? "trisobtn buy" : "trisobtn locked"} id={"fuel_triso_reprocess" + (props.tier + 1)}>
						<div style={{transition: reprocessing ? player.fuels.triso[props.tier].reprocessingTime / 1000 + "s width linear" : "", width: reprocessing ? "100%" : "0"}}/>
						Reprocess Depleted {type} Fuel Pebbles for {notation(reprocessCost)} Energy
					</button>
				</div>
			</div>

			<div className="flex-row horizontal-center fuelbar">
				<div className="flex-col">
					<div>
						<div>
							<div style={{maxWidth: hasFuel ? "100%" : "0"}}>
								<div style={{maxWidth: enrichedPercentage * 100 + "%"}}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
