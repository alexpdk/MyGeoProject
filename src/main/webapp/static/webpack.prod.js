const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = merge(common, {
    devtool: 'source-map',
    entry: [
        APP_DIR + '/index.jsx'
    ],
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
           'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
});