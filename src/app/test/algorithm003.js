const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrSum = Array(0);
let arrQuery = Array(0);
let arrResult = Array(0);


rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrData = Array(Number(arrInput1[0]) + 1);
  arrSum = Array(Number(arrInput1[0]) + 1);
  arrData[0] = 0; // 인덱스 0 값으로 숫자 0을 반드시 할당할 것! 안그러면 undefined 이슈 발생함.
  arrSum[0] = 0; // 인덱스 0 값으로 숫자 0을 반드시 할당할 것! 안그러면 undefined 이슈 발생함.
  arrQuery = Array(Number(arrInput1[1]));
  arrResult = Array(Number(arrInput1[1]));
  rl.question('', async input2 => {
    const arrInput2 = input2.split(' ');
    for(let i = 0; i < arrInput2.length; i++) {
      arrData[i + 1] = Number(arrInput2[i]);
      arrSum[i + 1] =arrSum[i] + arrData[i + 1];
    }
    for(let i = 0; i < arrQuery.length; i++) {
      await new Promise(resolve => {
        rl.question('', query => {
          const elementQuery = query.split(' ');
          arrQuery[i] = [ Number(elementQuery[0]), Number(elementQuery[1]) ];
          arrResult[i] = arrSum[arrQuery[i][1]] - arrSum[arrQuery[i][0] - 1];
          resolve();
        }) 
      })
    }
    for(let i = 0; i < arrResult.length; i++) {
      console.log(arrResult[i]);
    }
    rl.close();
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});