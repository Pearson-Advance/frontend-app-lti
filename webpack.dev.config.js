const path = require('path');
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');

// Ensure resolve/alias exist, then extend
config.resolve = config.resolve || {};
config.resolve.alias = {
  ...(config.resolve.alias || {}),
  components: path.resolve(__dirname, 'src/components'),
  features: path.resolve(__dirname, 'src/features'),
  assets: path.resolve(__dirname, 'src/assets'),
  hooks: path.resolve(__dirname, 'src/hooks'),
};

// Allow access via any hostname, and listen on all interfaces
config.devServer = config.devServer || {};
config.devServer.allowedHosts = ['all'];
config.devServer.host = '0.0.0.0';
config.devServer.port = process.env.PORT || 1981;

module.exports = config;
