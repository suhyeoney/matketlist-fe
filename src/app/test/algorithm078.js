const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrResult = [];

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  combination();
  for(let i = 0; i < Number(arrInput1[0]); i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ');
        const K = Number(arrInput2[0]);
        rl.question('', async input3 => {
          const arrInput3 = input3.split(' ');
          const N= Number(arrInput3[0]);
          // console.log(`${arrData[K][N]}`);
          arrResult.push(arrData[K][N]);
          resolve();
        });
      });
    });
  }
  arrResult.forEach(e => {
    console.log(e);
  });
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const combination = () => {
  arrData =  Array.from({ length: 15 }, () => new Array(15).fill(0));
  for(let i = 0; i < arrData.length; i++) {
    arrData[i][1] = 1;
    arrData[0][i] = i; 
  }
  for(let i = 1; i < arrData.length; i++) { // i는 층수 (문제에서 0층부터 시작)
    for(let j = 2; j < arrData.length; j++ ) { // j는 호수 (문제에서 1호부터 시작)
      arrData[i][j] = arrData[i - 1][j] + arrData[i][j - 1];
    }
  }
  // console.log(`arrData = ${JSON.stringify(arrData)}`);
};