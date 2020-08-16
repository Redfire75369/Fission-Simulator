module.exports = {
	"env": {
		"browser": true,
		"node": true,
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
		"zero": true,
		"infinity": true,
		"notation": true,
		"Decimal": true,
		"LZString": true,
		"Mousetrap": true,
		"ADNotations": true,
		"ADCommunityNotations": true
	},
	"rules": {
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
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
		],
		"no-else-return": [
			"error",
			{
				"allowElseIf": true
			}
		],
		"default-case": "error",
		"array-bracket-newline": [
			"warn",
			"consistent"
		],
		"eol-last": [
			"error",
			"always"
		]
	}
};
