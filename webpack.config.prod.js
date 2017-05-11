const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const graphQLConfig = require('./webpack.config');

module.exports = webpackMerge(graphQLConfig, {
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    //performs search-and-replace operations on the original source code. 
    // Any occurrence of process.env.NODE_ENV in the imported 
    // code is replaced by "production"
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  devtool: 'source-map',
});

