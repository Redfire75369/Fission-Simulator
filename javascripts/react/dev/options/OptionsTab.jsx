class OptionsTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.naviTab === "options_tab"
		});
	}

	render() {
		return (
			<div className="flex-col options">
				<div className="flex-row">
					<NotationOptionsButton/>
					<ThemeOptionsButton/>
				</div>
				<div className="flex-row">
					<button onClick={save}>Save</button>
					<button onClick={load}>Load</button>
				</div>
				<div className="flex-row">
					<button onClick={importSave}>Import Save</button>
					<button onClick={exportSave}>Export Save</button>
				</div>
				<div className="flex-row">
					<button onClick={hardReset}>Hard Reset</button>
					<button onClick={enableCheatsTab}>Stuff</button>
				</div>
			</div>
		);
	}
}
