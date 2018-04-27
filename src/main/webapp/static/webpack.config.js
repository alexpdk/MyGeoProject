const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');

const APP_DIR = path.resolve(__dirname, 'src');

const config = merge(common, {
    devServer: {
        contentBase: './',
        hot: true,
        inline: true,
        port: 8081
    },
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        APP_DIR + '/index.jsx'
    ],
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
});

module.exports = config ;