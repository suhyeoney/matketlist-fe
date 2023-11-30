const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrStoneByColor = Array(0);
let cntAllStones = 0;
let K = 0;
let result = 0;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrStoneByColor = Array(Number(arrInput1[0]));
  rl.question('', async input2 => {
    const arrInput2 = input2.split(' ');
    arrInput2.forEach((e, idx) => {
      const element = Number(e);
      arrStoneByColor[idx] = element;
      cntAllStones += element;
    });
    rl.question('', async input3 => {
      const arrInput3 = input3.split(' ');
      K = Number(arrInput3[0]);
      combination();
      rl.close();
    });
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const combination = () => {
  console.log(`arrStoneByColor = ${JSON.stringify(arrStoneByColor)}`);
  console.log(`cntAllStones = ${cntAllStones}`);
  console.log(`K = ${K}`);
  for(let i = 0; i < arrStoneByColor.length; i++) {
    let P = 1;
    for(let j = 0; j < K; j++) {
      console.log(`${arrStoneByColor[i]} - ${j} / ${cntAllStones} - ${j}`);
      let p = (arrStoneByColor[i] -j) / (cntAllStones -j);
      console.log(`p = ${p}`);
      P *= p;
    }
    result += P;
  }
  console.log(`result = ${result}`);
};