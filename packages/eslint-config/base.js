const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  eslintPluginPrettierRecommended,
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "turbo",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    ".*.js",
    "*.setup.js",
    "*.config.js",
    ".turbo/",
    "dist/",
    "coverage/",
    "node_modules/",
  ],
};
