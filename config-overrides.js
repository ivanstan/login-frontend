const {
  override,
  disableEsLint,
  addBabelPresets,
  addBabelPlugins,
} = require('customize-cra');

module.exports = override(
  // disable eslint in webpack
  disableEsLint(),

  ...addBabelPresets([
    '@babel/preset-env',
    {
      modules: false,
      useBuiltIns: false,
      debug: false,
    },
  ]),
  ...addBabelPlugins(
    'babel-plugin-styled-components',
    'babel-plugin-jsx-remove-data-test-id'
  )
);
