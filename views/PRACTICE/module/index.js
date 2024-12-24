import {perfectScore, sum, avg} from './math.js';
import subtract2 from './math.js';

console.log('perfectScore', perfectScore);
console.log('sum', sum(80, 10));
console.log('avg', avg(80, 90));
console.log('subtract', subtract2(80, 90));

/*
이렇게도 쓸 수 있음
import * as math from './math.js';
console.log('perfectScore', math.perfectScore);
console.log('sum', math.sum(80, 10));
console.log('avg', math.avg(80, 90));
*/

/*
default로로 export 했을 때 이렇게도 쓸 수 있음
import math from './math.js';
console.log('perfectScore', math.perfectScore);
console.log('sum', math.sum(80, 10));
console.log('avg', math.avg(80, 90));
*/

