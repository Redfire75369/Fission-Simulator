/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

function pow(base, exponent) {
	return Math.pow(base, exponent);
}
function sqrt(value) {
	return Math.sqrt(value);
}
function log(value, base) {
	return Math.log(value) / Math.log(base);
}

function round(value, dp = 2) {
	return value.toFixed(dp);
}
function floor(value) {
	return Math.floor(value);
}
function ceil(value) {
	return Math.ceil(value);
}

function min(value1, value2) {
	return Math.min(value1, value2);
}
function max(value1, value2) {
	return Math.max(value1, value2);
}
function clamp(minimum, value, maximum) {
	return max(minimum, min(value, maximum));
}
