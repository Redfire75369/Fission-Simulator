class NotationOptionsButton extends ReactStateComponent {
	tick() {
		this.setState({
			notation: player.options.notation
		});
	}

	render() {
		return (
			<button onClick={notationChange}>
				Notation: {this.state.notation}
			</button>
		);
	}
}
