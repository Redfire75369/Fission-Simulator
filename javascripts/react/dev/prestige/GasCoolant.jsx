class GasCoolantComponent extends ReactStateComponent {
	render() {
		return (
			<div className="flex__col" style={{height: "60vw", width: "60vw"}}>
				<div className="flex__row" style={{height: "40%"}}>
					<div style={{backgroundColor: "#CA2B3C", width: "20%"}}/>
				</div>
				<div className="flex__row" style={{height: "20%"}}>
					<div style={{backgroundColor: "#00B2D3", width: "40%"}}/>
					<div style={{backgroundColor: "#000000", borderRadius: "50%", width: "20%"}}/>
					<div style={{backgroundColor: "#40CE39", width: "40%"}}/>
				</div>
				<div className="flex__row" style={{height: "40%"}}>
					<div style={{backgroundColor: "#9037D6", width: "20%"}}/>
				</div>
			</div>
		);
	}
}
