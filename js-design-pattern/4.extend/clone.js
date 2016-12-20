// 原型式继承
function clone(object) {
    function F() {}
    F.prototype = object
    return new F
}

// 父类
var Person = {
    name: 'default name',
    getName: function() {
        return this.name
    }
}

// 子类
var reader = clone(Person)
alert(reader.getName()) // default name
render.name = 'John Smith'
alert(reader.getName()) // John Smith

// 子类
var Author = clone(Person)
Author.books = []
Author.getBooks = function() {
    return this.books
}