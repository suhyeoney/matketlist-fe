const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = [];
let arrDegree = Array(0);

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  for(let i = 0; i < Number(arrInput1[0]); i++) {
    arrData.push({ num: i + 1, timeToComplete: 0 });
    arrDegree = Array(Number(arrInput1[0]) + 1).fill(0);
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ');
        const time = Number(input2[0]);
        arrData[i].timeToComplete = time;
        for(let j = 1; j < arrInput2.length; j++) {
          if(Number(arrInput2[j]) === -1) {
            break;
          }
          const preemptive = Number(arrInput2[j]);

        } 
        resolve();
      });
    });
  }
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});