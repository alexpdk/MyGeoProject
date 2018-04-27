const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
    module : {
        loaders : [
            {
                test : /\.jsx?/,
                include : APP_DIR,
                loaders: ['babel-loader?'+JSON.stringify({
                    presets: [
                        ["env", {
                            "targets": {
                                "node": "6.11"
                            }
                        }], 'react', 'stage-0'
                    ]
                })
                ]
            },{
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },{
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/MyGeoProject/build/'
    }
};