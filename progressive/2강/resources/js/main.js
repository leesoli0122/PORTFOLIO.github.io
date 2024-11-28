import { conHello, fnPlusNumbers } from './library_named.js';
console.log(conHello, '이름으로 내보내기입니다'); //안녕하세요! 이름으로 내보내기입니다
console.log('1+2=', fnPlusNumbers(1,2)); //1+2= 3

import * as myLibrary from './library_named.js';
console.log(myLibrary.conHello, '*을 사용한 이름으로 내보내기입니다'); //안녕하세요! *을 사용한 이름으로 내보내기입니다
console.log('5+6=', myLibrary.fnPlusNumbers(5,6)); //5+5= 11