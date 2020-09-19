const achievementTexts = {
	11: "Thoranium\nBuy one TBU Pebblebed Reactor.",
	12: "",
	13: "",
	14: "",
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

class AchievementComponent extends ReactStateComponent {
	tick() {
		this.setState({
			completed: player.achievements[this.props.id]
		});
	}

	render() {
		return (
			<div className={"flex-col align horizontal-center tooltip " + (this.state.completed ? "achcomplete" : "achlocked")}>
				<img src={"resources/images/achievements/" + this.props.id + ".png"}/>
				<span className="tooltiptext" >
					{achievementTexts[this.props.id].split("\n")[0]}<br/>
					{achievementTexts[this.props.id].split("\n")[1]}
				</span>
			</div>
		);
	}
}
