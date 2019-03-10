const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = pathName => path.resolve(__dirname, pathName);

const { MODE } = process.env;

module.exports = {
    mode: MODE,
    entry: { app: resolve('src/index.js') },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve('build/')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: resolve('src/index.html'),
            favicon: resolve('src/assets/images/favicon.ico')
        }),
        new webpack.ProvidePlugin({
            axios: 'axios'
        }),
        new webpack.DefinePlugin({
            MODE,
            IS_PRODUCTION: MODE === 'production',
            IS_DEVELOPMENT: MODE === 'development'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve('build/'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            'app': resolve('src/app'),
            'constants': resolve('src/constants')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'html-loader'
            }
        ]
    }
};