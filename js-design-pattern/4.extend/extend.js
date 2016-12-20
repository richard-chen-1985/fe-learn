// 类式继承
function extend(subClass, superClass) {
    var F = function() {}
    F.prototype = superClass.prototype
    subClass.prototype = new F()
    subClass.prototype.constructor = subClass

    subClass.superClass = superClass.prototype
    if(superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass
    }
}

// 父类
function Person(name) {
    this.name = name
}
Person.prototype.getName = function() {
    return this.name
}

// 子类
function Author(name, books) {
    Author.superClass.constructor.call(this, name)
    this.books = books
}
extend(Author, Person)
Author.prototype.getBooks = function() {
    return this.books
}

// 重写父类方法
Author.prototype.getName = function() {
    var name = Author.superClass.getName.call(this)
    return name + ', Author of ' + this.getBooks().join(', ')
}