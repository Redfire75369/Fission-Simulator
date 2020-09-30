function OptionsTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "options_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);
	
	function save() {
		saveGame();
	}
	function load() {
		preLoad();
		loadSave(getSave());
		postLoad();
	}
	
	function importSave() {
		const save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
		player.import42 |= save === "42";
		if (save === null || save === "42") {
			return;
		}
		preLoad();
		loadSave(save, true);
		postLoad();
		save();
	}
	function exportSave() {
		save();
		copyStringToClipboard(getSaveString());
		alert("Save copied to clipboard");
	}
	
	function hardReset() {
		const confirmation = prompt("This will completely reset your game. If you are sure, type in “Hitchhiker's Guide to the Fusion-Driven Galaxy”");
		if (confirmation === "Hitchhiker's Guide to the Fusion-Driven Galaxy") {
			preLoad();
			player = getDefaultData();
			postLoad();
			save();
		}
	} 

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
