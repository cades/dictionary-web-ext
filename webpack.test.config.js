const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'test.DefinitionPanel': './test/test.DefinitionPanel.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: '#eval-source-map',
};
