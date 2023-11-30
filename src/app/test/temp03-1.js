const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let input = [], arr = [], A = 0, B = 0;

const primeNumberList = (num1, num2) => {
  let list = [];
  for(let i = num1; i <= num2; i++) {
    let k = 2;
    let flag = true;
    while(k < i) {
      if(i % k === 0) {
        flag = false;
      }
      // k가 i의 직전값까지 왔을 때, 루프 아웃처리 
      if(k === i - 1) {
        if(flag) {
          list.push(i);
        }
        break;
      }
      k++;
    }
  }
  return list.filter(e => e * e >= A && e * e <= B);
};

rl.on('line', input1 => {
  input.push(input1);
}).on('close', () => {
  const AB = input[0].split(' ');
  A = Number(AB[0]);
  B = Number(AB[1]);
  console.log(primeNumberList(A, B));
});