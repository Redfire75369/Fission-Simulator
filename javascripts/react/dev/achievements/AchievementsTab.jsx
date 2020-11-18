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
				<div className="flex-row">
					<AchievementComponent id={11}/>
					<AchievementComponent id={12}/>
					<AchievementComponent id={13}/>
					<AchievementComponent id={14}/>
					<AchievementComponent id={15}/>
					<AchievementComponent id={16}/>
					<AchievementComponent id={17}/>
					<AchievementComponent id={18}/>
				</div>
				<div className="flex-row">
					<AchievementComponent id={21}/>
					<AchievementComponent id={22}/>
					<AchievementComponent id={23}/>
					<AchievementComponent id={24}/>
					<AchievementComponent id={25}/>
					<AchievementComponent id={26}/>
					<AchievementComponent id={27}/>
					<AchievementComponent id={28}/>
				</div>
			</div>
		);
	}
}
