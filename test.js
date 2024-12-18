// window.onload = function () {
//     alert('onload');
//     // let btn = document.querySelector('#btn'); // button을 참조할 수 없습니다.
//     // btn.addEventListener('click', function () {
//     //     alert('Hello world!');
//     // });
// }
// document.addEventListener('DOMContentLoaded', function () {
//     alert('DOMContentLoaded');
//     // let btn = document.querySelector('#btn'); // button을 참조할 수 없습니다.
//     // btn.addEventListener('click', function () {
//     //     alert('Hello world!');
//     // });
// });

// var person = {
//     fullName: '짐코딩',
//     age: 20,
//     printThis: function () {
//         console.log(this);
//         console.log(this === person);
//         console.log('this === window', this === person);
//     }
// }
// person.printThis();

// function print() {
//     console.log('this: ', this);
//     console.log('this.fullname: ', this.fullname);
// }

// let person1 = {
//     fullname: '홍길동',
// };
// let person2 = {
//     fullname: '김길동',
// };
// let bindPrint = print.bind(person1); // person1 객체로 바인딩
// bindPrint(); // person1
// let bindPrint2 = bindPrint.bind(person2);
// bindPrint2(); // person1! bind는 단 한번만 할 수 있다.

let person12 = {
    fullname: '짐코딩',
    age: 20,
    printPerson: function () {
        console.log(`이름은 ${this.fullname} 입니다. 나이는 ${this.age}살 입니다.`);
    },
    hello: function () {
        setTimeout(function () {
            console.log(this);
        });
    },
};
person12.hello();

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person1 = new Person('김씨', 20);
console.log(person1)
// 출력
// {name: '김씨', age: 20}

function sum(number1 = 0, number2 = 0) {
	const result = number1 + number2;
	console.log('결과값: ', result);
}
sum(6);

const numbers = [1, 2, 3, 4, 5, 6, 7];

const result = numbers.reduce((acc, cur) => acc + cur);

console.log(result);
/*
    1회차: acc = 1, cur = 2 → acc + cur = 3
    2회차: acc = 3, cur = 3 → acc + cur = 6
    3회차: acc = 6, cur = 4 → acc + cur = 10
    4회차: acc = 10, cur = 5 → acc + cur = 15
    5회차: acc = 15, cur = 6 → acc + cur = 21
    6회차: acc = 21, cur = 7 → acc + cur = 28
*/

const fruits = ["사과", "딸기", "배", "참외", "딸기", "수박"];
const result2 = fruits.reduce((arr, cur) => {
  if (arr.includes(cur) === false) {
    arr.push(cur);
  }
  return arr;
}, []);
console.log(result2);