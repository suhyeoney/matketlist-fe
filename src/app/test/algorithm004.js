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
  // 전체 원소를 숫자 0으로 초기화해야 함!
  arrData = Array(Number(arrInput1[0]) + 1).fill(0).map(() => Array(Number(arrInput1[0]) + 1).fill(0));
  arrSum =  Array(Number(arrInput1[0]) + 1).fill(0).map(() => Array(Number(arrInput1[0]) + 1).fill(0));
  arrQuery = Array(Number(arrInput1[1]));
  arrResult = Array(Number(arrInput1[1]));
  for(let i = 1; i < arrData.length; i++) {
    await new Promise(resolve => {
      rl.question('', input2 => {
        const element = input2.split(' ').map(e => {
          let el = 0;
          el = Number(e);
          return el;
        });
        arrData[i] = [ 0, ...element];
        for(let j = 1; j < arrData.length; j++) {
          arrSum[i][j] = arrSum[i][j - 1] + arrSum[i - 1][j] - arrSum[i - 1][j - 1] + arrData[i][j];
        }
        // console.log(`arrSum=${ JSON.stringify(arrSum) }`);
        resolve();
      });
    });
  }
  for(let i = 0; i < arrResult.length; i++) {
    await new Promise(resolve => {
      rl.question('', input3 => { // [ x1, y1, x2, y2 ]
        const element = input3.split(' ').map(e => {
          let el = 0;
          el = Number(e);
          return el;
        });
        const x1 = element[0];
        const y1 = element[1];
        const x2 = element[2];
        const y2 = element[3];
        arrResult[i] = arrSum[x2][y2] - arrSum[x1 - 1][y2] - arrSum[x2][y1 - 1] + arrSum[x1 - 1][y1 - 1];
        resolve();
      });
    });
  }
  console.log('arrSum: ', arrSum);
  for(let i = 0; i < arrResult.length; i++) {
    console.log(arrResult[i]);
  }
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});