/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BASE_PATH = path.resolve(__dirname, '..');
const prodConfig = {
  mode: 'production',
  plugins: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};

module.exports = env => {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  const common = require('../../../config/webpack.prod')(env);
  const config = merge(prodConfig, {
    entry: {
      [env.FILE_NAME]: path.resolve(BASE_PATH, 'src/'),
    }
  });
  return merge(common, config);
};
