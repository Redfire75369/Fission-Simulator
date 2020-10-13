try {
	ReactDOM.render(<ProductionTabComponent/>, document.getElementById("production_tab"));
	ReactDOM.render(<StatisticsTabComponent/>, document.getElementById("statistics_tab"));
	ReactDOM.render(<AchievementsTabComponent/>, document.getElementById("achievements_tab"));
	ReactDOM.render(<OptionsTabComponent/>, document.getElementById("options_tab"));
	ReactDOM.render(<AutomationTabComponent/>, document.getElementById("automation_tab"));
	ReactDOM.render(<PrestigeTabComponent/>, document.getElementById("prestige_tab"));
	ReactDOM.render(<NavigationComponent/>, document.getElementById("navigation"));
} catch (e) {
	if (!errored) {
		alert("The game has encountered a fatal error during the initial render. Please report this bug in the discord as soon as possible. The next prompt will contain debug information regarding this. Please include that in the bug report.");
		alert("--DEBUG Information--\n" + e.stack);
		console.error(e);
		errored = true;
	}
}
