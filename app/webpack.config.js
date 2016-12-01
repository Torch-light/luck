/*
* @Author: torchlight
* @Date:   2016-11-19 11:44:17
* @Last Modified by:   torchlight
* @Last Modified time: 2016-11-19 11:45:04
*/

var webpack = require('webpack');

module.exports = {
    //插件项
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        //将样式统一发布到style.css中
        new ExtractTextPlugin("style.css", {
            allChunks: true,
            disable: false
        }),
        //使用ProvidePlugin加载使用频率高的模块
        new webpack.ProvidePlugin({
            $: "webpack-zepto"
        })
    ],
    //页面入口文件配置
    entry: {
        index : './src/main.js'
    },
    //入口文件输出配置
    output: {
        path: __dirname +'/dist/',
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    }
};