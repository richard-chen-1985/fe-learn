webpack template
===

### 修改列表

#### 1. package.json

新建 `build/webpack.proxy.conf.js`
```javascript
process.argv.push('--proxy')
module.exports = require('./webpack.dev.conf.js');
```

`package.json` 新增 `scripts`
```json
{
  "scripts": {
    "proxy": "webpack-dev-server --inline --progress --config build/webpack.proxy.conf.js"
  }
}
```

#### 2. webpack.dev.conf.js

`devServer` 配置项可以接收一个 `after` 方法，用来做本地数据模拟

``` javascript
const proxy = process.argv.indexOf('--proxy') > 0;

const devWebpackConfig = {
  devServer: {
    proxy: proxy ? config.dev.proxyTable : {},
    after(app) {
      // 不是 proxy 时才启用本地模拟
      !proxy && require('../mock/server.js')(app);
    }
  }
}
```

本地模拟服务
```javascript
// /mock/config.js
module.exports = {
  '^/api/index': {
    local: '/mock/api/index.json',
    remote: '/api/index'
  },
  '^/api/list': {
    local: '/mock/api/list.json',
    remote: '/api/list'
  }
};


// /mock/server.js
const path = require('path');
const fs = require('fs');
const config = require('./config.js');

module.exports = (app) => {
  Object.keys(config).forEach(key => {
    let fileName = path.resolve('.' + config[key].local);
    app.use(key, (req, res, next) => {
      if (fileName.endsWith('.json')) {
        res.json(JSON.parse(fs.readFileSync(fileName)));
      } else {
        delete require.cache[fileName];
        require(fileName)(req, res, next);
      }
    });
  });
}
```

#### 3. webpack.prod.conf.js

`HtmlWebpackPlugin` 的配置不需要将 `removeAttributeQuotes` 开启

#### 4. config/index.js

* 静态资源的版本管理（需要考虑预发）

* proxyTable 的配置
```javascript
const proxyConfig = require('../mock/config.js');

let proxyTable = {};

Object.keys(proxyConfig).forEach((key) => {
  proxyTable[proxyConfig[key].remote] = {
    target: 'http://vip.m.jd.com',
    changeOrigin: true,
    headers: {
      referrer: 'http://vip.m.jd.com'
    }
  }
});

module.exports = {
  dev: {
    proxyTable: proxyTable
  }
}
```