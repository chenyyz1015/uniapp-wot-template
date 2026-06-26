import type { Config } from "stylelint";

const config: Config = {
  ignoreFiles: ["src/uni_modules/**"],
  extends: [
    "stylelint-config-standard-scss",
    // 项目 Vue 均使用 lang="scss"，且须放在 extends 最后一项
    "stylelint-config-recommended-vue/scss",
  ],
  rules: {
    // Wot UI / UnoCSS 类名与 BEM 并存
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": null,
    "scss/selector-class-pattern": null,
    "custom-property-pattern": null,
    "no-descending-specificity": null,
    "import-notation": null,
    "no-empty-source": null,
    // uni-app 使用 rpx 单位
    "unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
    "keyframes-name-pattern": null,
    "color-function-notation": null,
    "color-function-alias-notation": null,
    "alpha-value-notation": null,
    "rule-empty-line-before": null,
    "comment-empty-line-before": null,
    "scss/double-slash-comment-empty-line-before": null,
    "declaration-empty-line-before": null,
    "declaration-block-no-redundant-longhand-properties": null,
    "shorthand-property-no-redundant-values": null,
    "no-invalid-position-declaration": null,
  },
};

export default config;
