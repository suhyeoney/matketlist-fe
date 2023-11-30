const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrAdj = Array(0); // 엣지 리스트
let arrParent = Array(0); // 유니온 파인드 리스트 (find 연산 및 union 연산이 적용될 배열), 엣지 리스트와 마찬가지로 엣지 개수를 기준으로 함.
let cntNode = 0;
let cntEdge = 0;
let queue = [];

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  cntNode = Number(arrInput1[0]);
  cntEdge = Number(arrInput1[1]);
  arrAdj = Array(cntEdge + 1).fill();
  arrParent = Array(cntEdge + 1).fill(0);

    for(let i = 0; i < cntEdge; i++) {
      await new Promise(resolve => {
        rl.question('', async input2 => {
          const arrInput2 = input2.split(' ');
          const u = Number(arrInput2[0]);
          const v = Number(arrInput2[1]);
          const w = Number(arrInput2[2]);
          arrAdj[i + 1] = { s: u, e: v, v: w }; // BST에서 엣지리스트를 구성하는 객체의 프로퍼티는 s(시작점) / e(끝점) / v(가중치) 로 하기.
          // queue.push(arrAdj[i + 1]); // 여기서 에러...
          // arrAdj.sort((a, b) => {
          //   return a.v - b.v;
          // }).unshift(arrAdj.pop()); 
          queue.push(arrAdj[i + 1]);
          queue.sort((a, b) => { // 가중치 정렬의 대상을 엣지 리스트(arrAdj)가 아닌 큐로 해야 함!!!! (중요)
            return a.v - b.v;
          });
          // console.log(`arrAdj = ${JSON.stringify(arrAdj)}`);
          // MST는 처음에 입력받은 엣지를 일괄적으로 큐에 add함. (다시 말해, 별도의 시작점이 없음)
          console.log(`current queue = ${JSON.stringify(queue)}`);
          arrParent[i + 1] = i + 1;
          resolve();
        });
      });
    }

    // MST 시작
    MST();
    rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const MST = () => {
  let usedEdge = 0;
  let result = 0;
  while(usedEdge < cntNode - 1) {
    console.log(`usedEdge : ${usedEdge}`);
    let now = queue.shift();
    if(find(now.s) !== find(now.e)) {
      // 큐에서 꺼낸 엣지의 start의 대표노드와 end의 대표노드가 서로 다르다면 > 사이클을 형성하고 있지 않음.
      // start, end 두 노드를 서로 유니온시켜줘야 함.
      union(now.s, now.e);
      result = result + now.v; // 해당 엣지의 가중치를 더해나감.
      console.log(`result = ${result}`);
      usedEdge++; // 해당 엣지에 대한 MST 처리 완료했으므로, 다음 엣지로 넘어가기 위해 증가시킴.
    }
  }
  console.log(`result = ${result}`);
};

const find = (node) => {
  if(node === arrParent[node]) {
    // 해당 노드가 대표 노드이므로, 그대로 리턴
    return node;
  } else {
    return arrParent[node] = find(arrParent[node]);
  }
};

const union = (a, b) => {
  a = find(a);
  b = find(b);
  // a의 대표노드, b의 대표노드가 서로 다르다면 b의 대표노드를 a로 치환함.
  if(a !== b) {
    arrParent[b] = a;
  }
};