const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrMaze = Array(0).fill(Array(0));
let arrIsVisited = Array(0).fill(Array(0));
 // 해당 노드의 상하좌우에 있는 노드도 같이 순회를 해야 함.
let positionDeltaX = [ 0, 0, -1, 1 ];
let positionDeltaY = [ -1, 1, 0, 0 ];

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');  // e.g. 4 6 => 4 x 6
  arrMaze = Array(Number(arrInput1[0])); // 2차원 초기화를 여기서 해줘야 함!
  arrIsVisited = Array(Number(arrInput1[0]));
  for(let i = 0; i < arrMaze.length; i++) {
    arrMaze[i] = Array(Number(arrInput1[1])).fill(0);
    arrIsVisited[i] = Array(Number(arrInput1[1])).fill(false);
    await new Promise(resolve => {
      rl.question('', async input2 => {
        const arrInput2 = input2.split('').map(e => {
          let el  = 0;
          el = Number(e);
          return el;
        });
        arrMaze[i] = [ ...arrInput2 ];
        resolve();
      });
    });
  }

  // 최단경로 탐색 (BFS 이용)
  BFS(0, 0);
  console.log(`result = ${arrMaze[arrMaze.length - 1][arrMaze[0].length - 1]}`);
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});


const BFS = (x, y) => {
  let queue = Array(0); // 여기서 큐의 크기는 따로 지정되지 않아야 함!
  queue.push([x, y]); // 노드의 값이 아닌, 노드의 '좌표'값을 큐에 담아야 함.
  arrIsVisited[x][y] = true;
  while(queue.length > 0) {
    let now = queue.shift();
    for(let k = 0; k < 4; k++) {
      const adjX = now[0] + positionDeltaX[k];
      const adjY = now[1] + positionDeltaY[k];
      if((adjX >= 0 && adjX < arrMaze.length) && (adjY >= 0 && adjY < arrMaze[0].length)) {
        if(!arrIsVisited[adjX][adjY] && arrMaze[adjX][adjY] !== 0) { // 방문한 적 없고, 값이 0이 아닌 경우에만 방문시작.
          queue.push([adjX, adjY]);
          arrIsVisited[adjX][adjY] = true;
          arrMaze[adjX][adjY] = arrMaze[now[0]][now[1]] + 1;
          console.log(`current arrMaze : ${JSON.stringify(arrMaze)}`);
        }
      }
    }
  }
};