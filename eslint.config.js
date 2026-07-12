const nextCoreWebVitals = require("eslint-config-next/core-web-vitals");

module.exports = [
	{ ignores: [".next/**", "out/**"] },
	...nextCoreWebVitals,
	{
		rules: {
			semi: ["error", "always"],
			quotes: ["error", "double"],
			"react-hooks/set-state-in-effect": "warn",
			"react-hooks/static-components": "warn",
			"react-hooks/refs": "warn",
			"react-hooks/immutability": "warn",
		},
	},
];
