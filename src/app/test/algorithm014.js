const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrResult = Array(0);

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  for(let i = 0; i < Number(arrInput1[0]); i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ');
        const element = Number(arrInput2[0]);
        if(element !== 0) {
          arrData.push({ value: element, abs: Math.abs(element) });
          arrData.sort((a, b) => {
            // 다중조건 오름차순 정렬 적용.
            // 작은 값을 가진 원소가 앞으로 나와야 나중에 poll처리만 하면 되니까...
            return a.abs - b.abs || a.value - b.value; 
          });
        } 
        else {
          // 0을 입력했으면, 직전 상태의 배열에서 절대값이 가장 작은 원소를 리턴 후 poll 처리.
          const poll = arrData.length > 0 ? arrData.shift().value : 0;
          arrResult.push(poll);
        }
        resolve();
      });
    });
  }
  arrData.forEach(e => console.log(e) );
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});