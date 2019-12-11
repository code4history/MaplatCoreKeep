const webpack = require('webpack');
const pjson = require('./package.json');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: ['./tmpl/web-bridge.js'],
    output: {
        path: `${__dirname}/dist`,
        filename: 'maplat_core.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules(?!\/@maplat\/tin)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        "presets": [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "usage",
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
                loader: 'url-loader'
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `${pjson.name} v${pjson.version} | ${pjson.author} | license: ${pjson.license}`
        })
    ]
};
