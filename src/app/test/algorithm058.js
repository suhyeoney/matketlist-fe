const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0);
let arrDistance = Array(0);
// let arrIsVisited = Array(0);
let nth = 0;
let start = 1;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  const cntNode = Number(arrInput1[0]);
  const cntEdge = Number(arrInput1[1]);
  const nth = Number(arrInput1[2]);
  arrAdj = Array(cntNode + 1).fill([]);
  arrDistance = Array(cntNode + 1).fill([]);
  arrDistance = Array(cntNode + 1).fill(999999999);
  arrIsVisited = Array(cntNode + 1).fill(false);
    for(let i = 0; i < cntEdge; i++) {
      await new Promise(resolve => {
        rl.question('', async input2 => {
          const arrInput2 = input2.split(' ');
          const u = Number(arrInput2[0]);
          const v = Number(arrInput2[1]);
          const w = Number(arrInput2[2]);
          arrAdj[u] = [ ...arrAdj[u], {vertex: v, weight: w} ];
          resolve();
        });
      });
    }

    // 다익스트라 시작
    arrDistance[start] = 0;
    BFS(start);

    arrIsVisited.forEach((e, idx) => {
      if(idx > 0) { // 0번째 인덱스는 빈값취급.
        if(e) {
          console.log(arrDistance[idx]);
        } else {
          console.log('INF');
        }
      }
    });
    rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const BFS = (node) => {
  let queue = [];
  queue.push(node);
  while(queue.length > 0) {
    let now = queue.shift();
    console.log(`now : ${now}`);
    if(arrIsVisited[now]) continue; // 현재 노드(now)에 이미 방문했으면, 아래 코드 실행하지 않고 다음 반복(++)으로 넘어감.
    arrIsVisited[now] = true;
    for(let i = 0; i < arrAdj[now].length; i++) {
      // 현재 노드와 인접한 노드(a)의 최단거리가 현재 노드(b) + (a - b간 에지 가중치) 보다 크면... 값 업데이트
      const adjNode = arrAdj[now][i]; // 현재 노드(now)에 인접한 노드 (i + 1번째까지 있음)
      console.log(`adjNode = ${adjNode.vertex}`);
      if(arrDistance[adjNode.vertex] > arrDistance[now] + adjNode.weight) {
        console.log(`arrDistance[${adjNode.vertex}] = arrDistance[${now}](=${arrDistance[now]}) + ${adjNode.weight}`);
        arrDistance[adjNode.vertex] = arrDistance[now] + adjNode.weight;
        console.log(`current distance = ${JSON.stringify(arrDistance)}`);
        queue.push(adjNode.vertex);
        console.log(`current queue = ${JSON.stringify(queue)}`);
      }
    }
  }
};