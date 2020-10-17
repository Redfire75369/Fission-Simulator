class AchievementsTabComponent extends React.Component {
	componentDidMount() {
		this.timerID = setInterval(function() {
			this.setState({
				active: player.navigation.naviTab === "achievements_tab"
			});
		}, 50);
	}
	
	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		return (
			<div className="flex-col" style={{display: active ? "" : "none"}}>
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
