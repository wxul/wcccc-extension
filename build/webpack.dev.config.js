const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseconfig = require('./webpack.base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const APP_PATH = path.resolve(__dirname, '../dist');
const PRO_PATH = path.resolve(__dirname, '../');
const STATIC_PATH = path.resolve(__dirname, '../static');

var config = Object.assign({}, baseconfig, {
    output: {
        path: APP_PATH,
        publicPath: './',
        filename: '[name].js',
        chunkFilename: '[name],[chunkhash].min.js'
    }
});

config.plugins = (baseconfig.plugins || []).concat([
    new HtmlWebpackPlugin({
        filename: 'options.html',
        template: 'src/options.html',
        inject: true,
        env: process.env.NODE_ENV,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: false
        }
    }),
    new CopyWebpackPlugin([{
        from: STATIC_PATH
    }])
]);

module.exports = config;