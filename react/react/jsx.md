# jsx 语法学习

JSX 让你可以用 HTML 语法去写 JavaScript 函数调用。 为了在 React 生成一个链接，通过纯 JavaScript 你可以这么写：

```jsx
React.createElement('a', {
  href:'http://facebook.github.io/react/'
}, 'Hello React!')
```

使用jsx就变成了这样：

```jsx
<a href="http://facebook.github.io/react/">Hello React!</a>
```

## HTML标签与React组件对比

React 可以渲染 HTML 标签 (strings) 或 React 组件 (classes)。

要渲染 HTML 标签，只需在 JSX 里使用小写字母开头的标签名。

```jsx
var myDivElement = <div className="foo" />;
React.render(myDivElement, document.body);
```

要渲染 React 组件，只需创建一个大写字母开头的本地变量。

```jsx
var MyComponent = React.createClass({/*...*/});
var myElement = <Mycomponent someProperty={true} />;
React.render(myElement, document.body);
```

React 的 JSX 里约定分别使用首字母大、小写来区分本地组件的类和 HTML 标签。

> 注意:

>由于 JSX 就是 JavaScript，一些标识符像 class 和 for 不建议作为 XML 属性名。作为替代，React DOM 使用 className 和 htmlFor 来做对应的属性。

## 转换

JSX 把类 XML 的语法转成纯粹 JavaScript，XML 元素、属性和子节点被转换成 React.createElement 的参数。

```jsx
var Nav;
// 输入 (JSX)
var app = <Nav color="blue" />;
// 输出 (JS)
var app = React.createElement(Nav, {color:"blue"});
```

注意，要想使用 <Nav />，Nav 变量一定要在作用区间内。

JSX 也支持使用 XML 语法定义子结点：

```jsx
var Nav, Profile;
// 输入 (JSX)
var app = <Nav color="blue"><Profile>click</Profile></Nav>;
// 输出 (JS)
var app = React.createElement(
  Nav,
  {color:"blue"},
  React.createElement(Profile, null, "click")
);
```

使用 JSX 编译器 来试用 JSX 并理解它是如何转换到原生 JavaScript，还有 HTML 到 JSX 转换器 来把现有 HTML 转成 JSX。

如果你要使用 JSX，这篇 新手入门 教程来教你如何搭建环境。

> 注意：

> JSX 表达式总是会当作 ReactElement 执行。具体的实际细节可能不同。一种优化 的模式是把 ReactElement 当作一个行内的对象字面量形式来绕过 React.createElement 里的校验代码。

## JavaScript 表达式

### 属性表达式

要使用 JavaScript 表达式作为属性值，只需把这个表达式用一对大括号 ({}) 包起来，不要用引号 ("")。

```jsx
// 输入 (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// 输出 (JS):
var person = React.createElement(
  Person,
  {name: window.isLoggedIn ? window.name : ''}
);
```

### 子节点表达式

同样地，JavaScript 表达式可用于描述子结点：

```jsx
// 输入 (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// 输出 (JS):
var content = React.createElement(
  Container,
  null,
  window.isLoggedIn ? React.createElement(Nav) : React.createElement(Login)
);
```

### 注释

JSX 里添加注释很容易；它们只是 JS 表达式而已。你只需要在一个标签的子节点内(非最外层)小心地用 {} 包围要注释的部分。

```jsx
var content = (
  <Nav>
    {/* 一般注释, 用 {} 包围 */}
    <Person
      /* 多
         行
         注释 */
      name={window.isLoggedIn ? window.name : ''} // 行尾注释
    />
  </Nav>
);
```

> 注意:

> JSX 类似于 HTML，但不完全一样。参考 JSX 陷阱 了解主要不同。

## JSX的延展属性

如果你事先知道组件需要的全部 Props（属性），JSX 很容易地这样写：

```jsx
var component = <Component foo={x} bar={y} />;
```

### 修改 Props 是不好的，明白吗

如果你不知道要设置哪些 Props，那么现在最好不要设置它：

```jsx
var component = <Component />;
component.props.foo = x; // 不好
component.props.bar = y; // 同样不好
```

这样是反模式，因为 React 不能帮你检查属性类型（propTypes）。这样即使你的 属性类型有错误也不能得到清晰的错误提示。

Props 应该被当作禁止修改的。修改 props 对象可能会导致预料之外的结果，所以最好不要去修改 props 对象。

### 延展属性（Spread Attributes）

现在你可以使用 JSX 的新特性 - 延展属性：

```jsx
var props = {};
props.foo = x;
props.bar = y;
var component = <Component {...props} />;
```

传入对象的属性会被复制到组件内。

它能被多次使用，也可以和其它属性一起用。注意顺序很重要，后面的会覆盖掉前面的。

```jsx
var props = { foo: 'default' };
var component = <Component {...props} foo={'override'} />;
console.log(component.props.foo); // 'override'
```

## JSX 的陷阱

JSX 与 HTML 非常相似，但是有些关键区别要注意。

* React 为了性能和跨浏览器的原因，实现了一个独立于浏览器的事件和 DOM 系统。利用此功能，可以屏蔽掉一些浏览器的 DOM 的粗糙实现。

* 所有 DOM 的 properties 和 attributes （包括事件处理器）应该都是驼峰命名的，以便和标准的 JavaScript 风格保持一致。我们故意和规范不同，因为规范本身就不一致。然而，data-* 和 aria-* 属性符合规范，应该仅是小写的。

* style 属性接收一个带有驼峰命名风格的 JavaScript 对象，而不是一个 CSS 字符串。这与 DOM 中的 style 的 JavaScript 属性保持一致，更加有效，并且弥补了 XSS 安全漏洞。

* 所有的事件对象和 W3C 规范保持一致，并且所有的事件（包括提交事件）冒泡都正确地遵循 W3C 规范。参考事件系统获取更多详细信息。

* onChange 事件表现得和你想要的一样：当表单字段改变了，该事件就被触发，而不是等到失去焦点的时候。我们故意和现有的浏览器表现得不一致，是因为 onChange 是它的行为的一个错误称呼，并且 React 依赖于此事件来实时地响应用户输入。参考表单获取更多详细信息。

* 表单输入属性，例如 value 和 checked，以及 textarea。这里有更多相关信息。

### HTML实体

HTML 实体可以插入到 JSX 的文本中。

```jsx
<div>First &middot; Second</div>
```

如果想在 JSX 表达式中显示 HTML 实体，可以会遇到二次转义的问题，因为 React 默认会转义所有字符串，为了防止各种 XSS 攻击。

```jsx
// 错误：会显示“First &middot; Second”
<div>{'First &middot; Second'}</div>
```

有多种绕过的方法。最简单的是直接用 Unicode 字符。这时要确保文件是 UTF-8 编码且网页也指定为 UTF-8 编码。

```jsx
<div>{'First · Second'}</div>
```

安全的做法是先找到 实体的 Unicode 编号 ，然后在 JavaScript 字符串里使用。

```jsx
<div>{'First \u00b7 Second'}</div>
<div>{'First ' + String.fromCharCode(183) + ' Second'}</div>
```

可以在数组里混合使用字符串和 JSX 元素。

```jsx
<div>{['First', <span>&middot;</span>, 'Second']}</div>
```

万不得已，可以直接使用原始 HTML。

```jsx
<div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />
```

### 自定义 HTML 属性

如果往原生 HTML 元素里传入 HTML 规范里不存在的属性，React 不会显示它们。如果需要使用自定义属性，要加 data- 前缀。

```jsx
<div data-custom-attribute="foo" />
```

然而，自定义元素（那些标签名里面有连字符或者有 is="..." 属性）支持任意属性。

```jsx
<x-my-component custom-attribute="foo" />
```

以 aria- 开头的 [网络无障碍] 属性可以正常使用。

```jsx
<div aria-hidden={true} />
```

## 特殊的非 DOM 属性

除了与 DOM 的差异之外，React 也提供了一些 DOM 里面不存在的属性。

* `key` : 可选的唯一的标识器。当组件在渲染过程中被各种打乱的时候，由于差异检测逻辑，可能会被销毁后重新创建。给组件绑定一个 key，可以持续确保组件还存在 DOM 中。更多内容请参考[这里](http://reactjs.cn/react/docs/multiple-components.html#dynamic-children)。

* `ref` : 参考[这里](http://reactjs.cn/react/docs/more-about-refs.html)

* `dangerouslySetInnerHTML` ：提供插入纯 HTML 字符串的功能，主要为了能和生成 DOM 字符串的库整合。更多内容请参考[这里](http://reactjs.cn/react/tips/dangerously-set-inner-html.html)。

## JSX 中的 If-Else

你没法在JSX中使用 if-else 语句，因为 JSX 只是函数调用和对象创建的语法糖。看下面这个例子：

```jsx
// JSX 代码:
React.render(<div id="msg">Hello World!</div>, mountNode);

// 编译成 JS 是这样的:
React.render(React.createElement("div", {id:"msg"}, "Hello World!"), mountNode);
```

这意味着 if 语句不合适。看下面这个栗子

```jsx
// This JSX:
<div id={if (condition) { 'msg' }}>Hello World!</div>

// Is transformed to this JS:
React.createElement("div", {id: if (condition) { 'msg' }}, "Hello World!");
```

这是不合语法的 JS 代码。不过你可以采用三元操作表达式：

```
React.render(<div id={condition ? 'msg' : ''}>Hello World!</div>, mountNode);
```

当三元操作表达式不够健壮，你也可以使用 if 语句来决定应该渲染那个组件。

```jsx
var loginButton;
if (loggedIn) {
  loginButton = <LogoutButton />;
} else {
  loginButton = <LoginButton />;
}

return (
  <nav>
    <Home />
    {loginButton}
  </nav>
)
```





