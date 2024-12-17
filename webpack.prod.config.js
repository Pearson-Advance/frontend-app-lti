const path = require('path');
const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('webpack-prod', {
  resolve: {
    alias: {
      features: path.resolve(__dirname, 'src/features'),
      assets: path.resolve(__dirname, 'src/assets'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
  ignoreWarnings: [
    {
      // Despite the .map is properly referenced, webpack can't handle it
      module: /react-responsive/,
    },
  ],
});
