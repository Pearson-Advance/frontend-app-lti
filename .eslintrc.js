const { createConfig } = require('@edx/frontend-build');

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
