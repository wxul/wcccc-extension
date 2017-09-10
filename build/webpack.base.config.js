var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var include = [
    path.resolve(__dirname, '../src/')
];

module.exports = {
    cache: true,
    devtool: 'cheap-module-source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
        vendor: ['vue']
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                include: include
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: include
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|md)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.runtime.js',
            '@src': path.resolve(__dirname, '../src'),
            '@assets': path.resolve(__dirname, '../src/assets'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@page': path.resolve(__dirname, '../src/page'),
            '@store': path.resolve(__dirname, '../src/store')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
            DEBUG: JSON.stringify((process.env.NODE_ENV == 'development')),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]
};