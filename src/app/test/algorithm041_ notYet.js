const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = [];

rl.question('', input1 => {
  const arrInput1 = input1.split(' ');
  const startVal = 1;
  const endVal = Number(arrInput1[0]);
  for(let i = startVal; i <= endVal; i++) {
    arrData.push(i);
  }
  let k = 2;
  let arrFiltered = [ ...arrData ];
  while(k <= Math.sqrt(endVal)) {
    if(k) {
      console.log(`k = ${k}`);
      arrFiltered = arrFiltered.filter(e => {
        console.log(`${e} % ${k} = ${e % k}`);
        console.log(`${endVal} % ${k} = ${endVal % k}`);
        console.log(`${e}와 ${endVal} >>> 서로소 ${
          (e % k === 0 && endVal % k !== 0) || (e % k !== 0 && endVal % k === 0) || (endVal % e !== 0)
        }`);
        return (e % k === 0 && endVal % k !== 0) || (e % k !== 0 && endVal % k === 0) || (endVal % e !== 0);
      });
      console.log(`current arrData = ${JSON.stringify(arrFiltered)}`);
    }
    k++;
  }

  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});