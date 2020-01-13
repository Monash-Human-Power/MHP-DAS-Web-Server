const {
  override,
  addWebpackAlias,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
  }),
);
