const webpack = require('webpack');
const path = require('path');

const dataPath = path.join(__dirname, './data');
const scriptsPath = path.join(__dirname, './scripts');
const buildPath = path.join(__dirname, './build');

let graphQLConfig = Object.assign({
  entry: [
    'babel-polyfill',
    path.join(__dirname, './server.js'),
  ],
  output: {
    path: buildPath,
    filename: 'build-server.js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },
  externals: [
    /^(?!\.|\/).+/i, //ignore node modules
    /^[a-z\-0-9]+$/, //all non-relative modules are external
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [
        scriptsPath,
        dataPath,
      ],
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      },
    }]
  }
});

module.exports = {
  graphQLConfig
};
