const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const dijkstra = (graph, start, end) => {
//   let distances = {}, previous = {}, unvisted = new Set();
//   for(let node in graph) {
//     distances[node] = node === start ? 0 : Infinity;
//     unvisted.add(node);
//   }

//   // 큐에 삽입된 노드 순회 시작
//   while(unvisted.size) {
//     let closestNode = null;
//     for(let node of unvisted) {
//       if(!closestNode || distances[node] < distances[closestNode]) {
//         closestNode = node;
//       }
//     }
//     if(distances[closestNode] === Infinity) break;
//     if(closestNode === end) break;

//     for(let neighbor in graph[closestNode]) {
//       let newDistance = distances[closestNode] + graph[closestNode][neighbor];
//       if(newDistance < distances[neighbor]) {
//         distances[neighbor] = newDistance;
//         previous[neighbor] = closestNode;
//       }
//     }
//     unvisted.delete(closestNode);
//   }

//   let path = [], node = end;
//   while(node) {
//     path.push(node);
//     node = previous[node];
//   }
//   return [ path.reverse(), distances[end] ];
// };

let input = [];
let graph = {};
let start = null;
let end = null;
rl.on('line', i => {
  input.push(i);
}).on('close', () => {
  const startEnd = input[0].split(' ');
  start = startEnd[0];
  end = startEnd[1];
  for(let i = 1; i < input.length; i++) {
    const edge = input[i].split(' ');
    const s = edge[0];
    const e = edge[1];
    const w = Number(edge[2]);
    console.log(s, e, w);
    if(graph[s] === undefined) {
      graph[s] = {};
    }
    if(graph[s][e] === undefined) {
      graph[s][e] = 0;
    }
    graph[s][e] = w;
  }
  console.log(graph);
  console.log(dijkstra(graph, start, end));
});


const dijkstra = (graph, start, end) => {
  let distances = {}, previous = {}, unvisited = new Set();
  for(let node in graph) {
    distances[node] = node === start ? 0 : Infinity;
    unvisited.add(node);
  }

  while(unvisited.size) {
    let closestNode = null;
    for(let node of unvisited) {
      if(!closestNode || distances[node] < distances[closestNode]) {
        closestNode = node;
      }
    }
    if(distances[closestNode] === Infinity) break;
    if(closestNode === end) break;

    for(let neighbor in graph[closestNode]) {
      let newDistance = distances[closestNode] + graph[closestNode][neighbor];
      if(newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closestNode;
      }
    }
    unvisited.delete(closestNode);
  }

  let path = [], node = end;
  while(node) {
    path.push(node);
    node = previous[node];
  }
  return [ path.reverse(), distances[end] ];
};
