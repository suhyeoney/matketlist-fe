const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0);
let arrEdge = Array(0);
let arrIsVisited = Array(0);

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrAdj = Array(Number(arrInput1[0]) + 1).fill([]);
  arrIsVisited = Array(Number(arrInput1[0]) + 1).fill(false);
  arrEdge = Array(Number(arrInput1[1]));
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
  // DFS 수행
  let result = 0;
  for(let i = 1; i < arrAdj.length; i++) {
    if(!arrIsVisited[i]) {
      console.log(`>>>>> 아직 방문안함...이제 DFS 타고 방문시작! i=${i}`);
      result++;
      DFS(i);
    }
  }
  console.log(`arrEdge: ${JSON.stringify(arrEdge)}`);
  console.log(`arrAdj: ${JSON.stringify(arrAdj)}`);
  console.log(`result: ${result}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const DFS = (node) => {
  if(arrIsVisited[node]) {
    return;
  }
  arrIsVisited[node] = true;
  console.log(`arrIsVisited = ${arrIsVisited.filter((e, idx) => idx !== 0)}`);
  for(let j = 0; j < arrAdj[node].length; j++) {
    console.log(`arrAdj[${node}] = ${JSON.stringify(arrAdj[node])}`);
    if(!arrIsVisited[arrAdj[node][j]]) {
      DFS(arrAdj[node][j]);
    }
  }
};