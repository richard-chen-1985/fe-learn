# extract text plugin for webpack

webpack 1 version see [the README in the webpack-1 branch](https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md)。

## 使用

```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader"
            }) }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
}
```

它会把每个`entry chunks`中的`require("style.css")`输出到单独的css文件。所以样式代码不再混合进javascript代码，而是打包在一个`styles.css`文件中。这样样式文件就可以和javascript文件并行下载，如果你的样式文件很大的情况下，加载速度会比混合在一起更快。

优点：

* 不用style标签（老旧IE浏览器有限制）
* css sourcemap（`devtool:"source-map"` 和 `css-loader?sourceMap`）
* 并行css请求
* css单独缓存
* 执行更快（更少的代码和DOM操作）

当然也有提示：

* 更多的http请求
* 更长的编译时间
* 配置更复杂
* 不能在开发时监听修改发布到public path
* 不能进行热替换

## API

```javascript
new ExtractTextPlugin(options: filename | object)
```

* `options.filename`: `string` 生成的结果文件名。包含 `[name]`, `[id]` 和 `[contenthash]`
    * `[name]` chunk的名称
    * `[id]` chunk的数字
    * `[contenthash]` 提取出来的文件内容的hash值
* `options.allChunks`: `boolean` 提取所有附加chunks（默认只提取初始的chunks）
* `options.disable`: `boolean` 禁用插件
* `options.id`: `string` 插件实例的标识ID（默认会自动生成，高级用法）

`ExtractTextPlugin` 对每个`entry`都会产出一个文件，所以你必须使用`[name]`, `[id]` 或者 `[contenthash]` 来保证文件名不冲突。

从已有的`loader`提取内容。支持 `{ loader: string; query: object }。

* `options.loader`: `string | object | loader[]` （必须），`loader`用来将源码编译成css输出模块（export module）
* `options.fallbackLoader`: `string | object | loader[]` 当css不能被提取的时候用的`loader`（比如：有附加chunk并且 `allChunks: false`时）
* `options.publicPath`: `string` 重写`loader`的`publicPath`

如果需要多个ExtractTextPlugin，可以直接用`new`来创建实例

```javascript
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// multiple extract instances
let extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
let extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

module.exports = {
  ...
  module: {
    loaders: [
      { test: /\.scss$/i, loader: extractCSS.extract(['css','sass']) },
      { test: /\.less$/i, loader: extractLESS.extract(['css','less']) },
      ...
    ]
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
};
```