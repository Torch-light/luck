/*
* @Author: torchlight
* @Date:   2016-11-19 11:44:17
* @Last Modified by:   Weetao
* @Last Modified time: 2016-12-12 14:35:43
*/

var webpack = require('webpack');

module.exports = {
    //插件项
  
    //页面入口文件配置
    entry: {
        app : './www/js/app.js',
        controller : './www/js/controllers.js',
        service : './www/js/services.js',
        actionController : './www/js/controllers/actionCtrl.js',
    },
    //入口文件输出配置
    output: {
        path: __dirname + '/output/',
    publicPath: "/output/",
    filename: 'result.js'
    },
    plugins: [
        //提公用js到common.js文件中
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        //将样式统一发布到style.css中
        // new ExtractTextPlugin("style.css", {
        //     allChunks: true,
        //     disable: false
        // }),
        //使用ProvidePlugin加载使用频率高的模块
        new webpack.ProvidePlugin({
            $: "webpack-zepto"
        })
    ],
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
        // extensions: ['', '.js', '.json', '.scss'],
        // alias: {
        //     filter: path.join(__dirname, 'src/filters')
        // }
    }
};