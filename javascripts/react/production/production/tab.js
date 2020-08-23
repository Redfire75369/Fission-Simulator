class TRISOFuelsComponent extends React.Component {
	render() {
		return /*#__PURE__*/React.createElement("div", {
			className: "flex__row"
		}, /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 0
		}), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 1
		}), /*#__PURE__*/React.createElement(TRISOFuelComponent, {
			tier: 2
		}));
	}

}

class PebblebedReactorsComponent extends React.Component {
	render() {
		return /*#__PURE__*/React.createElement("div", {
			className: "flex__row"
		}, /*#__PURE__*/React.createElement(PebblebedReactorComponent, {
			tier: 0
		}), /*#__PURE__*/React.createElement(PebblebedReactorComponent, {
			tier: 1
		}), /*#__PURE__*/React.createElement(PebblebedReactorComponent, {
			tier: 2
		}));
	}

}

class PebblebedReactorsSubSubTabComponent extends ReactStateComponent {
	tick() {
		this.setState({
			active: player.navigation.production === "reactors"
		});
	}

	render() {
		return /*#__PURE__*/React.createElement("div", {
			style: {
				display: this.state.active ? "" : "none"
			}
		}, /*#__PURE__*/React.createElement(TRISOFuelsComponent, null), /*#__PURE__*/React.createElement("div", {
			className: "flex__row",
			style: {
				minHeight: "2vh"
			}
		}), /*#__PURE__*/React.createElement(PebblebedReactorsComponent, null));
	}

}

class ProductionTab extends ReactStateComponent {
	tick() {
		this.setState({
			unlockedMines: player.unlocked.mines || player.energy.gt(250)
		});
	}

	render() {
		return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
			className: "navigation subtab"
		}, /*#__PURE__*/React.createElement(ProductionMinesNavigationButton, {
			tab: "mines",
			text: "Mines"
		}), /*#__PURE__*/React.createElement(ProductionNavigationButton, {
			tab: "reactors",
			text: "Reactors"
		})), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MinesComponent, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PebblebedReactorsSubSubTabComponent, null)));
	}

}

ReactDOM.render( /*#__PURE__*/React.createElement(ProductionTab, null), document.getElementById("production_tab"));
