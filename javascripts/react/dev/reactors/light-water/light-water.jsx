/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function LightWaterReactorComponent() {
	let fuel = React.useRef(null);
	let lwr = React.useRef(null);

	let [mineBought, setMineBought] = React.useState(zero);
	let [mineCost, setMineCost] = React.useState(zero);
	let [fuelRegular, setFuelRegular] = React.useState(zero);
	let [fuelEnriched, setFuelEnriched] = React.useState(zero);

	let [enrichment, setEnrichment] = React.useState(zero);

	let [storedFuelRegular, setStoredFuelRegular] = React.useState(zero);
	let [storedFuelEnriched, setStoredFuelEnriched] = React.useState(zero);
	let [fuelUsage, setFuelUsage] = React.useState(zero);
	let [bought, setBought] = React.useState(zero);
	let [amount, setAmount] = React.useState(zero);
	let [multiplier, setMultiplier] = React.useState(zero);
	let [cost, setCost] = React.useState(zero);

	React.useEffect(function() {
		fuel.current = player.fuels.light_water;
		lwr.current = player.reactors.light_water;

		setMineBought(fuel.current.mine.bought)
		setFuelRegular(fuel.current.regular);
		setFuelEnriched(fuel.current.enriched);

		setBought(lwr.current.bought);
		let update_loop = setInterval(function() {
			lwr.current = player.reactors.light_water;

			setStoredFuelRegular(lwr.current.fuel.regular);
			setStoredFuelEnriched(lwr.current.fuel.enriched);
			setAmount(lwr.current.amount);
		}, 50);

		return function() {
			clearInterval(update_loop);
		};
	}, []);

	React.useEffect(function() {
		setMineCost(fuel.current.mine.cost);
	}, [mineBought]);
	React.useEffect(function() {
		setCost(lwr.current.cost);
		setMultiplier(lwr.current.multiplier);
		setFuelUsage(lwr.current.fuel_usage);
	}, [bought]);
	React.useEffect(function() {
		setFuelUsage(lwr.current.fuel_usage);
	}, [storedFuelRegular, storedFuelEnriched, enrichment]);

	function mineFuel() {
		player.fuels.light_water.mine_fuel();
		setFuelRegular(player.fuels.light_water.regular);
	}
	function upgradeMining() {
		player.fuels.light_water.mine.buy();

		setMineBought(player.fuels.light_water.mine.bought);
	}

	function loadFuelRegular() {
		player.reactors.light_water.fuel.regular = player.reactors.light_water.fuel.regular.add(fuelRegular);
		player.fuels.light_water.regular = zero;

		setStoredFuelRegular(player.reactors.light_water.fuel.regular);
		setFuelRegular(zero);
	}
	function buyLWR() {
		player.reactors.light_water.buy();
		setBought(player.reactors.light_water.bought);
	}


	return (
		<div className="flex flex-row items-center justify-center vh-50">
			<div className="flex flex-col items-center justify-center h-100 w-25">
				<div className="bg-gray">
					<div className="flex flex-row items-center justify-center h2 bg-mid-gray">
						Uranium Fuel
					</div>
					<div className="flex flex-row items-center justify-center h4">
						<div className="flex flex-col items-center justify-center">
							<div className="tc">
								<span>Mine Upgrades: {notation(mineBought)}</span><br/>
								<span>Uranium Fuel: {notation(fuelRegular)}</span>
								{/*<span>Enriched Uranium Fuel: {notation(fuelEnriched)}</span>*/}
							</div>
						</div>
					</div>
					<div className="flex flex-row items-center justify-center">
						<div className="flex flex-col items-center justify-center ma2">
							<div>
								<button className="h-50 w-100 bg-moon-gray b--green" onClick={mineFuel}>
									Mine Uranium Fuel
								</button>
								<button className="h-50 w-100 bg-moon-gray b--green" onClick={upgradeMining}>
									Upgrade Mining for {notation(mineCost)} Energy
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center h-100 w1"/>
			<div className="flex flex-col items-center justify-center h-100 w-25">
				<div className="bg-gray">
					<div className="flex flex-row items-center justify-center h2 bg-mid-gray">
						Light Water Reactor
					</div>
					<div className="flex flex-row items-center justify-center h4">
						<div className="flex flex-col items-center justify-center">
							<div className="tc">
								<span>Amount: {notation(amount)}</span><br/>
								<span>Loaded Fuel: {notation(storedFuelRegular)}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-row items-center justify-center">
						<div className="flex flex-col justify-center ma2">
							<div>
								<button className="h-50 w-100 bg-moon-gray b--green" onClick={loadFuelRegular}>
									Load Uranium Fuel
								</button>
								<button className="h-50 w-100 bg-moon-gray b--green" onClick={buyLWR}>
									Upgrade Reactors for {notation(cost)} Energy
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
