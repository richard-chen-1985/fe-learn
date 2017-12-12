webpack template
===

### 修改列表

* webpack.dev.conf.js

`devServer` 配置项可以接收一个 `after` 方法，用来做本地数据模拟

```
devServer: {
  after(app) {
    require('../mock/server.js')(app);
  }
}
```

```
// /mock/server.js
module.exports = function (app) {
  app.use('/api/xxx', function (req, res) {
    // 做本地数据模拟
  });
}
```

* webpack.prod.conf.js

`HtmlWebpackPlugin` 的配置不需要将 `removeAttributeQuotes` 开启

* config/index.js

  - 静态资源的版本管理
  - proxyTable 的配置