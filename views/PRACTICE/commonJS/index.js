const {perfectScore, sum, avg, subtract} = require('./math.js');

console.log('perfectScore', perfectScore);
console.log('sum', sum(80, 10));
console.log('avg', avg(80, 90));
console.log('subtract', subtract(80, 90));

/*
이렇게도 쓸 수 있다다
const math = require('./math.js');

console.log('perfectScore', math.perfectScore);
console.log('sum', math.sum(80, 10));
console.log('avg', math.avg(80, 90));
console.log('subtract', math.subtract(80, 90));
*/

const dayjs = require('dayjs')
console.log(dayjs('2019-01-25').format('yyyy.mm.dd'));