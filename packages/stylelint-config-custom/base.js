module.exports = {
  extends: "stylelint-config-standard-scss",
  plugins: ["stylelint-order"],
  ignoreFiles: ["../wethegit-components/storybook-static/**/*.css"],
  rules: {
    "at-rule-no-unknown": null,
    "function-no-unknown": null,
    "scss/function-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "order/order": ["dollar-variables", "custom-properties", "declarations"],
    "order/properties-alphabetical-order": true,
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      {
        message: (sel) => `Expected class selector "${sel}" to be lowerCamelCase`,
      },
    ],
  },
  overrides: [
    {
      files: [
        "../wethegit-components/src/utilities/**/*.js",
        "../wethegit-components/src/utilities/**/*.ts",
      ],
      rules: {
        "order/properties-alphabetical-order": null,
        "selector-class-pattern": null,
      },
    },
  ],
}
