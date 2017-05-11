const graphQLConfig = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(graphQLConfig, {
  //add source map as a dataurl to bundle
  devtool: 'inline-source-map',
  //do we need watch?
  //watch: true
});

