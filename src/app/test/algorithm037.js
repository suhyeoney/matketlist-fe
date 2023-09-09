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
      // console.log(`k = ${k}`);
      arrFiltered = arrFiltered.filter(e => e % k !== 0 || e === k);
      // console.log(`current arrData = ${JSON.stringify(arrFiltered)}`);
    }
    k++;
  }
  for(let i = 0; i < arrFiltered.length; i++) {
    console.log(`${arrFiltered[i]}`);
  }
  rl.close();

});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});