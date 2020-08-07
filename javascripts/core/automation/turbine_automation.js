class DynamoCoilAutomation extends GenericAutomation {
	constructor(action) {
		super(action);
		this.preset = [];
	}

	selectPreset(preset) {
		this.preset = preset;
	}
}