# HTML Webpack Plugin

这个插件主要用来创建引用`webpack`生成的bundles文件。对于在生成的bundles文件名包含hash值时尤其有用。你还可以指定通过模板来生成`html`文件。

## Installation
```
npm install html-webpack-plugin --save-dev
```

## 使用
```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
    entry: 'index.js',
    output: {
        path: 'dist',
        filename: 'index_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()]
}
```

以上代码会生成包含以下内容的文件，并存放在`dist/index.html`：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

多个`entry`同样会以`script`标签的形式全部引入到生成的`html`文件。

如果在`webpack output`中有`css`文件（例如通过`ExtractTextPlugin`生成的），同样会在`head`标签内使用`<link>`标签引入。

## 配置

`HtmlWebpackPlugin`接受以下参数：
* `title`: 用于生成`html`文档的`title`
* filename: 生成`html`的文件名，默认是`index.html`，可以到子目录（如：`assets/admin.html`）
* template: `webpack`需要的模板文件。这里可以使用模板引擎进行编译，参考[模板文档](https://github.com/ampedandwired/html-webpack-plugin/blob/master/docs/template-option.md)
* `inject`: `true | 'head' | 'body' | false`，注入assets的位置，传`true`或者`body`所有的`javascript`引用都会插入到`body`标签中。传`head`时就会在`head`标签中插入`script`。
* `favicon`: 给 favicon 文件地址。
* `minify`: `{....} | false` 传 `[html-minifer](https://github.com/kangax/html-minifier#options-quick-reference)` 对象来压缩输入内容。
* `hash`: `true | false` 如果为`true`会给引入的文件（script or css）生成一个`hash`值，这个对清除缓存非常有用。
* `cache`: `true | false` 默认为`true`，只有当文件内容修改时才启用。
* `showErrors`: `true | false` 默认为`true`错误会被写入`html`内容中。
* `chunks: 允许加入某些`chunks`（例如：单元测试chunk）。
* `chunksSortMode`: 允许控制`chunks`的排序。`'none' | 'auto' | 'dependency' | {function} - default: 'auto'`。
* `excludeChunks`: 允许跳过某些`chunks`（例如：不加入单元测试`chunks`）。
* `xhtml`: `true | false` 默认为`false`，如果为`true`会以`xml`格式引入文件。

一个案例：
```javascript
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    })
  ]
}
```

## 生成多个 HTML 文件
```javascript
{
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      template: 'src/assets/test.html'
    })
  ]
}
```

## 写自己的模板
```javascript
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: 'my-index.ejs', // Load a custom template (ejs by default see the FAQ for details)
  })
]
```

`my-index.ejs`: 
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

这里有一个比较详细的例子[html-webpack-template project](https://github.com/jaketrent/html-webpack-template)。

* `htmlWebpackPlugin.files`: 
```javascript
"htmlWebpackPlugin": {
  "files": {
    "css": [ "main.css" ],
    "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
    "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      "main": {
        "entry": "assets/main_bundle.js",
        "css": []
      },
    }
  }
}
```

更多功能就看[文档](https://github.com/ampedandwired/html-webpack-plugin)了。