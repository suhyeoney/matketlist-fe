const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let stack = Array(0);
let arrResult = Array(0);

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  for(let i = 0; i < Number(arrInput1[0]); i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const element = input2.split(' ');
        arrData.push(Number(element[0]));
        resolve();
      });
    });
  }
  console.log(`arrData = ${JSON.stringify(arrData)}`);
  let k = 1;
  for(let i = 0; i < arrData.length; i++) {
    let now = arrData[i];
    if(now >= k) { // 수열의 현재 값이 k 이상이면 > k가 수열의 현재 값과 같아지는 범위 내에서 k를 1씩 증가시키며 스택에 k를 push
      while(k <= now) {
        stack.push(k);
        console.log(`arrData[${i}]=${arrData[i]} k=${k} push > current stack = ${JSON.stringify(stack)}`);
        arrResult.push('+');
        k++;
      }
    } else if(stack[stack.length - 1] !== now) {
      arrResult.length = 0;
      break;
    }
    stack.pop();
    console.log(`arrData[${i}]=${arrData[i]} k=${k} pop > current stack = ${JSON.stringify(stack)}`);
    arrResult.push('-');
  }

  console.log(`result = ${stack.length === 0 ? JSON.stringify(arrResult) : 'NO'}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

// Deque 4가지 메소드 => addFirst, addLast, removeFirst, removeLast
// 1. addFirst = unshift
const addFirst = (node) => deque.unshift(node);
// 2. addLiast = push
const addLast = (node) => deque.push(node);
// 3. removeFirst = shift
const removeFirst = () => deque.shift();
// 4. removeLast = pop
const removeLast = () => deque.pop();