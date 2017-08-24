# webpack config 说明

## context

`entry`选项的根目录，`output.pathinfo`相对于这个目录，默认`process.cwd()`

## entry

模块的入口点，` {string} | {array} | {object}`

* `{string}` : 该模块作为入口模块
* `{array}` : 所有的模块作为入口模块，最后一个为出口文件
* `{object}` : 多个入口文件，`key`作为`chunk name`， `value`作为入口文件，可以为`string`或者`array`。

```javascript
entry: ['./entry1', './entry2']
```

或者

```javascript
{
    entry: {
        page1: "./page1",
        page2: ["./entry1", "./entry2"]
    },
    output: {
        // Make sure to use [name] or [id] in output.filename
        //  when using multiple entry points
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }
}
```

## output

影响编译输出的选项。

### `output.filename`

定义输出的文件名，这里不能是绝对路径。

**单入口**

```javascript
{
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: './built'
  }
}
// writes to disk: ./built/bundle.js
```

**多入口**

如果你配置了多个入口，输入文件名就必须用每个文件的标识名称，以避免重名覆盖，比如：
* `[name]` chunk的名称
* `[hash]` 编译时的hash（每个文件都一样）
* `[chunkhash]` 单个chunk的hash

`[hash] | [chunkhash]`类似配置可以指定长度，比如`[hash:5]`表示只取`hash`值的前5位。

```javascript
{
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/built'
  }
}
// writes to disk: ./built/app.js, ./built/search.js
```

### output.path

输出目录的**绝对路径**（必须）

### output.publicPath

定义输出文件在浏览器中浏览时的url前缀。可以很方便的加上CDN前缀等功能。`webpack-dev-server`也会用到这个选项来作为资源文件的访问路径。

**config.js**

```javascript
output: {
    path: "/home/proj/public/assets",
    publicPath: "/assets/"
}
```

**index.html**

```html
<head>
  <link href="/assets/spinner.gif"/>
</head>
```

加上CDN前缀的例子

**config.js**

```javascript
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```

### output.chunkFilename

不是入口文件的`chunks`相对于`output.path`目录，同样具有`[id], [name], [hash], [chunkhash]`。

### output.sourceMapFilename

javascript文件的sourcemap生成目录。

### output.devtoolModuleFilenameTemplate

### output.devtoolFallbackModuleFilenameTemplate

### output.devtoolLineToLine

### output.hotUpdateChunkFilename

### output.hotUpdateMainFilename

### output.jsonpFunction

### output.hotUpdateFunction

### output.pathinfo

在模块的注释信息中显示，默认为`false`

```
require(/* ./test */ 23)
```

### output.library

如果设置，输出`bundle·为库。`output.library`是名称。如果是你在写一个库并且想发布成一个单独的文件，可以用它。

### output.libraryTarget

输出库的格式：
* "var" - 输出为 `var Library = xxx` （默认）
* "this" - `this["Library"] = xxx`
* "commonjs" - `exports["Library"] == xxx`
* "commonjs2" - `module.exports = xxx`
* "amd" - AMD
* "umd" - AMD, CommonJS2 或者 root的一个属性

### output.umdNamedDefine

### output.sourcePrefix

### output.crossOriginLoading

## module

影响普通模块的选项

### module.loaders

```javascript
module.loaders: [
  {
    // "test" is commonly used to match the file extension
    test: /\.jsx$/,

    // "include" is commonly used to match the directories
    include: [
      path.resolve(__dirname, "app/src"),
      path.resolve(__dirname, "app/test")
    ],

    // "exclude" should be used to exclude exceptions
    // try to prefer "include" when possible

    // the "loader"
    loader: "babel-loader"
  }
]
```

### module.preLoaders, module.postLoaders

### module.noParse

用正则或者数组指定不编译的文件。

### module.xxxContextXxx 自动创建默认的contexts

## resolve

影响 处理模块 的选项

### resolve.alias

模块的别名

| alias | require("xyz") | require("xyz/file.js") |
|-------|----------------|------------------------|
| {}    | /abc/node_modules/xyz/index.js | /abc/node_modules/xyz/file.js |
| { xyz: "/absolute/path/to/file.js" } | /absolute/path/to/file.js | /abc/node_modules/xyz/file.js |
| { xyz: "./dir/file.js" } | /abc/dir/file.js | /abc/node_modules/xyz/file.js |

### resolve.root 

包含模块的目录（绝对路径）。可以是数组。

```javascript
var path = require('path');
// ...
resolve: {
  root: [
    path.resolve('./app/modules'),
    path.resolve('./vendor/modules')
  ]
}
```

### resolve.modulesDirectories

指定查找模块的路径，可以是数组，默认`["web_modules", "node_modules"]`

### resolve.fallback

如果webpack没有找到模块（resolve.root和resolve.modulesDirectories），会到这里去找

### resolve.extensions

查找模块时自动加上扩展名，比如你要引用CoffeeScript的文件，就要加上 ".coffee"。默认 `["", ".webpack.js", ".web.js", ".js"]`

> 注意：修改这个选项，会覆盖默认配置。

### resolve.packageMains

在`package.json`文件中检查文件。默认 `["webpack", "browser", "web", "browserify", ["jam", "main"] , "main"]`

### resolve.packageAlias

### resolve.unsafeCache

## resolveLoader

和 `resolve` 相似但只针对 `loaders`，默认如下：

```javascript
{
    modulesDirectories: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    extensions: ["", ".webpack-loader.js", ".web-loader.js", ".loader.js", ".js"],
    packageMains: ["webpackLoader", "webLoader", "loader", "main"]
}
```

### resolveLoader.moduleTemplates

默认 `["*-webpack-loader", "*-web-loader", "*-loader", "*"]`

## externals

定义不需要被webpack处理的依赖，但会成为`bundle`的依赖。

```javascript
{
    output: { libraryTarget: "commonjs" },
    externals: [
        {
            a: false, // a is not external
            b: true, // b is external (require("b"))
            "./c": "c", // "./c" is external (require("c"))
            "./d": "var d" // "./d" is external (d)
        },
        // Every non-relative module is external
        // abc -> require("abc")
        /^[a-z\-0-9]+$/,
        function(context, request, callback) {
            // Every module prefixed with "global-" becomes external
            // "global-abc" -> abc
            if(/^global-/.test(request))
                return callback(null, "var " + request.substr(7));
            callback();
        },
        "./e" // "./e" is external (require("./e"))
    ]
}
```

## target

* "web" Compile for usage in a browser-like environment (default)
* "webworker" Compile as WebWorker
* "node" Compile for usage in a node.js-like environment (use require to load chunks)
* "async-node" Compile for usage in a node.js-like environment (use fs and vm to load chunks async)
* "node-webkit" Compile for usage in webkit, uses jsonp chunk loading but also supports * builtin node.js modules plus require(“nw.gui”) (experimental)
* "electron" Compile for usage in Electron – supports require-ing Electron-specific modules.

## bail

## profile

## cache

## watch

### watchOptions.aggregateTimeout

### watchOptions.poll

## debug

## devtool

## devServer

用来配置 `webpack-dev-server`的参数，具体参数可见`[webpack-dev-server](https://github.com/webpack/webpack-dev-server)`

## node

## amd

设置`require.amd`和`define.amd`的值。
比如： `amd: { jQuery: true }` （for old 1.x AMD versions of jquery）

## loader

### recordsPath, recordsInputPath, recordsOutputPath

## plugins