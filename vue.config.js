const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, './dist'),
  devServer: {
    proxy: 'http://localhost:4000'
  },
  configureWebpack: {
    optimization: {
      minimize: false
    }
  },
  parallel: false
};
