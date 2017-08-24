let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
let OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = (options) => {
    options = options || {};

    let debug = options.debug !== undefined ? options.debug: true;

    // entry声明
    let entries = {
        common: ['jquery', 'react', 'react-dom', 'redux', 'react-redux', 'immutable'],
        main: './src/index.js'
    };

    // plugin声明
    let plugins = [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin('[name].css'),
        new CommonsChunkPlugin({
            name: 'common'
        })
    ];
    if(debug) {
        entries.common.unshift(
            'webpack-hot-middleware/client?reload=true'
        );
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(!debug) {
        plugins.push(
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new OccurenceOrderPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        );
    }

    let config = {
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: options.publicPath ? options.publicPath : null,
            filename: '[name].js'
        },
        resolve: {
            extensions: ['', '.js', '.css']
        },
        module: {
            loaders: [
                { test: /\.json$/, loader: 'json' },
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
                { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css!postcss') }
            ]
        },
        postcss: [
            require('autoprefixer')
        ],
        plugins: plugins,
        devServer: {
            colors: true,
            historyApiFallback: true,
            inline: true,
            hot: true,
            port: 3000
        }
    };

    return config;
};