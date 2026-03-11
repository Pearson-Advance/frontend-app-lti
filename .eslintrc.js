const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig('eslint', {
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
});
