import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";  
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/*"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"]
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    languageOptions: 
    { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
];

//"extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"]