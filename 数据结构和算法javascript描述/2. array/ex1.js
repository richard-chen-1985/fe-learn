"use strict";
// var studentRecord = {
//     records: [],
//     add: function(record) {
//         this.records.push(record);
//     },
//     average: function() {
//         var sum = function(subTotal, currentValue) {
//             return subTotal + currentValue;
//         }
//         return this.records.reduce(sum) / this.records.length;
//     }
// };

// studentRecord.add(77);
// studentRecord.add(88);
// studentRecord.add(99);
// console.log(studentRecord.average());

class Student {
    constructor(name, num1, num2, num3) {
        this.name = name;
        this.records = [num1, num2, num3];
    }    
}

class Records {
    constructor() {
        this.students = [];
    }

    addStudent(student) {
        this.students.push(student);
    }

    calcAverage() {
        this.students.forEach(student => {
            let total = 0;
            let average = 0.0;
            total = student.records.reduce(this.sum);
            average = total / student.records.length;
            console.log('Student ' + student.name + ': average ' + average.toFixed(2));
        });
    }

    sum(subTotal, currentValue) {
        return subTotal + currentValue;
    }
}

var record = new Records();
record.addStudent(new Student("richard", 88, 77, 99));
record.addStudent(new Student("lynda", 82, 66, 85));
record.addStudent(new Student("bob", 85, 72, 55));
record.calcAverage();