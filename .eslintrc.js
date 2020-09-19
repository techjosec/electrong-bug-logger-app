module.exports = {
	env: {
		browser  : true,
		commonjs : true,
		es2020   : true,
	},
	extends: [
		`airbnb`,
		`eslint:recommended`,
		`plugin:react/recommended`,
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
	},
	plugins: [
		`react`,
	],
	rules: {
        "react/jsx-filename-extension" : [1, { extensions: [`.js`, `.jsx`] }],
        "react/jsx-indent"             : [ 'off' ],
		'consistent-return'            : `error`,
		'brace-style'                  : [`error`, `allman`],
		'space-in-parens'              : [`error`, `always`],
		'linebreak-style'              : [`off`],
		indent                         : [`error`, `tab`],
		'no-tabs'                      : [`error`, { allowIndentationTabs: true }],
		quotes                         : [`error`, `backtick`],
		'key-spacing'                  : [`error`, {
			align: {
				beforeColon : true,
				afterColon  : true,
				on          : `colon`,
			},
        }],
        'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }]
	},
};
