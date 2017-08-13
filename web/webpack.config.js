const path = require('path');
const fs = require('fs');

const entrypointsFolder = './assets/jsx/entrypoints';

const entryPoints = {};
const files = fs.readdirSync(entrypointsFolder);
for (let i = 0; i < files.length; i += 1) {
  const match = files[i].match(/^.+?(?=\.jsx?)/gi);
  if (match && match.length > 0) {
    entryPoints[match[0]] = `${entrypointsFolder}/${files[i]}`;
  }
}

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'public/javascripts/react'),
    filename: '[name]-bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
