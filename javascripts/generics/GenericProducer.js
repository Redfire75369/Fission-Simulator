class GenericProducer {
	constructor(start, scale, secScale, scalePrice) {
		this.startCost = Decimal.pow(10, start);
		this.scaleCost = Decimal.pow(10, scale);
		this.secScaleCost = secScale;
		this.scaleStartCost = Decimal.pow(10, scalePrice);
		this.bought = 0;
		this.amount = zero;
	}

	reset() {
		this.bought = 0;
		this.amount = zero;
	}

	get preSecScale() {
		return floor(this.scaleStartCost.div(this.costStart).log10() / this.costMult.log10());
	}
	get cost() {
		return this.startCost.mul(this.scaleCost.pow(this.bought)).mul(Decimal.pow(this.secScaleCost, Decimal.max(0, this.bought - this.preInf - 1).mul(this.bought - this.preInf).div(2)));
	}
}