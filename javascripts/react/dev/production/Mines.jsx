const mineTypes = ["Iron", "Steel", "Titanium", "Iridium", "Tungstensteel", "Osmium", "Diamond", "Laser"];

function MinesComponent() {
	const [active, setActive] = React.useState(false);
	const [unlockedRequirement, setUnlockedRequirement] = React.useState(false);
	const [unlocked, setUnlocked] = React.useState(false);
	const [unlockedSalvage, setUnlockedSalvage] = React.useState(false);
	const [bought, setBought] = React.useState(false);
	const [maxTier, setMaxTier] = React.useState(false);
	const [activeMines, setActiveMines] = React.useState(zero);
	const [depleted, setDepleted] = React.useState(zero);
	const [extraction, setExtraction] = React.useState(zero);
	const [construction, setConstruction] = React.useState(zero);
	const [type, setType] = React.useState("");
	const [upgradeText, setUpgradeText] = React.useState("");
	const [cost, setCost] = React.useState(zero);
	const [canUpgrade, setCanUpgrade] = React.useState(false);
	const [canSalvage, setCanSalvage] = React.useState(false);
	const [softcapped, setSoftcapped] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.production === "mines");
			setUnlockedRequirement(player.energy.gte(5e8) && !player.unlocked.mines);
			setUnlocked(player.unlocked.mines);
			setUnlockedSalvage(player.mines.tier > 0);
			setBought(player.mines.tier > -1);
			setMaxTier(player.mines.tier > 6);
			setActiveMines(player.mines.amount.sub(player.mines.depleted));
			setDepleted(player.mines.depleted);
			setExtraction(player.mines.metalExtraction);
			setConstruction(getMineGain());
			setType(player.mines.tier < 0 ? "None" : mineTypes[player.mines.tier]);
			setUpgradeText(player.mines.tier === -1 ? "Buy a mine" : "Upgrade mines to use " + mineTypes[player.mines.tier + 1] + " Drills");
			setCost(player.mines.upCost);
			setCanUpgrade(player.mines.upgradable);
			setCanSalvage(player.mines.depleted.gt(0));
			setSoftcapped(player.mines.amount.gte(mineSoftCaps[player.mines.tier]));
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div style={{display: active ? "" : "none"}}>
			<div style={{display: unlockedRequirement ? "" : "none", fontSize: "200%"}}>Obtain 500 Energy to unlock</div>
			<div className="minesdiv" style={{display: unlocked ? "" : "none"}}>
				<div style={{display: bought ? "" : "none"}}>
					<div className="flex-row info">
						<div className="flex-col horizontal-center">
							<div className="bold">Information</div>
							<div>Active: {notation(activeMines)}</div>
							<div>Depleted: {notation(depleted)}</div>
						</div>
					</div>

					<div className="body">
						<div className="flex-col horizontal-center">
							<div>Metal Extraction: {notation(extraction)}/s</div>
							<div>Mine Construction: {notation(construction)}/s</div><br/>
							<div>Drill Tier: {type}</div>
						</div>
					</div>
				</div>

				<div className="flex-col actions">
					<button onClick={function() {player.mines.upgrade();}} className={canUpgrade ? "storebtn buy" : "storebtn locked"} style={{display: maxTier ? "none" : ""}}>
						{upgradeText}<br/>
						Cost: {notation(cost)} Energy
					</button>
					<button onClick={function() {player.mines.salvage();}} className={canSalvage ? "storebtn buy" : "storebtn locked"} style={{display: unlockedSalvage ? "" : "none"}}>
						Salvage depleted mines into new mines
					</button>
				</div>
			</div>
		</div>
	);
}
