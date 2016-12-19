"use strict";

class WeekTemps {
    constructor(dayTemps) {
        this.dayTemps = dayTemps;
    }

    average() {
        return averageArr(this.dayTemps);
    }
}

class MonthTemps {
    constructor() {
        this.weeks = [];
    }

    addWeek(week) {
        this.weeks.push(week);
    }

    averageMonth() {
        return averageArr(this.averageWeek());
    }

    averageWeek(iWeek) {
        let result;
        if((typeof iWeek !== 'undefined') && this.weeks.length > iWeek) {
            result = this.weeks[iWeek].average();
        } else {
            result = [];
            this.weeks.forEach(week => {
                result.push(week.average());
            });
        }
        return result;
    }
}

function averageArr(arr) {
    var total = arr.reduce((subTotal, currentValue) => {
        return subTotal + currentValue;
    });

    return Math.round(total / arr.length);
}

let monthTemps = new MonthTemps();
for(let i = 0; i < 4; i++) {
    let dayTemps = [];
    for(let j = 0; j < 7; j++) {
        dayTemps.push(parseInt(Math.random() * 10 + 50));
    }
    monthTemps.addWeek(new WeekTemps(dayTemps));
}

console.log('Average of 1st week: ' + monthTemps.averageWeek(0));
console.log('Average of each week: ' + monthTemps.averageWeek());
console.log('Average of this month: ' + monthTemps.averageMonth());