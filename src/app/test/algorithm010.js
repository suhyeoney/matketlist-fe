const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let deque = Array(0);
let windowSize = 0;
let arrResult = Array(0);

rl.question('', input1 => {
  const arrInput1 = input1.split(' ');
  arrData = Array(Number(arrInput1[0]));
  arrResult = Array(Number(arrInput1[0]));
  windowSize = Number(arrInput1[1]);
  rl.question('', input2 => {
    const arrInput2 = input2.split(' ').map(e => {
      let el = 0;
      el = Number(e);
      return el;
    });
    arrData = [ ...arrInput2 ];
    console.log(`arrData = ${JSON.stringify(arrData)}, deque.length = ${deque.length}`);

    for(let i = 0; i < arrData.length; i++) {
      const k = arrData[i];
      while(deque.length > 0 && deque[deque.length - 1].value > k) {
        removeLast();
      }
      addLast({ key: i + 1, value: arrData[i] });
      if(deque[deque.length - 1].key - deque[0].key + 1 > windowSize) {
        removeFirst();
      }
      console.log(`current deque = ${JSON.stringify(deque)}`);
      arrResult[i] = deque[0].value;
    }
    console.log(`arrResult = ${JSON.stringify(arrResult)}`);
    rl.close();
  });
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