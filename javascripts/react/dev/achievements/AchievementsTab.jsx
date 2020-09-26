function AchievementsTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "achievements_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

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
