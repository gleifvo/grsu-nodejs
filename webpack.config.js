const webpack = require('webpack');
const path = require('path');
const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: APP_DIR,
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, include: APP_DIR, loader: 'babel-loader', query: { presets: ['react'] }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader', allChunks: true })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader',
                    allChunks: true
                })
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'bundle.css' }),
        new OptimizeCssAssetsPlugin({ assetNameRegExp: /\.css$/ })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.jsx', '.js']
    }
};