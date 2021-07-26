/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.common.js");
const LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, "../dist_packed"),
    filename: './assets/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      }
    ]
  },

  plugins: [
    new LicenseWebpackPlugin({
      outputFilename: 'assets/[name].licenses.txt',
      addBanner: true,
      renderBanner: (filename, modules) => {
        //console.log(modules);
        return '/*! licenses are at ' + filename + '*/';
      },
      additionalModules: [
        {
          name: '@maplat/core',
          directory: path.resolve(__dirname, '..')
        }
      ],
      chunkIncludeExcludeTest: {
        exclude: ['child', 'HtmlWebpackPlugin_0']
      }
    })
  ]
});
