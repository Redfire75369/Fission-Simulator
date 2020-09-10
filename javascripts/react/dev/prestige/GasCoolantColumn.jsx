class GasCoolantColumnComponent extends ReactStateComponent {
	constructor(props) {
		super(props);

		this.state = {
			colour: this.props.colour,
			name: this.props.name,
			type: this.props.type
		};
	}

	assignResearch() {
		assignResearch(this.state.type);
	}

	tick() {
		this.setState({
			percentageWidth: log(max(max(max(player.prestige.researches[0], player.prestige.researches[1]), player.prestige.researches[2]), player.prestige.researches[3]), 2) / 40,
			research: player.prestige.researches[this.state.type]
		});
	}

	render() {
		return (
			<div className="flex-col vertical-bottom" style={{maxHeight: "min(48vw, 40vh)", minHeight: "min(48vw, 48vh)", width: "min(20vw, 30vh)"}}>
				<button onClick={this.assignResearch.bind(this)} className="" style={{marginBottom: "min(2vw, 2vh)", maxHeight: "min(6vw, 6vh)", minHeight: "min(6vw, 6vh)", width: "min(6vw, 6vh)"}}>▲</button>
				<div className="flex-col vertical-bottom" style={{maxHeight: "min(40vw, 40vh)", minHeight: "min(40vw, 40vh)", width: "min(20vw, 20vh)"}}>
					<div style={{backgroundColor: this.props.colour, maxHeight: "min(" + log(this.state.research, 2) / this.state.percentageWidth + "vh, " + log(this.state.research, 2) / this.state.percentageWidth + "vw)", minHeight: "min(" + log(this.state.research, 2) / this.state.percentageWidth + "vh, " + log(this.state.research, 2) / this.state.percentageWidth + "vw)", width: "min(18vw, 18vh)"}}/>
				</div>
				<span>{this.state.name}</span>
			</div>
		);
	}
}
