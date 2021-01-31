function RootComponent() {
	return (
		<>
			<EnergyComponent/>
			<LightWaterReactorComponent/>
		</>
	);
}

ReactDOM.render(<RootComponent/>, document.getElementById("root"));
