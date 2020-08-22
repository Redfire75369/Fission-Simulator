class ReactStateComponent extends React.Component {
	componentDidMount() {
		this.timerID = setInterval(
			() => this.tick(),
			50
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {}
}
