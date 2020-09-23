const pebblebedReactorTypes = ["TBU", "LEU-235", "LEP-239"];

function PebblebedFissionReactorComponent(props) {
	const [type, setType] = useState(pebblebedReactorTypes[props.tier]);

	const [unlocked, setUnlocked] = useState(false);
	const [unlockedMines, setUnlockedMines] = useState(false);
	const [amount, setAmount] = useState(zero);
	const [bought, setBought] = useState(0);
	const [canLoadFuel, setCanLoadFuel] = useState(false);
	const [fuel, setFuel] = useState(pebblebedReactorTypes[props.tier]);
	const [fuelPercentage, setFuelPercentage] = useState(0);
	const [spent, setSpent] = useState(zero);
	const [spentPercentage, setSpentPercentage] = useState(zero);
	const [buyable, setBuyable] = useState(false);
	const [cost, setCost] = useState(zero);
	const [burnRate, setBurnRate] = useState(zero);
	const [totalCapacity, setTotalCapacity] = useState(zero);
	const [gain, setGain] = useState(zero));

	useEffect(function() {
		const timerID = setInterval(function() {
			setUnlocked(props.tier === 0 || player.reactors.pebblebeds[props.tier - 1].bought >  0);
			setUnlockedMines(player.mines.tier > -1);
			setAmount(player.reactors.pebblebeds[props.tier].amount);
			setBought(player.reactors.pebblebeds[props.tier].bought);
			setCanLoadFuel(player.fuels.triso[props.tier].enriched.gte(1) && player.reactors.pebblebeds[props.tier].fuel.add(player.reactors.pebblebeds[props.tier].spent).add(1).lt(player.reactors.pebblebeds[props.tier].totalCapacity));
			setCanEjectWaste(player.reactors.pebblebeds[props.tier].spent.gte(1));
			setFuel(player.reactors.pebblebeds[props.tier].fuel);
			setFuelPercentage(player.reactors.pebblebeds[props.tier].fuel.div(player.reactors.pebblebeds[props.tier].totalCapacity).toNumber() * 100);
			setSpent(player.reactors.pebblebeds[props.tier].spent);
			setSpentPercentage(player.reactors.pebblebeds[props.tier].fuel.add(player.reactors.pebblebeds[props.tier].spent).div(player.reactors.pebblebeds[props.tier].totalCapacity).toNumber());
			setBuyable(player.reactors.pebblebeds[props.tier].buyable);
			setCost(player.reactors.pebblebeds[props.tier].cost);
			setBurnRate(player.reactors.pebblebeds[props.tier].burnRate);
			setTotalCapacity(player.reactors.pebblebeds[props.tier].totalCapacity);
			setGain(getReactorGain(props.tier));
		}, 50);
	}, []);

	function loadFuel() {
		player.reactors.pebblebeds[props.tier].loadFuel();
	}
	function ejectWaste() {
		player.reactors.pebblebeds[props.tier].ejectWaste();
	}
	function buy() {
		player.reactors.pebblebeds[props.tier].buy();
	}
	function buyMax() {
		player.reactors.pebblebeds[props.tier].buyMax();
	}

	return (
		<div className="pebblebeddiv" style={{display: unlocked ? "" : "none"}}>
			<div className="flex-row title">
				<div className="type"><b>{type} Pebblebed Reactor</b></div>
				<div className="tooltip info">
					i
					<div className="tooltiptext" style={{fontSize: "90%", maxWidth: "15vw", minWidth: "15vw", padding: "1vw",}}>
						{type} Pebblebed Reactors convert Enriched fuel into Spent Fuel, producing energy.<br/>
						Your mines are producing {notation(gain)} {type} reactors every second.<br/>
					</div>
				</div>
			</div>

			<div className="flex-row body">
				<div className="flex-col vertical-top info">
					<div><b>Reactor Information</b></div>
					<div>Amount: {notation(amount)} ({bought} Bought)</div>
					<div><b>Fuel Information</b></div>
					<div>Capacity: {notation(totalCapacity)}</div>
					<div>Fuel Usage: {notation(burnRate)}/s</div>
					<div>Enriched: {notation(fuel)}</div>
					<div>Spent: {notation(spent)}</div>
				</div>

				<div className="flex-col vertical-top fuelhandling" style={{display: unlockedMines ? "" : "none"}}>
					<div>Fuel Handling:</div>
					<button onClick={loadFuel} className={canLoadFuel ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Load Enriched {type} Pellets</button>
					<button onClick={ejectWaste} className={canEjectWaste ? "pebblebedbtn buy" : "pebblebedbtn locked"}>Eject Spent {type} Pellets</button>
				</div>
			</div>

			<div className="flex-row fuelbar">
				<div className="flex-col">
					<div>
						<div>
							<div style={{maxWidth: spentPercentage * 100 + "%"}}>
								<div style={{maxWidth: fuelPercentage / spentPercentage + "%"}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-row buying">
				<button onClick={buy} className={buyable ? "pebblebedbtn buy buysingle" : "pebblebedbtn locked buysingle"}>Buy for {notation(cost)} Energy</button>
				<div style={{minWidth: "5%", maxWidth: "5%"}}></div>
				<button onClick={buyMax} className={buyable ? "pebblebedbtn buy buymax" : "pebblebedbtn locked buymax"}>Buy Max</button>
			</div>
		</div>
	);
}
