const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// 다익스트라는 출발점과 도착점이 제시되어야 함.
const dijkstra = (graph, start, end) => {
	// 변수 정의
	let distances = {}, previous = {}, unvisited = new Set();
	// 변수 초기화
	for(let node in graph) { 
		distances[node] = node === start ? 0 : Infinity;
		unvisited.add(node);
	}
	while(unvisited.size) {
		console.log(new Array(...unvisited).join(' '));
		let closestNode = null;
		for(let node of unvisited) {
			if(!closestNode || distances[node] < distances[closestNode]) {
				// '현재 세팅되어 있는' 가장 가까운 노드와의 거리보다 선택된 노드와의 거리가 더 가까우면
				// 선택된 해당 노드를 가장 가까운 노드로 업데이트.
				// 예를 들어, C노드까지의 거리가 현재 '가장 가까운 노드'로 세팅되어 있는 B노드까지의 거리보다 작으면
				// '가장 가까운 노드'를 기존의 B에서 C로 바꿈.
				closestNode = node;
			}
		}
		if(distances[closestNode] === Infinity) break;
		if(closestNode === end) break; // 끝
		
		for(let neighbor in graph[closestNode]) {
			// '현재 세팅되어 있는' 가장 가까운 노드에 대해 이웃하는 노드들을 순회.
			let newDistance = distances[closestNode] + graph[closestNode][neighbor];
			if(newDistance < distances[neighbor]) {
				// 선택된 이웃노드까지의 거리 합보다 새로운 거리 합이 작으면
				// 선택된 이웃노드까지의 거리 합으로 새로운 거리 합 업데이트.
				distances[neighbor] = newDistance;
				previous[neighbor] = closestNode;
			}
		}
		unvisited.delete(closestNode);
		console.log(`distances`);
		console.log(distances);
		console.log(`previous`);
		console.log(previous);
	}

	// return `Shortest Path = ${path}, Distance = ${distances[end]}`;

	// 경로 파악을 위해 역으로 노드 트래킹함.
	let path = [], node = end;
	while(node) {
		path.push(node);
		node = previous[node];
	}
	return path.reverse();
};

const graph = {
	A: { B: 1, C: 2 },
	B: { A: 1, C: 4, D: 5 },
	C: { A: 4, B: 2, D: 1 },
	D: { B: 5, C: 1 },
};

console.log(dijkstra(graph, 'A', 'D'));