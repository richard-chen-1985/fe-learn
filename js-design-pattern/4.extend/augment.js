// 掺元类
function augment(receivingClass, givingClass) {
    if(arguments[2]) { // Only give certain methods
        for(var i = 2, len = arguments.length; i < len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]
        }
    } else { // Give all methods
        for(methodName in givingClass.prototype) {
            if(!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName]
            }
        }
    }
}

// 创建掺元类
var Mixin = function() {}
Mixin.prototype = {
    serialize: function() {
        var output = []
        for(key in this) {
            output.push(key + ': ' + this[key])
        }
        return output.join(', ')
    }
}

// 正常类
var Author = function(name, books) {
    this.name = name
    this.books = books
}
augment(Author, Mixin)
console.log(Author.serialize())