# closure 闭包

闭包是指有权访问另一个函数作用域中的变量的函数。

```js
function createComparisionFunction(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName]
    var value2 = object2[propertyName]

    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}

// 创建函数
// compare 对返回的匿名函数有引用，其所在的作用域对象不会被标记清除
var compare = createComparisionFunction('name')

// 调用函数
// 创建自身的作用域对象，并且作用域链上有 createComparisionFunction 的作用域对象
// 所以可以访问到 name
var result = compare({ name: 'Nicholas' }, { name: 'Greg' })
console.log(result) // 1

// 解除对匿名函数的引用
// 作用域对象被标记清除，以释放内存
compare = null
```