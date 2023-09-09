const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrSum = Array(0);
let resultArrSum = Array(0);
let result = 0;

rl.question('', input1 => {
  if(input1.length > 50) {
    console.log(`입력한 식의 길이가 50을 초과함. exit`);
    rl.close();
  }
  const arrInput1 = input1.split('-'); 
  arrSum = [ ...arrInput1 ];
  console.log(`arrSum = ${arrSum}`);
  
  for(let i = 0; i < arrSum.length; i++) {
    const arrArrSum = arrSum[i].split('+');
    let sum = 0;
    for(let j = 0; j < arrArrSum.length; j++) {
      sum += Number(arrArrSum[j]);
    }
    resultArrSum.push(sum);
    if(i > 0) {
      result -= resultArrSum[i];
    } else { // 첫 번째수만은 더해야함
      result += resultArrSum[i];
    }
  }
  console.log(`result = ${result}`);
  rl.close();

});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});