// 柯里化是把接受多个参数的函数
// 变换成接受一个单一参数（最初函数的第一个参数）的函数，
// 并且返回接受余下的参数而且返回结果的新函数的技术
// 作用：
// 1. 参数复用；2. 提前返回；3. 延迟计算/运行。
function curry(fn) {
    // 存储函数真正的参数
    var args = Array.prototype.slice.call(arguments, 1);
    // 返回一个匿名函数，可以再次接收参数
    return function() {
        // 匿名函数的参数
        var innerArgs = Array.prototype.slice.call(arguments);
        // 将所有参数进行合并
        var finalArgs = args.concat(innerArgs);
        // 执行fn，并传入所有参数，返回结果
        return fn.apply(this, finalArgs);
    }
}

// 需要3个参数的函数
function add(num1, num2, num3) {
    return num1 + num2 + num3;
}

// curry只接收一个参数，其余参数在后面传入
// 也可以是curry(add, 50)(1, 2) 或者 curry(add, 50, 1)(2)等
var t = curry(add)(50, 1, 2);
alert(t);

// 以下作用摘自张鑫旭博客(http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)

// 作用2:
// 提前返回
var addEvent = (function(){
    if (window.addEventListener) {
        // 在IE8+及非IE中
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        // 在IE6/7中
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();

// 作用3
// 延迟计算
var curryWeight = function(fn) {
    var _fishWeight = [];
    return function() {
        if (arguments.length === 0) {
            return fn.apply(null, _fishWeight);
        } else {
            _fishWeight = _fishWeight.concat([].slice.call(arguments));
        }
    }
};
var fishWeight = 0;
var addWeight = curryWeight(function() {
    var i=0; len = arguments.length;
    for (i; i<len; i+=1) {
        fishWeight += arguments[i];
    }
});

addWeight(2.3);
addWeight(6.5);
addWeight(1.2);
addWeight(2.5);
addWeight();    //  这里才计算

console.log(fishWeight);    // 12.5
