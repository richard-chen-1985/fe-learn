# webpack dev middleware

可以在其它框架下使用类似webpack-dev-server功能的中间件

## API

```javascript
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");

var compiler = webpack({
    // configuration
    output: { path: '/' }
});

app.use(webpackDevMiddleware(compiler, {
    // options
}));
```

## options

### options.noinfo

info级别的日志不输出（只输出warnings 和 errors）

### options.quiet

任何级别的日志都不输出

### options.lazy

lazy 模式开关

### options.filename

在lazy模式中，开启请求会触发编译，大多数情况下这个设置和webpack的`output.filename`相同

### options.watchOptions.aggregateTimeout

修改后重新编译的延时，单位ms

### options.watchOptions.poll

是否启用轮询，默认`undefined`

### options.publicPath（必须）

绑定`middleware`到`server`的哪个路径，一般情况下与`output.publicPath`相同即可

### options.header

添加自定义header（i.e. `{ "X-Custom-Header": "yes" }）

### options.stats

output选择的stats定义，参考 [node.js API](http://webpack.github.io/docs/node.js-api.html)。

### options.middleware.invalidate()

手动停用编译

### options.middleware.fileSystem

可读的文件系统用于访问编译后的文件（内存缓存）