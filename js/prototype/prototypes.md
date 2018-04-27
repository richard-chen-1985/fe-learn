# prototypes

create an object

```js
var o1 = new Object() // { __proto__: Object }
var o2 = {} // { __proto__: Object }
```

Object.create

```js
// parameter is the prototype of o1
// parameter's __proto__ is Object
var o1 = Object.create({ x: 1, y: 2 })
console.log(o1)
// {
//   __proto__: {
//     x: 1,
//     y: 1,
//     __proto__: Object
//   }
// }
```

pass null to Object.create

```js
var o1 = Object.create(null)
console.log(o1)
// {} no properties
```

create a normal object

```js
var o1 = Object.create(Object.prototype)
// o1 is like {} or new Object()
// o1.__proto__.__proto__ is null
// means Object.prototype.__proto__ is null

// secondary param of Object.create
// like Object.defineProperties(o2, ...)
var o2 = Object.create({ x: 1, y: 1 }, {
  z: {
    value: 3
  }
})
console.log(o2)
// {
//   z: 3,
//   __proto__: {
//     x: 1,
//     y: 1,
//     __proto__: Object
//   }
// }
```

isPrototypeOf()

Determine whether on object is the protytype of or is part of the prototype chain of another object

```js
var p = { x: 1 }
var o = Object.create(p)
p.isPrototypeOf(o) // true
Object.prototype.isPrototypeOf(o) // true
```