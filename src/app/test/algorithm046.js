const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0);
let arrCntVisited = Array(0);
let K = 0;
let start = 0;
let isIn = false;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  const cntNode = Number(arrInput1[0]);
  const cntEdge = Number(arrInput1[1]);
  K = Number(arrInput1[2]);
  start = Number(arrInput1[3]);
  arrAdj = Array(cntNode + 1).fill([]);
  arrCntVisited = Array(cntNode + 1).fill(-1); // BFS를 이용한 최단거리 방문횟수 배열의 초기값은 -1로 할 것!
  for(let i = 1; i <= cntEdge; i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ');
        const start = Number(arrInput2[0]);
        const end = Number(arrInput2[1]);
        // 문제에서 '단방향 도로가 존재한다'고 했으므로
        // 인접리스트 구성 시, 시작점에 대해 끝점 삽입만 하고 끝내야 함.
        arrAdj[start] = [ ...arrAdj[start], end ];
        // if(end > start) arrAdj[end] = [ ...arrAdj[end], start ];
        resolve();
      });
    });
  }
  BFS(start); // 시작노드 start부터 BFS 시작.
  
  console.log(`arrCntVisited = ${JSON.stringify(arrCntVisited)}`);
  arrCntVisited.forEach((e, idx) => {
    if(e === K) {
      isIn = true;
      console.log(idx);      
    }
  });
  if(!isIn) {
    console.log(`-1`);
  }
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const BFS = (node) => {
  let queue = [];
  queue.push(node);
  arrCntVisited[node]++;
  while(queue.length > 0) {
    let now = queue.shift();
    for(let i = 0; i < arrAdj[now].length; i++) {
      if(arrCntVisited[arrAdj[now][i]] === -1) {
        queue.push(arrAdj[now][i]);
        console.log(`current queue : ${JSON.stringify(queue)}`);
        arrCntVisited[arrAdj[now][i]] = arrCntVisited[now] + 1;
      }
    }
  }
};