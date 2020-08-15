module.exports = {
	"env": {
		"browser": true,
		"es2020": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11,
		"sourceType": "module"
	},
	"globals": {
		"player": true,
		"getDefaultData": true,
		"Decimal": true,
		"LZString": true,
		"Mousetrap": true,
		"ADNotations": true,
		"ADCommunityNotations": true
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
