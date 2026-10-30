
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],

    extends: [js.configs.recommended],

    languageOptions: {
      sourceType: "script",
      globals: {
        ...globals.browser,
        users: "writable",
        loaduser: "writable",
        generateContactDropdownHtml: "readonly",
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", {
        vars: "local",
        args: "after-used",
      }],
      "no-undef": "warn",
      "no-unused-expressions": "error",
    },
  },
]);
