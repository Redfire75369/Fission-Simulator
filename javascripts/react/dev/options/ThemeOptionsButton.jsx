class ThemeOptionsButtonComponent extends ReactStateComponent {
	tick() {
		this.setState({
			theme: player.options.theme
		});
	}
	
	render() {
		return (
			<button onClick={themeChange}>
				Theme: {this.state.theme}
			</button>
		);
	}
}
