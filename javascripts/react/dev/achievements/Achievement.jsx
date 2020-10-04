const achievementTexts = {
	11: "Thorium Power\nBuy one TBU Pebblebed Reactor.",
	12: "Minecraft 2\nBuy a Mine with an iron-tipped drill.",
	13: "Thoranium\nReprocess Depleted TBU Fuel into Enriched LEU-235 Fuel.",
	14: "Capacity Overload\nReach a total capacity of 1000 LEU-235 Fuel in LEU-235 Pebblebed Reactors.",
	15: "",
	16: "",
	17: "",
	18: "",
	21: "",
	22: "",
	23: "",
	24: "",
	25: "",
	26: "",
	27: "",
	28: ""
};

function AchievementComponent(props) {
	const [completed, setCompleted] = React.useState("false");

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setCompleted(player.achievements[props.id]);
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div className={"flex-col align horizontal-center tooltip " + (completed ? "achcomplete" : "achlocked")}>
			<img src={"resources/images/achievements/" + props.id + ".png"}/>
			<span className="tooltiptext" >
				{achievementTexts[props.id].split("\n")[0]}<br/>
				{achievementTexts[props.id].split("\n")[1]}
			</span>
		</div>
	);
}
