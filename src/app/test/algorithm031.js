const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrFlatten = Array(0);

rl.question('', input1 => {
  const arrInput1 = input1.split(''); 
  arrData = Array(Number(arrInput1[0]) + 1);
  for(let i = 1; i < arrData.length; i++) {
    arrData[i] = Array(Number(arrInput1[0]) + 1).fill(0); // for loop의 첫번쨰 루프 시, 2차원배열 최종 정의!
    for(let j = 1; j < arrData.length; j++) {
      arrData[i][j] = i * j;
      arrFlatten.push(arrData[i][j]);
    }
  }
  arrFlatten.sort((a, b) => {
    return a - b;
  });
  console.log(`arrFlatten  = ${JSON.stringify(arrFlatten)}`);
  
  rl.question('', input2 => {
    const arrInput2 = input2.split('');
    const k = Number(arrInput2[0]);
    let startIndex = 1;
    let endIndex = arrFlatten.length - 1;
    while(startIndex <= endIndex) {
      let middleIndex = parseInt((startIndex + endIndex) / 2);
      if(arrFlatten[k] < arrFlatten[middleIndex]) {
        endIndex = middleIndex - 1;
      } else if(arrFlatten[k] > arrFlatten[middleIndex]) {
        startIndex = middleIndex + 1;
      } else {
        console.log(`result = ${arrFlatten[k]}`);
        break;
      }
    }
    rl.close();
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});