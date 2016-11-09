var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './app/polyfills.ts',
        'vendor': './app/vendor.ts',
        'app': './app/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },
            {
                test: /\.less$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!less-loader")
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ]
};

