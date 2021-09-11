import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: "src/main.js",
	output: {
		file: "dist/bundle.js",
		format: "iife",
		exports: "none",
	},

	plugins: [
		commonjs({
			include: "node_modules/**"
		}),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
		}),
		replace({
			preventAssignment: true,
			"process.env.NODE_ENV": "'development'"
		}),
		resolve({
			browser: true
		}),
	],
};

export default config;
