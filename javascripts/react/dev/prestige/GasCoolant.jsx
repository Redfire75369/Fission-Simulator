class GasCoolantComponent extends ReactStateComponent {
	render() {
		return (
			<div className="flex-col" style={{height: "60vw", width: "60vw"}}>
				<div className="flex-row horizontal-center vertical-center" style={{height: "23vw", width: "12vw"}}>
					<div style={{backgroundColor: "#CA2B3C", height: "23vw", width: "12vw"}}/>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{height: "14vw", width: "60vw"}}>
					<div style={{backgroundColor: "#00B2D3", maxHeight: "12vw", minHeight: "12vw", width: "24vw"}}/>
					<div style={{backgroundColor: "#000000", borderRadius: "6vw", margin: "1vw", maxHeight: "12vw", maxWidth: "12vw",  minHeight: "12vw",}}/>
					<div style={{backgroundColor: "#40CE39", maxHeight: "12vw", minHeight: "12vw", width: "24vw"}}/>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{height: "23vw", width: "12vw"}}>
					<div style={{backgroundColor: "#9037D6", height: "23vw", width: "12vw"}}/>
				</div>
			</div>
		);
	}
}
