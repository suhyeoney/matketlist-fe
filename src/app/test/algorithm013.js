const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let queue = Array(0);
let arrResult = Array(0);

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  for(let i = 0; i < Number(arrInput1[0]); i++) {
    queue.push(i + 1);
  }  
  while(queue.length >= 1) {
    queue.shift(); // 맨 위에껀 버림.
    console.log(`poll > current queue = ${JSON.stringify(queue)}`);
    if(queue.length >= 2) {
    queue.push(queue.shift()); // 그 다음 위에껄 빼서 다시 뒤로 add함.
    console.log(`move from front to rear > current queue = ${JSON.stringify(queue)}`);
    }
    if(queue.length === 1) {
      break;
    }
  }

  console.log(`result = ${JSON.stringify(queue)}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});