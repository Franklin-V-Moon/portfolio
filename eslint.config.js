const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");

module.exports = [
	{ ignores: [".next/**", "out/**"] },
	...nextCoreWebVitals,
	{
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			// React Compiler readiness rules newly bundled with eslint-config-next@16's
			// react-hooks plugin. Real findings (tracked as P2.1/P2.5 in
			// .ai/plans/Modernization.md) but fixing them is a separate refactor from
			// this Next/React version bump, so surface as warnings rather than errors.
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/static-components": "warn",
			"react-hooks/refs": "warn",
			"react-hooks/immutability": "warn",
		},
	},
];
