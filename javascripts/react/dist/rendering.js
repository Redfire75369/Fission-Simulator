try {
	ReactDOM.render( /*#__PURE__*/React.createElement(NavigationComponent, null), document.getElementById("navigation"));
	ReactDOM.render( /*#__PURE__*/React.createElement(ProductionTabComponent, null), document.getElementById("production_tab"));
	ReactDOM.render( /*#__PURE__*/React.createElement(StatisticsTabComponent, null), document.getElementById("statistics_tab"));
	ReactDOM.render( /*#__PURE__*/React.createElement(AchievementsTabComponent, null), document.getElementById("achievements_tab"));
	ReactDOM.render( /*#__PURE__*/React.createElement(OptionsTabComponent, null), document.getElementById("options_tab"));
	ReactDOM.render( /*#__PURE__*/React.createElement(AutomationTabComponent, null), document.getElementById("automation_tab"));
	ReactDOM.render( /*#__PURE__*/React.createElement(PrestigeTabComponent, null), document.getElementById("prestige_tab"));
} catch(e) {
	console.error(e);
	alert("The game has encountered a fatal error while rendering.")
	alert("--DEBUG Information--\n" + e.stack);
}
