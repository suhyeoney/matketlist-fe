const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let cntSwap = 0;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrData = Array(Number(arrInput1[0]));
  for(let i = 0; i < arrData.length; i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const element = input2.split(' ');
        arrData[i] = Number(element[0]);
        resolve();
      });
    });
  }
  for(let i = 0; i < arrData.length - 1; i++) {
    for(let j = 0; j < arrData.length - 1 - i; j++) {
      // i가 증가할수록 j에서 i만큼 빼는 이유 : 
      // 이미 i번째 루프에서 정렬이 이루어졌으므로
      // 이전의 i번째 루프를 또 수행할 필요가 없음.
      // e.g. i = 2 > i = 3
      // j도 이전의 -2에서 -3으로 변화시킴으로써 이전 횟수를 제외시킨다.
      if(arrData[j] > arrData[j + 1]) {
        let temp = 0;
        temp = arrData[j];
        arrData[j] = arrData[j + 1];
        arrData[j + 1] = temp;
        cntSwap++;
      }
      console.log(`arrData[${i} = ${JSON.stringify(arrData[i])}]`);
    }
  }
  console.log(`arrData = ${JSON.stringify(arrData)}`);
  console.log(`swap count = ${cntSwap}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});