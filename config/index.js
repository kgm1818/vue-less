

module.exports = {
    entry: "../src/main.js",// 入口文件
    output: {// 输出文件
        publicPath: __dirname + '/build',// 添加静态资源，否则会出现路径错误
        path: __dirname + '/build',// 输出文件路径
        filename: '[name].js' // 输出文件名
    },
    module:{// 加载器
        rules: [
            {
                test: '',
                use: []
            }
        ]
    }

}
