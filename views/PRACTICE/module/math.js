export const perfectScore = 100;

export const sum = (num1, num2) => {
    return num1 + num2
};

export const avg = (num1, num2) => {
    return (num1 + num2) / 2
};

// 변수나 함수를 외부에서 사용할 수 있도록 내보낼 때에는 앞에 export를 선언해 준다

const subtract = (num1, num2) => {
    return num1 - num2;
};

export default subtract;

/*
이렇게도 적을 수 있다
const perfectScore = 100;

const sum = (num1, num2) => {
    return num1 + num2
};

const avg = (num1, num2) => {
    return (num1 + num2) / 2
};

const subtract = (num1, num2) => {
    return num1 - num2;
};

export default {
    perfectScore,
    sum,
    avg,
    subtract,
}
*/