// @ts-check

import { fileURLToPath } from "node:url";
import { fixupConfigRules } from "@eslint/compat";
import { defineConfig, globalIgnores, includeIgnoreFile } from "eslint/config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import sort from "eslint-plugin-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
	includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url)), {
		gitignoreResolution: true
	}),
	globalIgnores(["eslint.config.js"]),
	fixupConfigRules(tseslint.configs.strictTypeChecked),
	fixupConfigRules(tseslint.configs.stylisticTypeChecked),
	fixupConfigRules(react.configs.flat.recommended),
	fixupConfigRules(react.configs.flat["jsx-runtime"]),
	fixupConfigRules(reactHooks.configs.flat.recommended),
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.es2015,
				...globals.browser
			},
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		},
		plugins: {
			sort
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": ["error"],
			"@typescript-eslint/consistent-type-definitions": ["off"],
			"@typescript-eslint/no-empty-function": ["off"],
			"@typescript-eslint/no-floating-promises": [
				"error",
				{
					ignoreIIFE: true
				}
			],
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					"checksVoidReturn": {
						"arguments": false,
						"attributes": false
					}
				}
			],
			"@typescript-eslint/no-namespace": ["off"],
			"@typescript-eslint/no-non-null-assertion": ["off"],
			"@typescript-eslint/no-unnecessary-type-parameters": ["off"],
			"@typescript-eslint/no-unsafe-assignment": ["off"],
			"@typescript-eslint/no-unsafe-return": ["off"],
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ varsIgnorePattern: "^_+$" }
			],
			"@typescript-eslint/prefer-for-of": ["off"],
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowAny: false,
					allowBoolean: false,
					allowNever: false,
					allowNullish: false,
					allowNumber: true,
					allowRegExp: false
				}
			],
			"no-var": ["off"],
			"prefer-const": ["off"],
			"prefer-rest-params": ["off"],
			"prefer-spread": ["off"],
			"react-hooks/exhaustive-deps": ["error"],
			"react-hooks/incompatible-library": ["error"],
			"react-hooks/unsupported-syntax": ["error"],
			"react/display-name": ["off"],
			"react/function-component-definition": [
				"error",
				{ namedComponents: "function-declaration" }
			],
			"react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
			"react/jsx-no-leaked-render": ["error"],
			"react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
			"react/no-unknown-property": ["error", { ignore: ["css"] }],
			"react/prop-types": ["off"],
			"sort/type-properties": ["error"]
		},
		settings: {
			react: {
				pragma: "React",
				version: "detect"
			}
		}
	}
);
