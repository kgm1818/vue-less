
const webpack = require('webpack');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: "../src/main.js",// 入口文件
    output: {// 输出文件
        publicPath: __dirname + '/build',// 添加静态资源，否则会出现路径错误
        path: __dirname + '/build',// 输出文件路径
        filename: '[name]-[hash].js' // 输出文件名,(实现合理缓存)webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
    },
    module:{// 加载器
        rules: [ //query：为loaders提供额外的设置选项（可选）
            {
                test: /\.js$/, //一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/ //include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader' //将所有的计算后的样式加入页面中,二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
                    },{
                        loader: 'css-loader', //使能够使用类似@import 和 url(...)的方法实现 require()的功能
                        options: { // .babelre 是babel的配置
                            modules: true, //// 指定启用css modules
                            // localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },{
                        loader: 'postcss-loader' // postcss-loader 和 autoprefixer（自动添加前缀的插件）
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ],
                exclude: ''
            }
        ]
    },
    devtool: 'eval-source-map', // 调试，webpack打包时生成的source maps，提供了一种对应编译文件和源文件的方法，容易调试。
    // devtool: 'null'   //注意修改了这里，这能大大压缩我们的打包代码
    devServer: {
        contentBase: __dirname, //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        port: 3000,
        inline: true, // 实时刷新
        hot: true,
        proxy: { // 请求代理
            // '/api':{
            //     'target': 'https://www.baidu.com',
            //     'changeOrigin': true
            // }
        }
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'), //添加了一个给打包后代码添加版权声明的插件。
        new webpack.HotModuleReplacementPlugin(), //热加载插件,在devServer中添加hot参数
        new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码；
        new CleanWebpackPlugin('build/*.*', { // 添加了hash之后，会导致改变文件内容后重新打包时，文件名不同而内容越来越多 ,去除build文件中的残余文件
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin('style.css'), // 分离CSS和JS文件
        new OpenBrowserWebpackPlugin({ // 打开浏览器
            url: 'http://localhost:3000'
        })
    ]

}
