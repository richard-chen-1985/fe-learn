# webpack内置插件说明

## config

### config.NormalModuleReplacementPlugin

```
new webpack.NormalModuleReplacementPlugin(resourceRegExp, new Resource)
```

替换匹配`resourceRegExp`的资源用`newResource`替换。

### config.ContextReplacementPlugin

```
new webpack.ContextReplacementPlugin(
    resourceRegExp,
    [newContentResource],
    [newContentRecursive],
    [newContentRegExp]
)
```

### config.IgnorePlugin

```
new webpack.IgnorePlugin(resourceRegExp, [contextRegExp])
```

不执行匹配的模块

### config.PrefetchPlugin

```
new webpack.PrefetchPlugin([context], request)
```

### config.resolverPlugin

### config.resolverPlugin.FileAppendPlugin

## output

### output.BannerPlugin

```
new webpack.BannerPlugin(banner, options)
```

向每个`chunk`添加`banner`：
* `banner` 被注释包裹的字符串
* `options.raw` 如果为`true`，`banner`不会被注释包裹
* `options.entryOnly` 如果为`true`，`banner`只会被添加到入口`chunk`

```
new webpack.BannerPlugin('for banner test')
```

某个输出后的模块：

```
/*! for banner test */
module.exports = {}
```

## optimize

### optimize.DedupePlugin

查找相同或者相似的文件并且删除重复的内容，可以减小文件大小。但不会更改模块的逻辑，所以不要期望它能解决多模块重复实例化问题。

```
new webpack.optimize.DedupePlugin()
```

### optimize.LimitChunkCountPlugin

限制`chunk`为指定的数量。如果`chunks`数量达到指定值，就会被合并。
* `options.maxChunks` `chunks`的最大数量
* `options.chunkOverhead` 每个`chunk`的字节大小（默认为10000）
* `options.entryChunkMultiplicator` 入口`chunks`的乘数（默认为10）

### optimize.MinChunkSizePlugin

合并比指定值小的`chunks`，大小的值是个近似值。

```
new webpack.optimize.MinChunkSizePlugin(options)
```

### optimize.OccurrenceOrderPlugin

给模块和`chunk`分配一个ID。`preferEntry`（boolean）给入口`chunk`更高的权重。

```
new webpack.optimize.OccurrenceOrderPlugin(preferEntry)
```

### optimize.UglifyJsPlugin

压缩所有的输出`javascript chunks`。`loaders`调整到`minimizing`模式。参数参考`[UglifyJS options](https://github.com/mishoo/UglifyJS2#usage)`

```
new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    sourceMap: false,
    mangle: {
        except: ['$super', '$', 'exports', 'require']
    }
})
```

### optimize.ngAnnotatePlugin

### optimize.CommonsChunkPlugin

* `options.name` 或者 `options.names`（`string | string[]`）: The chunk name of the commons chunk。
* `options.filename` 输出块的名称模板
* `options.minChunks` （`number|Infinity|function(module,count) -> boolean），数字参数必须大于等于2并且小于等于`chunks`的数量。
* `options.chunks`
* `options.children` （`boolean`）为`true`将选择子`chunk`
* `options.async` （`boolean`）
* `options.minSize` （`number`）

例子：

1. Commons chunk for entries

```javascript
new CommonsChunkPlugin({
  name: "commons",
  // (the commons chunk name)
  filename: "commons.js",
  // (the filename of the commons chunk)
  // minChunks: 3,
  // (Modules must be shared between 3 entries)
  // chunks: ["pageA", "pageB"],
  // (Only use these entries)
})
```

你必须这样引入资源：

```html
<script src="commons.js" charset="utf-8"></script>
<script src="entry.bundle.js" charset="utf-8"></script>
```

2. Explicit vendor chunk

将代码拆分为 vendor 和 application

```javascript
entry: {
  vendor: ["jquery", "other-lib"],
  app: "./entry"
}
new CommonsChunkPlugin({
  name: "vendor",
  // filename: "vendor.js"
  // (Give the chunk a different name)
  minChunks: Infinity,
  // (with more entries, this ensures that no other module
  //  goes into the vendor chunk)
})
```

```html
<script src="vendor.js" charset="utf-8"></script>
<script src="app.js" charset="utf-8"></script>
```

可以使用[chunk-manifest-webpack-plugin](https://github.com/diurnalist/chunk-manifest-webpack-plugin)生成一个manifest文件来避免长缓存下文件修改的问题。还需要记录模块ID。

3. Move common modules into the parent chunk

在代码拆分时某个`chunk`的子`chunk`依赖相同模块，可以打包到父模块当中。

```javascript
new CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (choose the chunks, or omit for all chunks)
  children: true,
  // (select all children of chosen chunks)
  // minChunks: 3,
  // (3 children must share the module before it's moved)
})
```

4. Extra async commons chunk

和第3点相似，但作用于异步依赖

```javascript
new CommonsChunkPlugin({
  // names: ["app", "subPageA"]
  // (choose the chunks, or omit for all chunks)
  children: true,
  // (use all children of the chunk)
  async: true,
  // (create an async commons chunk)
  // minChunks: 3,
  // (3 children must share the module before it's separated)
})
```

### optimize.AggressiveMergingPlugin

提供更多的合并策略
* `options.minSizeReduce`
* `options.moveToParents`
* `options.entryChunkMultiplicator`

### optimize.DllPlugin

```javascript
new DllPlugin({
  path: path.join(__dirname, "manifest.json"),
  name: "[name]_[hash]",
  context: __dirname
})
```

### optimize.DllReferencePlugin

```javascript
new DllReferencePlugin({
  context: __dirname,
  scope: "xyz",
  manifest: require("./manifest.json"),
  name: "./my-dll.js",
  sourceType: "commonsjs2",
  content: { ... }
})
```

### optimize.AppCachePlugin

生成`HTML5`的application cache manifest

### optimize.OfflinePlugin

让你的项目支持离线。

## module styles

### dependencies.LabelModulesPlugin

### ComponentPlugin

### AngularPlugin

## dependency injection

依赖注入

### DefinePlugin

声明自由变量。在开发环境下输出日志或者增加全局变量时非常有用。

```javascript
new webpack.DefinePlugin({
    VERSION: JSON.stringify("5fa3b9"),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: "1+1",
    "typeof window": JSON.stringify("object")
})
```

```javascript
console.log("Running App version " + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require("html5shiv");
```

### ProvidePlugin

自动加载模块。当模块标识（key）被当作自由变量被使用时，模块就被加载，标识会被添加到被加载的模块的`exports`上。

```javascript
new webpack.ProvidePlugin({
    $: "jquery"
})
```

```javascript
// in a module
$("#item") // <= just works
// $ is automatically set to the exports of module "jquery"
```

### RewirePlugin

在webpack中使用`[rewire](https://github.com/jhnns/rewire)`

### NgRequirePlugin

自动`require` AngularJS的模块而不需要明确地使用`require`语句。

```javascript
{
  plugins: [
    new ngRequirePlugin(['file path list for your angular modules. eg: src/**/*.js'])
  ]
}
```

## localization

### I18nPlugin

```javascript
new I18nPlugin(translations: Object, fnName = "__": String)
```

创建有翻译的`bundles`，方便提供翻译给使用者。

## debugging

### SourceMapDevToolPlugin

```javascript
new webpack.SourceMapDevToolPlugin({
  // asset matching
  test: string | RegExp | Array,
  include: string | RegExp | Array,
  exclude: string | RegExp | Array,

  // file and reference
  filename: string,
  append: false | string,

  // sources naming
  moduleFilenameTemplate: string,
  fallbackModuleFilenameTemplate: string,

  // quality/performance
  module: bool,
  columns: bool,
  lineToLine: bool | object
})
```

添加`sourcemap`。

## other

### HotModuleReplacementPlugin

启动热替换。

```javascript
new webpack.HotModuleReplacementPlugin()
```

### ExtendedAPIPlugin

向`bundle`添加有用的变量

```javascript
new webpack.ExtendedAPIPlugin()
```

### NoErrorsPlugin

有错误时跳过

```javascript
new webpack.NoErrorsPlugin()
```

### ProgressPlugin

```javascript
new webpack.ProgressPlugin(function handler(percentage, msg) {/* ... */})
```

编译进度`hook`

### WatchIgnorePlugin

```javascript
new webpack.WatchIgnorePlugin(paths)
```

不监视指定的目录
* `paths` （array）正则数组或者绝对路径或者文件

### S3Plugin

```javascript
new S3Plugin({
  exclude: RegExp,
  s3Options: {
    accessKeyId: string,
    secretAccessKey: string,
    region: string
  },
  s3UploadOptions: {
    Bucket: string
  },
  cdnizerOptions: {
    defaultCDNBase: string
  }
})
```