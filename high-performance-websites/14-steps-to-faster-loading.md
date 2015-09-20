## 减少http请求
- 使用csssprite
- 内联图片：data: base64
  - 不能像文件一个缓存，所以最好放在css文件中
  - IE7以下不支持
  - Base64编码会增加图片大小，一般用于小图片
- 合并脚本和样式表
  - 从网站全局考虑，提高网站的整体缓存命中率
  
## 使用CDN
- 浏览器对同一域名的下载线程限制
- 让服务器离用户更近，下载更快速

## 添加Expires头
- 浏览器使用缓存来减少HTTP请求数量，并减小HTTP响应大小
- Max-Age和mod_expires
  - max-age指定组件缓存多久，避免额外的HTTP请求
  - mod_expires Apache模块使Expires头能够像max-age一样设置相对日期
- 修订文件名：防止缓存时间内，文件更新浏览器不能同步

## 压缩组件
- 启用GZIP压缩

## 将样式表放在顶部
- 浏览器对HTML内容从上到下解释，逐步呈现内容，样式表放在底部，在某些浏览器下会导致白屏现象
  - 在新窗口中打开时
  - 重新加载时
  - 作为主页
- 将CSS放在顶部，外部CSS文件引入方式有两种，link和@import
  - 尽量使用link方式引用CSS文件
  - @import引入CSS文件，某些浏览器会延迟加载文件，同样产生白屏
- 无样式内容的闪烁
  - 如果浏览器在构建呈现树时，样式表仍在加载，会触发浏览器的重绘，导致内容闪烁
  
## 将脚本放在底部
- 脚本放在顶部
  - 脚本会阻塞对其后面内容的呈现
  - 脚本会阻塞对其后面组件的下载
- 脚本放在底部
- 必要时使用延迟脚本，给script标签加defer属性，比如脚本使用document.write向页面中插入内容时

## 避免CSS表达式
- IE特有属性，在页面滚动、鼠标移过，改变大小等事件时都会触发，影响性能
- 一次性表达式，在一次执行过后重写它自身，达到阻止重复执行的目的
- 只在事件响应时设置表达式，结合一次性表达式
```js
function setMinWidth() {
  setCntr();
  var aElments = document.getElementsByTagName("p");
  for(var i = 0; i < aElments.length; i++) {
    aElments[i].runtimeStyle.width = (document.body.clientWidth<600? "600px" : "auto");
  }
}
if(1 != navigator.userAgent.indexOf("MSIE")) {
  window.onresize = setMinWidth;
}
```

## 使用外部javascript和CSS
- 内联虽然更快速，但是不能命中缓存，不适合组件重用
- 主页要求性能，可以用内联，在页面加载后下载外联文件，达到命中缓存的目的
  - 由于使用面分比或者em单位的CSS如果指定两次可能会产生问题，所以用iframe来下载外联文件
  - 使用cookie判断外联文件是否在缓存中，如果cookie存在，则可能存在缓存，如不存在，则使用内联，并加载后下载外联文件
  
## 减少DNS查找
- 服务器支持Keep-Alive
- 将页面组件分别放在最少2个，但不要超过4个主机名下

## 精简javascript
- 压缩与混淆
- 内联脚本
- 精简CSS
  - 合并相同类、移除不使用的类
  - 使用缩写比如（用“#606”代替“#660066”）和移除不必要的字符（用“0”代替“0px”）
  
## 避免重定向
- WEB服务器返回重定向时，会有一个3xx的状态码，表示用户需要再执行一次请求
- 缺少结尾的斜线的URL重定向，导致无用重定向

## 移除重复脚本
- 确保脚本只被包含一次

## 配置ETag
- 多实例网站和服务器集群，需要考虑ETag同步问题

## 使用AJAX可缓存
