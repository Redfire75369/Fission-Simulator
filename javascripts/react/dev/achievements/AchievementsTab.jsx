/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

class AchievementsTabComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	componentDidMount() {
		this.timerID = setInterval(function() {
			this.setState({
				active: player.navigation.naviTab === "achievements_tab"
			});
		}.bind(this), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div className="flex-col" style={{display: this.state.active ? "" : "none"}}>
				<AchievementsRowComponent row={1}/>
				<AchievementsRowComponent row={2}/>
			</div>
		);
	}
}
