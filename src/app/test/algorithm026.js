const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0);
let arrEdge = Array(0);
let arrIsVisited = Array(0);
let start = 1;
let resultDFS = '';
let resultBFS = '';

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrAdj = Array(Number(arrInput1[0]) + 1).fill([]);
  arrIsVisited = Array(Number(arrInput1[0]) + 1).fill(false);
  arrEdge = Array(Number(arrInput1[1]));
  start = Number(arrInput1[2]);
  for(let i = 0; i < arrEdge.length; i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ').map(e => {
          let el = 0;
          el = Number(e);
          return el;
        });
        arrEdge[i] = [ ...arrInput2 ];
        const start = arrEdge[i][0]; // 간선의 시작점을 넣었으면 그 간선의 끝점도 같이 삽입해줘야 함.
        const end =  arrEdge[i][1];
        arrAdj[start] = [ ...arrAdj[start], end ];
        arrAdj[end] = [ ...arrAdj[end], start ];
        resolve();
      });
    });
  }

  for(let i = 1; i < arrAdj.length; i++) {
    arrAdj[i].sort((a, b) => { 
      return a - b; 
    });
  }

  // DFS 수행
  arrIsVisited.fill(false);
  DFS(start);

    // BFS 수행
  arrIsVisited.fill(false);
  BFS(start);

  console.log(`DFS : ${resultDFS}`);
  console.log(`BFS : ${resultBFS}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const DFS = (node) => {
  arrIsVisited[node] = true;
  resultDFS += `${node} `
  for(let j = 0; j < arrAdj[node].length; j++) {
    if(!arrIsVisited[arrAdj[node][j]]) {
      DFS(arrAdj[node][j]);
    }
  }
};

const BFS = (node) => {
  let queue = Array(0); // 여기서 큐의 크기는 따로 지정되지 않아야 함!
  queue.push(node);
  console.log(`current queue : ${queue}`);
  arrIsVisited[node] = true;
  while(queue.length > 0) {
    let now = queue.shift();
    resultBFS += `${now} `
    for(let j = 0; j < arrAdj[now].length; j++) {
      if(!arrIsVisited[arrAdj[now][j]]) {
        arrIsVisited[arrAdj[now][j]] = true;
        queue.push(arrAdj[now][j]);
        console.log(`current queue : ${JSON.stringify(queue)}`);
      }
    }
  }
};