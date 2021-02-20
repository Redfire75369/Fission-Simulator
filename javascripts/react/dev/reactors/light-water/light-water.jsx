/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function LightWaterComponent() {
	let lwf = React.useRef(null);
	let lwc = React.useRef(null);
	let lwr = React.useRef(null);

	/* Fuel and Mine */
	let [fuelRegular, setFuelRegular] = React.useState(zero);
	let [fuelEnriched, setFuelEnriched] = React.useState(zero);
	let [mineBuyable, setMineBuyable] = React.useState(false);
	let [mineBought, setMineBought] = React.useState(0);
	let [mineCost, setMineCost] = React.useState(zero);

	/* Centrifuge */
	let [centrifugeFuelStored, setCentrifugeFuelStored] = React.useState(zero);
	let [centrifugeEnrichment, setCentrifugeEnrichment] = React.useState(zero);
	let [centrifugeTime, setCentrifugeTime] = React.useState(0);
	let [centrifugeBuyable, setCentrifugeBuyable] = React.useState(false);
	let [centrifugeBought, setCentrifugeBought] = React.useState(0);
	let [centrifugeCost, setCentrifugeCost] = React.useState(0);
	let [centrifugeUnlock, setCentrifugeUnlock] = React.useState(false);

	/* Reactor */
	let [reactorFuel, setReactorFuel] = React.useState(zero);
	let [reactorFuelEnrichment, setReactorFuelEnrichment] = React.useState(false);
	let [reactorFuelUsage, setReactorFuelUsage] = React.useState(zero);
	let [reactorBuyable, setReactorBuyable] = React.useState(false);
	let [reactorBought, setReactorBought] = React.useState(0);
	let [reactorAmount, setReactorAmount] = React.useState(zero);
	let [reactorCost, setReactorCost] = React.useState(zero);
	let [reactorMultiplier, setReactorMultiplier] = React.useState(zero);

	React.useEffect(function() {
		lwf.current = player.fuels.light_water;
		lwc.current = player.centrifuges.light_water;
		lwr.current = player.reactors.light_water;

		/* Fuel and Mine */
		setFuelRegular(lwf.current.regular);
		setFuelEnriched(lwf.current.enriched);
		setMineBought(lwf.current.mine.bought);

		/* Centrifuge */
		setCentrifugeBought(lwc.current.bought);

		/* Reactor */
		setReactorBought(lwr.current.bought);
		setReactorAmount(lwr.current.bought);

		let update_loop = setInterval(function() {
			lwf.current = player.fuels.light_water;
			lwc.current = player.centrifuges.light_water;
			lwr.current = player.reactors.light_water;

			/* Fuel and Mine */
			setFuelEnriched(lwf.current.enriched);
			setMineBuyable(lwf.current.mine.buyable);

			/* Centrifuge */
			setCentrifugeUnlock(function (prevState) {
				return prevState || player.unlocked.light_water.centrifuge;
			});
			setCentrifugeFuelStored(player.centrifuges.light_water.fuel);
			setCentrifugeBuyable(lwc.current.buyable);
			setCentrifugeTime(lwc.current.time);

			/* Reactor */
			setReactorFuel(lwr.current.fuel);
			setReactorFuelEnrichment(lwr.current.fuel_enriched);
			setReactorBuyable(lwr.current.buyable);
			// setReactorAmount(lwr.current.amount);
		}, 50);

		return function() {
			clearInterval(update_loop);
		};
	}, []);

	/* Fuel and Mine */
	React.useEffect(function() {
		setMineCost(lwf.current.mine.cost);
	}, [mineBought]);

	/* Centrifuge */
	React.useEffect(function() {
		setCentrifugeCost(lwc.current.cost);
		setCentrifugeEnrichment(lwc.current.enrichment);
	}, [centrifugeBought]);

	/* Reactor */
	React.useEffect(function() {
		setReactorCost(lwr.current.cost);
		setReactorMultiplier(lwr.current.multiplier);
		setReactorFuelUsage(lwr.current.fuel_usage);
	}, [reactorBought]);
	React.useEffect(function() {
		setReactorFuelUsage(lwr.current.fuel_usage);
	}, [reactorFuel, centrifugeEnrichment]);

	/* Fuel and Mine */
	function FuelMineComponent() {
		function mine_fuel() {
			player.fuels.light_water.mine_fuel();
			setFuelRegular(player.fuels.light_water.regular);
		}
		function buy_mine() {
			player.fuels.light_water.mine.buy();
			setMineBought(player.fuels.light_water.mine.bought);
		}

		return (
			<div className="bg-washed-yellow b--dark-gray b--solid br2 bw1">
				<div className="flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom">
					Uranium Fuel
				</div>
				<div className="flex flex-row items-center justify-center h4">
					<div className="flex flex-column items-center justify-center">
						<div className="tc">
							<span>Mine Upgrades: {notation(mineBought)}</span><br/>
							<span>Uranium Fuel: {notation(fuelRegular)}</span><br/>
							{centrifugeUnlock ? <span>Enriched Fuel: {notation(fuelEnriched)}</span> : <></>}
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center ma2">
					<div className="flex flex-column items-center justify-center">
						<div>
							<div className="flex flex-row">
								<button className="w-100 mb1 pa1 bg-light-silver b--green br1 bw1" onClick={mine_fuel}>
									Mine Uranium Fuel
								</button>
							</div>
							<div className="flex flex-row">
								<button className={"w-100 mt1 pa1 " + (mineBuyable ? "bg-light-silver b--green" : "bg-mid-gray b--red") + " br1 bw1"} onClick={buy_mine}>
									Upgrade Mining for {notation(mineCost)} Energy
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/* Centrifuge */
	function CentrifugeComponent() {
		function load_fuel_lwc() {
			player.centrifuges.light_water.load_fuel();
			setFuelRegular(zero);
		}
		function buy_centrifuge() {
			player.centrifuges.light_water.buy();
			setCentrifugeBought(player.centrifuges.light_water.bought);
		}

		return (
			<div className="bg-washed-yellow b--dark-gray b--solid br2 bw1">
				<div className="flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom">
					Centrifuge
				</div>
				<div className="flex flex-row items-center justify-center h4">
					<div className="flex flex-column items-center justify-center">
						<div className="tc">
							<span>Centrifuge Upgrades: {notation(centrifugeBought)}</span><br/>
							<span>Stored Uranium Fuel: {notation(centrifugeFuelStored)}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center">
					<div className="flex flex-column items-center justify-center ma2">
						<div>
							<div className="flex flex-row">
								<button className="w-100 mb1 pa1 bg-light-silver b--green br1 bw1" onClick={load_fuel_lwc}>
									Mine Uranium Fuel
								</button>
							</div>
							<div className="flex flex-row">
								<button className={"w-100 mt1 pa1 " + (centrifugeBuyable ? "bg-light-silver b--green" : "bg-mid-gray b--red") + " br1 bw1"} onClick={buy_centrifuge}>
									Upgrade Centrifuges for {notation(centrifugeCost)} Energy
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	/* Reactor */
	function ReactorComponent() {
		function load_fuel_lwr() {
			player.reactors.light_water.load_fuel();
			setReactorFuel(player.reactors.light_water.fuel);
			if (!reactorFuelEnrichment) {
				setFuelRegular(zero);
			} else {
				setFuelEnriched(zero);
			}
		}
		function buy_lwr() {
			player.reactors.light_water.buy();
			setReactorBought(player.reactors.light_water.bought);
			setReactorAmount(player.reactors.light_water.amount);
		}

		return (
			<div className="bg-washed-yellow b--dark-gray b--solid br2 bw1">
				<div className="flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom">
					Light Water Reactor
				</div>
				<div className="flex flex-row items-center justify-center h4">
					<div className="flex flex-column items-center justify-center">
						<div className="tc">
							<span>Reactor Upgrades: {notation(reactorAmount)}</span><br/>
							<span>Loaded Fuel: {notation(reactorFuel)}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-row items-center justify-center">
					<div className="flex flex-column items-center justify-center ma2">
						<div>
							<div className="flex flex-row">
								<button className="w-100 mb1 pa1 bg-light-silver b--green br1 bw1" onClick={load_fuel_lwr}>
									Load {reactorFuelEnrichment ? "Enriched" : "Uranium"} Fuel
								</button>
							</div>
							<div className="flex flex-row">
								<button className={"w-100 mt1 pa1 " + (reactorBuyable ? "bg-light-silver b--green" : "bg-mid-gray b--red") + " br1 bw1"} onClick={buy_lwr}>
									Upgrade Reactors for {notation(reactorCost)} Energy
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		!mobile ? <div className="flex flex-row items-center justify-center vh-50">
			<div className="flex flex-column items-center justify-center h-100 w-25">
				<FuelMineComponent/>
			</div>
			{centrifugeUnlock ? <div className="flex flex-column items-center justify-center h-100 w-25 pa1">
				<CentrifugeComponent/>
			</div> : <></>}
			<div className="flex flex-column items-center justify-center h-100 w-25 pa1">
				<ReactorComponent/>
			</div>
		</div> : <div className="flex flex-column items-center justify-center">
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					<FuelMineComponent/>
				</div>
			</div>
			{centrifugeUnlock ? <div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					<CentrifugeComponent/>
				</div>
			</div> : <></>}
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					<ReactorComponent/>
				</div>
			</div>
		</div>
	);
}
