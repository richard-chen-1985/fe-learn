# webpack dev server

基于express的一个server，使用`webpack-dev-middleware`来服务webpack的输出打包。还内置了一个`Socket.IO`服务用来监测文件改变时自动刷新浏览器。

```
npm install webpack-dev-server
```

```javascript
// webpack.config.js
var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    // 这个是webpack-dev-server提供资源的路径
    // 注意和output.path可能不一样，html引入要以publichPath为准
    publicPath: "/assets/",
    filename: "bundle.js"
  }
};
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="assets/bundle.js"></script>
</body>
</html>
```

## 参数

参数可以在`webpack.config.js`中的`devServer`节点配置，也可以直接在命令行中给出。

### Content Base

webpack-dev-server 服务器资源文件的根目录，一般不需要配置。

### Automatic Refresh

支持模块文件修改保存后自动刷新浏览器，有两种模式：`iframe`和`inline`：

* `Iframe`：预览的html文件被包裹在父页面的`iframe`当中，有修改时刷新这个`iframe`。
* `Inline`：通过在页面输出文件`output bundle`中注入一段代码来监测更新

#### Iframe mode

使用这种模式，你需要在浏览器中访问`http://<host>:<port>/webpack-dev-server/<path>`。
* 默认使用这种方式，不需要额外配置
* 在页面顶部会有一个信息提示栏，显示当前状态
* 但有个缺点：如果你访问了应用的其它url，不会在浏览器地址栏中体现

#### Inline mode

要设置额外参数`--inline`来开启。访问地址是`http://<host>:<port>/<path>`。

* 需要额外参数开启
* 状态信息只能在`console.log`中看到
* 访问应用其它url时会体现在浏览器的状态栏中

#### Inline mode with node.js API

因为webpack-dev-server模块没有权限访问webpack的配置文件，所以不能在`webpack.config.js`中使用类似`devServer: { inline: true }`开启。而是在入口点`entry`增加访问地址：
```javascript
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {...});
server.listen(8080);
```

#### Inline mode in HTML

也可以选择通过`script`标签直接在HTML文件中引入

```html
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

> 提示：个人比较喜欢使用 inline mode

### Hot Module Replacement

开启热替换功能需要加参数`--hot`，在webpack配置文件中加上`HotModuleReplacementPlugin`。

开启后，webpack-dev-server会自动添加`webpack/hot/dev-server`入口点到配置文件

查看浏览器`log`发现以下输出表示开启：
```
// [HMR]信息来自webpack/hot/dev-server
[HMR] Waiting for update signal from WDS...
// [WDS]信息来自webpack-dev-server
[WDS] Hot Module Replacement enabled.
```

#### Hot Module Replacement with node.js API

```javascript
var config = require("./webpack.config.js");
config.entry.app.unshift(
    "webpack-dev-server/client?http://localhost:8080/",
     "webpack/hot/dev-server"
);
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
  hot: true
  ...
});
server.listen(8080);
```

其它功能见[官方文档](http://webpack.github.io/docs/webpack-dev-server.html)吧，有需要再增加。