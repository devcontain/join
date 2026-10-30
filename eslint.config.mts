
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
      },
    },

    rules: {
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "no-constant-condition": "warn",
    },
  },
]);
