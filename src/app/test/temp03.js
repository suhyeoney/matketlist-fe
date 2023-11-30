const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// let input = [], graph = [], parent = {}, mst = [], node = null;
// rl.on('line', i => {
//   input.push(i);
// }).on('close', () => {
//   for(let i = 0; i < input.length; i++) {
//     const sdw = input[i].split(' ');
//     const s = sdw[0];
//     const d = sdw[1];
//     const w = Number(sdw[2]);
//     graph.push({ source: s, destination: d , weight : w });
//   }
//   kruskal(graph);
//   console.log(mst);
// });

// const kruskal = (graph) => {
//   graph.sort((a, b) => { return a.weight - b.weight; });
//   node = new Set(graph.map(e => [ e.source, e.destination ]).flat()); // Set 함수로 중복 제거
//   node.forEach(e => parent[e] = e);
//   for(let edge of graph) {
//     if(!isConnected(edge.source, edge.destination)) {
//       union(edge.source, edge.destination);
//       mst.push(edge);
//     }
//   }
// };

// const find = (node) => {
//   while(parent[node] !== node) {
//     node = parent[node];
//   }
//   return node;
// };

// const union = (node1, node2) => {
//   parent[find(node1)] = find(node2);
//   console.log(`parent`, parent);
// };

// const isConnected = (node1, node2) => {
//   return find(node1) === find(node2);
// };

let input = [], graph = [], parent = {}, mst = [], node = null;

rl.on('line', input1 => {
  input.push(input1);
}).on('close', () => {
  for(let i = 0; i < input.length; i++) {
    const sdw = input[i].split(' ');
    const s = sdw[0];
    const d = sdw[1];
    const w = Number(sdw[2]);
    graph.push({ source: s, destination: d, weight: w });
  }
  kruskal(graph);
  console.log(mst);
});

const kruskal = (graph) => {
  graph.sort((a, b) => { return a.weight - b.weight; });
  node = new Set(graph.map(e => [ e.source, e.destination ]).flat());
  node.forEach(e => parent[e] = e);
  for(let edge of graph) {
    if(!isConnected(edge.source, edge.destination)) {
      union(edge.source, edge.destination);
      mst.push(edge);
    }
  }
};

const find = (node) => {
  while(parent[node] !== node) {
    node = parent[node];
  }
  return node;
};

const union = (node1, node2) => {
  parent[find(node1)] = find(node2);
};

const isConnected = (node1, node2) => {
  return find(node1) === find(node2);
};