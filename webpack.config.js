const webpack = require('webpack');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/build',// 输出文件路径
        filename: '[name].js' // 输出文件名,(实现合理缓存)webpack可以把一个哈希值添加到打包的文件名中，使用方法如下,添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前
    },
    modules: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /none_modules/
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
            }
        ]
    },
    devServer: {
        // env: {
        //     NODE_ENV: '"development"'
        // },
        contentBase: __dirname, //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        port: 8002,
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
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8002'
        })
    ]

}
