#### 换肤

#### webpack的配置

#### 缓存

    抽离 boilerplate（[runtime & manifest）
    将 module identifier 默认的数字标识方式转成使用路径标识
    JS 文件使用 chunkhash
    抽离的 CSS 样式文件使用 contenthash
    gif|png|jpe?g|eot|woff|ttf|svg|pdf 等使用 hash
    设置 namedChunks 为 true