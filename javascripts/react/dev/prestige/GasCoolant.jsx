class GasCoolantComponent extends ReactStateComponent {
	render() {
		return (
			<div className="flex-col" style={{height: "60vw", marginTop: "2vw", width: "60vw"}}>
				<div className="flex-row horizontal-center vertical-center" style={{minHeight: "6vw", marginBottom: "1vw", width: "6vw"}}>
					<button onClick={function() {assignResearch(0)}} className="" style={{minHeight: "6vw"}}>▲</button>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{height: "23vw", width: "12vw"}}>
					<div style={{backgroundColor: "#CA2B3C", height: "23vw", width: "12vw"}}/>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{height: "14vw", width: "74vw"}}>
					<button onClick={function() {assignResearch(1)}} className="" style={{marginRight: "1vw", maxHeight: "6vw", maxWidth: "6vw", minHeight: "6vw", minWidth: "6vw"}}>◀</button>
					<div style={{backgroundColor: "#00B2D3", maxHeight: "12vw", minHeight: "12vw", width: "24vw"}}/>
					<div style={{backgroundColor: "#000000", borderRadius: "6vw", margin: "1vw", maxHeight: "12vw", maxWidth: "12vw",  minHeight: "12vw",}}/>
					<div style={{backgroundColor: "#40CE39", maxHeight: "12vw", minHeight: "12vw", width: "24vw"}}/>
					<button onClick={function() {assignResearch(2)}} className="" style={{marginLeft: "1vw", maxHeight: "6vw", maxWidth: "6vw", minHeight: "6vw", minWidth: "6vw"}}>▶</button>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{height: "23vw", width: "12vw"}}>
					<div style={{backgroundColor: "#9037D6", height: "23vw", width: "12vw"}}/>
				</div>
				<div className="flex-row horizontal-center vertical-center" style={{minHeight: "6vw", marginTop: "1vw", width: "6vw"}}>
					<button onClick={function() {assignResearch(3)}} className="" style={{minHeight: "6vw"}}>▼</button>
				</div>
			</div>
		);
	}
}
