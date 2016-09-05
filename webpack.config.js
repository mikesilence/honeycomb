'use strict';

var config;
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// var root = 'honeycomb';
var assets = {
  input: 'assets',
  output: 'static'
}

config = {
  entry:  {
    commons: [
      path.resolve(__dirname, assets.input, 'js', 'commons.js')
    ],
    application: [
      path.resolve(__dirname, assets.input, 'js', 'application.js'),
      path.resolve(__dirname, assets.input, 'sass', 'application.sass')
    ]
    // bootstrap: [
    //   path.resolve(__dirname, 'assets', 'javascripts', 'bootstrap.js'),
    //   path.resolve(__dirname, 'assets', 'javascripts', 'bootstrap-sprockets.js'),
    //   path.resolve(__dirname, 'assets', 'stylesheets', '_bootstrap.scss'),
    //   path.resolve(__dirname, 'assets', 'stylesheets', 'shop-homepage.css'),
    // ],

    // application: [
    //   path.resolve(__dirname, 'assets', 'javascripts', 'application.js')
    // ]
  },
  output: {
    path: path.resolve(__dirname, assets.output),
    publicPath: './static/',
    filename: '[name]/[name].js'
  },
  resolve: {
    moduleDirectories: ['node_modules'],
    root: path.resolve(__dirname, assets.input),
    alias: {
      _fonts: 'fonts',
      _images: 'images',
      _sass: 'sass',
      _js: 'js',
    },
  },
  module: {
    loaders: [{
      test: /\.(eot|woff|woff2|ttf)$/,
      loader: 'url?name=fonts/[hash].[ext]&limit=5000',
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url?name=images/[hash].[ext]&limit=5000',
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(css()),
    }, {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract(css()),
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(css()),
    }],
  },

  debug: process.env.NODE_ENV !== 'build',

  watch: process.env.NODE_ENV !== 'build',

  devtool: process.env.NODE_ENV !== 'build' ? 'source-map' : null,

  plugins: [
    new ExtractTextPlugin('[name]/[name].css', {allChunks: true}),
    new AssetsPlugin({
      filename: 'static.json',
      path: path.resolve(__dirname, 'static'),
      update: true,
      prettyPrint: true,
    })
  ]
};

if (process.env.NODE_ENV === 'build') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warning: false,
        drop_console: true,
        unsafe: true,
      }
    })
  )
}

/**
* Add autoprefixer
*
* @return {string} 
*/
function css() {
  return (process.env.NODE_ENV === 'build')
    ?'css!autoprefixer-loader?browsers=last 5 version!sass'
    :'css!sass?sourceMap&indentedSyntax';
}

module.exports = config;