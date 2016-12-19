var obj = {
    arrStr: [],
    add: function(str) {
        this.arrStr.push(str);
    },
    getWord: function() {
        console.log(this.arrStr.join(''));
    }
};

'richard'.split('').forEach(str => {
    obj.add(str);
});

obj.getWord();