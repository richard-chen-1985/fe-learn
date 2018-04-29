# functions

## Nested Functions

```js
function hypotenuse(a, b) {
  function square(x) { return x * x; }
  return Math.sqrt(square(a) + square(b));
}
```

## Invoke Functions

* as functions ("this" is global)
* as methods ("this" is object of method)
* as constructors ("this" is instance)
* indirectly through their call() and apply() methods ("this" is first parameter)

## Closures

```js
var scope = 'global scope'
function checkScope() {
  var scope = 'local scope'
  function f() { return scope }
  return f()
}
checkScope() // => 'local scope'

var scope = 'global scope'
function checkScope() {
  var scope = 'local scope'
  function f() {
    // a reference to scope, so won't be garbage collected
    return scope
  }
  // a reference to f(), so won't be garbage collected
  return f
}
checkScope()() // => 'local scope'
```

Javascript functions are executed using the scope chain that was in effect(in effect means valid) when they are defined.

The nested function `f()` was defined under a scope chain in which the variable `scope` was bound to the value "local scope".

That binding is still in effect(in effect means valid) when `f` is executed, whatever it is executed from.

## The prototype property

Every function has a `prototype` property that refers to an object known as the `prototype object`.

When a function is used as a constructor, the newly created object inherits the properties from the prototype object.

```js
function Range(from, to) {
  this.from = from
  this.to = to
}

Range.prototype = {
  constructor: Range,
  includes: function (x) { return this.from <= x && x <= this.to },
  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) {
      f(x)
    }
  },
  toString: function () { return "(" + this.from + "..." + this.to + ")" }
}

// 1. create a new object
// 2. constructor scope to the new object(this is point to the new object)
// 3. execute code in constructor(add property to the new object)
// 4. return the new object
var r = new Range(1, 3) // create a range object
r.includes(2) // true
r.foreach(console.log) // 1 2 3
console.log("" + r) // (1...3)
console.log(r)
// {
//   from: 1,
//   to: 3,
//   __proto__: { // point to Range.prototype
//     constructor: Range,
//     foreach: f(),
//     includes: f(),
//     toString: f(),
//     __proto__: Object
//   }
// }
```

prototype's property will be shield if the instance has a same name property

```js
function Person() {}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function () {
  alert(this.name)
}

var p1 = new Person()
var p2 = new Person()

p1.name = 'Greg'
alert(p1.name) // 'Greg' from instance
alert(p2.name) // 'Nicholas' from prototype

delete p1.name
alert(p1.name) // 'Nicholas' from prototype
```
