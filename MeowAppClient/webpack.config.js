const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: './client/index.js',
    resolve: {
        alias: {
            datepicker_css: __dirname + "/node_modules/react-datepicker/dist/datepicker.css"
        }
    },
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.(css|scss)$/, loader: ['style-loader', 'css-loader'] },
            { test: /\.(png|jpg|ico)$/, loader: 'url-loader' }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [HtmlWebpackPluginConfig],
    externals: {
        'Config': JSON.stringify(require('./client/config.json'))
    }
}