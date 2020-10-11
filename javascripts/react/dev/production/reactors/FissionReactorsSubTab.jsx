function FissionReactorsSubTabComponent() {
	const [active, setActive] = React.useState(false);

	React.useEffect(function() {
		const timerID = setInterval(function() {
			setActive(player.navigation.production === "reactors");
		}, 50);

		return function() {
			clearInterval(timerID);
		};
	}, []);

	return (
		<div style={{display: active ? "" : "none"}}>
			<div className="flex-row">
				<TRISOFuelComponent tier={0}/>
				<TRISOFuelComponent tier={1}/>
				<TRISOFuelComponent tier={2}/>
			</div>
			<div className="flex-row">
				<PebblebedFissionReactorComponent tier={0}/>
				<PebblebedFissionReactorComponent tier={1}/>
				<PebblebedFissionReactorComponent tier={2}/>
			</div>
		</div>
	);
}
