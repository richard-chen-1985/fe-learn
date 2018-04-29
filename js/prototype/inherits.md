# Inherits

## 组合继承

```js
function SuperType(name) {
  this.name = name
  this.colors = [ 'red', 'blue', 'green' ]
}

SuperType.prototype.sayName = function() {
  alert(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
// SubType.prototype 成了 SuperType 的实例
// 拥有了 SuperType 的属性
// 而其原型链有了 SuperType.prototype
console.log(SubType.prototype)
// {
//   name: undefined,
//   colors: [ 'red', 'blue', 'green' ],
//   __proto__: Object
// }
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function () {
  alert(this.age)
}

var ins1 = new SubType('Nicholas', 29)
ins1.colors.push('black')
alert(ins1.colors) // 'red', 'blue', 'green', 'black'
ins1.sayName() // Nicholas
ins1.sayAge() // 29

var ins2 = new SubType('Greg', 27)
alert(in2.colors) // red, blue, green
ins2.sayName() // Greg
ins2.sayAge() // 27
```

缺点：要调用两次 SuperType 的构造函数才能实现继承，SubType.prototype 上还有并不需要的属性

## 原型式继承

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

var person = {
  name: 'Nicholas',
  friends: [ 'Shelby', 'Court', 'Van' ]
}

var p1 = object(person)
p1.name = 'Greg'
p1.friends.push('Rob')
console.log(p1)
// {
//   name: 'Greg',
//   __proto__: {
//     name: 'Nicholas',
//     friends: [ 'Shelby', 'Court', 'Van', 'Rob' ],
//     __proto__: Object
//   }
// }

var p2 = object(person)
p2.name = 'Linda'
p2.friends.push('Barbie')
console.log(p2)
// {
//   name: 'Linda',
//   __proto__: {
//     name: 'Nicholas',
//     friends: [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ],
//     __proto__: Object
//   }
// }
console.log(p1)
// {
//   name: 'Greg',
//   __proto__: {
//     name: 'Nicholas',
//     friends: [ 'Shelby', 'Court', 'Van', 'Rob', 'Barbie' ],
//     __proto__: Object
//   }
// }

alert(person.friends) // Shelby,Court,Van,Rob,Barbie
```

use Object.create replace of object() method

```js
var person = {
  name: 'Nicholas',
  friends: [ 'Shelby', 'Court', 'Van' ]
}

var p1 = Object.create(person, {
  name: {
    value: 'Greg'
  }
})
p1.friends.push('Rob')

var p2 = Object.create(person, {
  name: {
    value: 'Linda'
  }
})
p2.friends.push('Barbie')
```

缺点：如果子类不主动屏蔽同名属性，则会共享原型对象的属性

## 寄生组合式继承

```js
function inheritPrototype(subType, superType) {
  var prototype = Object(superType.prototype)
  prototype.constructor = subType
  console.log(prototype)
  subType.prototype = prototype
}

function SuperType(name) {
  this.name = name
  this.colors = [ 'red', 'blue', 'green' ]
}

SuperType.prototype.sayName = function () {
  alert(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)
// 也可以使用 SubType.prototype = Object.create(SuperType.prototype)
// 同样需要修复 constructor
// SubType.prototype.constructor = SubType

SubType.prototype.sayAge = function () {
  alert(this.age)
}

var s1 = new SubType('richard', 30)
s1.sayName()
s1.sayAge()
```

只调用一次 SuperType 构造函数，也没有多余的属性，比较理想的继承方式
