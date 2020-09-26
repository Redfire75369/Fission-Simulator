function ProductionTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.naviTab === "production_tab");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div style={{display: active ? "" : "none"}}>
			<div>
				<MinesComponent/>
			</div>

			<div>
				<FissionReactorsSubTabComponent/>
			</div>
		</div>
	);
}
