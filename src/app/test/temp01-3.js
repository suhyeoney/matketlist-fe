const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const DFS = (graph, start) => {
  let stack = [], visited = new Set(), result = [];
  stack.push(start);
  while(stack.length) {
    const vertex = stack.pop();
    if(!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
      for(let neighbor of graph[vertex]) {
        stack.push(neighbor);
      }
    }
  }
  return result;
};

const BFS = (graph, start) => {
  let queue = [], visited = new Set(), result = [];
  queue.push(start);
  while(queue.length) {
    const vertex = queue.shift();
    if(!visited.has(vertex)) { // 대기 큐에서 빼낸 정점의 방문 이력이 없다면
      visited.add(vertex);
      result.push(vertex);
      for(let neighbor of graph[vertex]) {
        queue.push(neighbor);
      }
    }
  }
  return result;
};


let input = [];
let graph = {};
let start = null;
rl.on('line', i => {
  input.push(i);
}).on('close', () => {
  const s = input[0].split(' ');
  start = s[0];
  for(let i = 1; i < input.length; i++) {
    const edge = input[i].split(' ');
    const s = edge[0];
    const e = edge[1];
    if(graph[s] === undefined) {
      graph[s] = [];
    }
    graph[s].push(e);
  }
  console.log(start);
  console.log(DFS(graph, start));
  console.log(BFS(graph, start));
});

