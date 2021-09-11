/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import React, {useEffect, useRef, useState} from "react";

import {zero} from "../../../constants.js";
import {cache, persistent_cache, player} from "../../../data.js";
import notation from "../../../notations.js";
import overspin from "../../../prestige/overspin/overspin.js";

function LightWaterReactor(props) {
	let lwf = useRef(player.fuels.light_water);
	let lwc = useRef(player.centrifuges.light_water);
	let lwr = useRef(player.reactors.light_water);
	let [rerender, setRerender] = useState(false);

	/* Fuel and Mine */
	let [fuelRegular, setFuelRegular] = useState(lwf.current.regular);
	let [fuelEnriched, setFuelEnriched] = useState(lwf.current.enriched);
	let [mineBuyable, setMineBuyable] = useState(lwf.current.mine.buyable);
	let [mineBought, setMineBought] = useState(lwf.current.mine.bought);
	let [mineCost, setMineCost] = useState(lwf.current.mine.cost);

	/* Centrifuge */
	let [centrifugeFuelStored, setCentrifugeFuelStored] = useState(lwc.current.fuel);
	let [centrifugeTime, setCentrifugeTime] = useState(lwc.current.time);
	let [centrifugeTotalTime, setCentrifugeTotalTime] = useState(lwc.current.enrichment_time);
	let [centrifugeBuyable, setCentrifugeBuyable] = useState(lwc.current.buyable);
	let [centrifugeBought, setCentrifugeBought] = useState(lwc.current.bought);
	let [centrifugeCost, setCentrifugeCost] = useState(lwc.current.cost);

	/* Reactor */
	let [reactorFuel, setReactorFuel] = useState(lwr.current.fuel);
	let [reactorFuelEnrichment, setReactorFuelEnrichment] = useState(lwr.current.fuel_enriched);
	let [reactorBuyable, setReactorBuyable] = useState(lwr.current.buyable);
	let [reactorBought, setReactorBought] = useState(lwr.current.bought);
	let [reactorAmount, setReactorAmount] = useState(lwr.current.amount);
	let [reactorCost, setReactorCost] = useState(lwr.current.cost);

	useEffect(function () {
		const update_loop_id = setInterval(function() {
			setRerender(cache.reactors.light_water.rerender);
			update_loop();
		}, 50);

		return function() {
			clearInterval(update_loop_id);
		};
	}, []);

	useEffect(function() {
		if (rerender) {
			update_once();
			update_loop();
			cache.reactors.light_water.rerender = false;
		}
	}, [rerender]);

	function update_once() {
		lwf.current = player.fuels.light_water;
		lwc.current = player.centrifuges.light_water;
		lwr.current = player.reactors.light_water;

		/* Fuel and Mine */
		setFuelRegular(lwf.current.regular);
		setMineBought(lwf.current.mine.bought);

		/* Centrifuge */
		setCentrifugeBought(lwc.current.bought);

		/* Reactor */
		setReactorBought(lwr.current.bought);
		setReactorAmount(lwr.current.bought);
	}

	function update_loop() {
		lwf.current = player.fuels.light_water;
		lwc.current = player.centrifuges.light_water;
		lwr.current = player.reactors.light_water;

		/* Fuel and Mine */
		setFuelEnriched(lwf.current.enriched);
		setMineBuyable(lwf.current.mine.buyable);

		/* Centrifuge */
		setCentrifugeFuelStored(player.centrifuges.light_water.fuel);
		setCentrifugeBuyable(lwc.current.buyable);
		setCentrifugeTime(lwc.current.time);
		setCentrifugeTotalTime(lwc.current.enrichment_time)

		/* Reactor */
		setReactorFuel(lwr.current.fuel);
		setReactorFuelEnrichment(lwr.current.fuel_enriched);
		setReactorBuyable(lwr.current.buyable);
	}

	/* Fuel and Mine */
	useEffect(function () {
		setMineCost(lwf.current.mine.cost);
	}, [mineBought]);

	/* Centrifuge */
	useEffect(function () {
		setCentrifugeCost(lwc.current.cost);
	}, [centrifugeBought]);

	/* Reactor */
	useEffect(function () {
		setReactorCost(lwr.current.cost);
	}, [reactorBought]);

	/* Fuel and Mine */
	function mine_fuel() {
		player.fuels.light_water.mine_fuel();
		setFuelRegular(player.fuels.light_water.regular);
	}

	function buy_mine() {
		player.fuels.light_water.mine.buy();
		setMineBought(player.fuels.light_water.mine.bought);
	}

	const FuelMineComponent = (
		<div className="bg-washed-yellow b--dark-gray b--solid br2 bw1">
			<div className="flex flex-row items-center justify-center h2 bg-light-yellow br1 br--bottom">
				Uranium Fuel
			</div>
			<div className="flex flex-row items-center justify-center h4">
				<div className="flex flex-column items-center justify-center">
					<div className="tc">
						<span>Mine Upgrades: {notation(mineBought)}</span><br/>
						<span>Uranium Fuel: {notation(fuelRegular)}</span><br/>
						{props.unlocked.light_water.centrifuge ? <span>Enriched Fuel: {notation(fuelEnriched)}</span> : <></>}
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center ma2">
				<div className="flex flex-column items-center justify-center">
					<div>
						<div className="flex flex-row">
							<button className="w-100 mb1 pa1 bg-green b--dark-green br1 bw1" onClick={mine_fuel}>
								Mine Uranium Fuel
							</button>
						</div>
						<div className="flex flex-row">
							<button className={"w-100 mt1 pa1 " + (mineBuyable ? "bg-green b--dark-green" : "bg-green b--dark-green") + " br1 bw1"} onClick={buy_mine}>
								Upgrade Mining for {notation(mineCost)} Energy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	/* Centrifuge */
	function load_fuel_lwc() {
		player.centrifuges.light_water.load_fuel();
		setFuelRegular(zero);
	}

	function buy_centrifuge() {
		player.centrifuges.light_water.buy();
		setCentrifugeBought(player.centrifuges.light_water.bought);
		setCentrifugeCost(lwc.current.cost);
	}

	const CentrifugeComponent = (
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
					<div className="flex flex-row items-center justify-center mt3" style={{minWidth: "90%"}}>
						<div className="flex items-start bg-red b--dark-gray b--solid br2 bw1" style={{minHeight: "2em",  minWidth: "100%"}}>
							<div className="bg-green br1 bw1" style={{minHeight: "1.75em", minWidth: centrifugeTime / (centrifugeTotalTime / 100) + "%"}}/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center ma2">
					<div>
						<div className="flex flex-row">
							<button className="w-100 mb1 pa1 bg-green b--dark-green br1 bw1" onClick={load_fuel_lwc}>
								Load Uranium Fuel
							</button>
						</div>
						<div className="flex flex-row">
							<button className={"w-100 mt1 pa1 " + (centrifugeBuyable ? "bg-green b--dark-green" : "bg-green b--dark-green") + " br1 bw1"} onClick={buy_centrifuge}>
								Upgrade Centrifuges for {notation(centrifugeCost)} Energy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	/* Reactor */
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

	const ReactorComponent = (
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
							<button className="w-100 mb1 pa1 bg-green b--dark-green br1 bw1" onClick={load_fuel_lwr}>
								Load {reactorFuelEnrichment ? "Enriched" : "Uranium"} Fuel
							</button>
						</div>
						<div className="flex flex-row">
							<button className={"w-100 mt1 pa1 " + (reactorBuyable ? "bg-green b--dark-green" : "bg-green b--dark-green") + " br1 bw1"} onClick={buy_lwr}>
								Upgrade Reactors for {notation(reactorCost)} Energy
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		!persistent_cache.mobile ? <div className="flex flex-column items-center justify-center">
			{centrifugeBought > 4 && centrifugeFuelStored.gt(1e3) ? <div className="flex flex-row items-center justify-center">
				<button className="bg-light-green b--dark-green b--solid br1 bw1 f2" onClick={overspin}>
					Overspin
				</button>
			</div>: <></>}
			<div className="flex flex-row items-center justify-center vh-50 w-100">
				<div className="flex flex-column items-center justify-center h-100 w-25">
					{FuelMineComponent}
				</div>
				{props.unlocked.light_water.centrifuge ? <div className="flex flex-column items-center justify-center h-100 w-25 pa1">
					{CentrifugeComponent}
				</div> : <></>}
				<div className="flex flex-column items-center justify-center h-100 w-25 pa1">
					{ReactorComponent}
				</div>
			</div>
		</div> : <div className="flex flex-column items-center justify-center">
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					{FuelMineComponent}
				</div>
			</div>
			{props.unlocked.light_water.centrifuge ? <div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					{CentrifugeComponent}
				</div>
			</div> : <></>}
			<div className="flex flex-row items-center justify-center">
				<div className="flex flex-column items-center justify-center pa1">
					{ReactorComponent}
				</div>
			</div>
		</div>
	);
}

export default LightWaterReactor;
