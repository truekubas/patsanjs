const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'dist.bundle.js',
        libraryTarget: 'var',
        library: 'Patsan'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /.*node_modules((?!localModule).)*$/,
                query: {
                    presets: ['env'],
                    plugins: [
                        ["transform-runtime", {"polyfill": false}, 'transform-decorators-legacy']
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};