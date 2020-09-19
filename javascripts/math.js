function pow(x, y) {
	return Math.pow(x, y);
}
function sqrt(x) {
	return Math.sqrt(x);
}
function log(x, y) {
	return Math.log(x) / Math.log(y);
}

function round(x, dp = 2) {
	return x.toFixed(dp);
}
function floor(x) {
	return Math.floor(x);
}
function ceil(x) {
	return Math.ceil(x);
}

function min(x, y) {
	return Math.min(x, y);
}
function max(x, y) {
	return Math.max(x, y);
}
function clamp(x, y, z) {
	return max(x, min(y, z));
}
