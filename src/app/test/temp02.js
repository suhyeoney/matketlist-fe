const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const maze = (arr, start) => {
  const dx = [ 0, 1, 0, -1 ], dy = [ 1, 0, -1, 0 ];
  let queue = [], visited = new Set();
  queue.push(start);
  while(queue.length) {
    const now = queue.shift();
    const nowX = now[0];
    const nowY = now[1];
    if(!visited.has(JSON.stringify(now))) {
      visited.add(JSON.stringify(now));
      for(let k = 0; k < 4; k++) {
        const nextX = nowX + dx[k];
        const nextY = nowY + dy[k];
        if((nextX >= 0 && nextX < n) && 
        (nextY >= 0 && nextY < m) && 
        (arr[nextX][nextY] > 0)) {
          arr[nextX][nextY] = arr[nowX][nowY] + 1;
          queue.push([ nextX, nextY ]);
        }
      }
    }
  }
};

let input = [];
let n = 0;
let m = 0;
let arr = [];
rl.on('line', i => {
  input.push(i);
}).on('close', () => {
  const nm = input[0].split(' ');
  n = Number(nm[0]);
  m = Number(nm[1]);
  for(let i = 1; i < n + 1; i++) {
	arr.push(input[i].split('').map(e => { return Number(e); }));
  }
  console.log(arr); // Before
  maze(arr, [0 ,0]);
  console.log(arr); // After
  console.log(arr[n - 1][m -1]);
});