function GasCoolantsComponent() {
	return (
		<div className="flex-row" style={{marginTop: "min(2vw, 2vh)", maxHeight: "min(55vw, 55vh)", minHeight: "min(55vw, 55vh)", width: "min(80vw, 80vh)"}}>
			<GasCoolantColumnComponent colour={"#CA2B3C"} type={0} name={"Heat Capacity"}/>
			<GasCoolantColumnComponent colour={"#00B2D3"} type={1} name={"Flow Rate"}/>
			<GasCoolantColumnComponent colour={"#40CE39"} type={2} name={"Efficiency"}/>
			<GasCoolantColumnComponent colour={"#9037D6"} type={3} name={"Nobility"}/>
		</div>
	);
}
