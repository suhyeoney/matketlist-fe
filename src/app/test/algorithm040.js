const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = [];

rl.question('', input1 => {
  const arrInput1 = input1.split(' ');
  const startVal = Number(arrInput1[0]);
  const endVal = Number(arrInput1[1]);
  for(let i = startVal; i <= endVal; i++) {
    arrData.push(i);
  }
  let k = 2;
  let arrFiltered = [ ...arrData ];
  while(k <= endVal) {
    if(k) {
      arrFiltered = arrFiltered.filter(e => e % (k * k) !== 0);
    }
    k++;
  }
  console.log(`result = ${JSON.stringify(arrFiltered)}`);
  console.log(`result = ${arrFiltered.length}`);

  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});