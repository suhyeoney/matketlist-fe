const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0);
let arrEdge = Array(0);
let arrIsVisited = Array(0);
let isArrived = false;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrAdj = Array(Number(arrInput1[0])).fill([]);
  arrEdge = Array(Number(arrInput1[1])).fill([]);
  arrIsVisited = Array(Number(arrInput1[0])).fill(false);
  for(let i = 0; i < arrEdge.length; i++) {
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split(' ').map(e => {
          let el = 0;
          el = Number(e);
          return el;
        });
        arrEdge[i] = [ ...arrInput2 ]; 
        const start = arrEdge[i][0];
        const end = arrEdge[i][1];
        arrAdj[start] = [ ...arrAdj[start], end ];
        arrAdj[end] = [ ...arrAdj[end], start ];
        resolve();
      });
    });
  }
  console.log(`arrEdge = ${JSON.stringify(arrEdge)}`);
  console.log(`arrAdj = ${JSON.stringify(arrAdj)}`);

  // DFS 수행 (노드 넘버와 뎁스까지 파라미터로 넘겨줘야 함)
  let result = 0;
  for(let i = 0; i < arrAdj.length; i++) {
    DFS(i, 1); // depth = 1부터 시작
    if(isArrived) {
      break;
    }
  }
  if(isArrived) {
    result = 1;
  }
  console.log(`result = ${result}`);
  rl.close();
});

rl.on('close', () => {
  console.log('\nBYE BYE !!!');
  process.exit(0);
});

const DFS = (node, depth) => {
  if(isArrived || depth === 5) {
    isArrived = true; // depth = 5까지 왔으면 변경. (친구 A,B,C,D,E 5명의 관계가 존재하는지 확인해야 하니까...)
    return;
  }
  arrIsVisited[node] = true; // 해당 노드 방문여부 true로 변경
  for(let j = 0; j < arrAdj[node].length; j++) { // 해당 노드와 엣지로 연결되어 있는 다른 노드들도 순회하면서 방문여부 true로 변경해줘야 함.
    if(!arrIsVisited[arrAdj[node][j]]) {
      DFS(arrAdj[node][j], depth + 1);
    }
  }
  arrIsVisited[node] = false; // 새로운 depth로 DFS 수행 전, 방문여부를 다시 false로 초기화시켜 놓아야 함.
};