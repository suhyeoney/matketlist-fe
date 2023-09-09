const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrParent = Array(0); // 원본 배열의 각 원소별 대표노드를 담은 대표노드 배열
let arrResult = [];

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrData = Array(Number(arrInput1[0]) + 1).fill(0).map((e, idx) => {
    let el = 0;
    el = idx;
    arrParent[idx] = idx;
    return el;
  });
  console.log(`arrData = ${JSON.stringify(arrData)}`);
  console.log(`arrParent = ${JSON.stringify(arrParent)}`);
  for(let i = 0; i < Number(arrInput1[1]); i++) {
    await new Promise(resolve => {
      rl.question('', async input2 =>{
        const arrInput2 = input2.split(' ');
        const opType = Number(arrInput2[0]);
        const a = Number(arrInput2[1]);
        const b = Number(arrInput2[2]);
        switch(opType) {
          case 0: // union 연산
            union(a, b);          
            break;
          case 1: // find 연산
            arrResult.push(checkIsSameGroup(a, b));
            break;
        }
        resolve();
      });
    });
  }
  arrResult.forEach(e => console.log(e));
  rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

// find 연산 : 해당 원소의 대표 노드를 찾음.
const find = (node) => {
  if(node === arrParent[node]) {
    // 대표노드 배열에서 해당 노드(node)와 같은 index를 갖는 원소와 값이 같으면... 그 자체가 대표노드이므로 바로 리턴.
    return node;
  } else { // 서로 같지 않으면, 꼬리에 꼬리를 물고 대표노드를 찾아 들어가야 하므로 (DFS 원리, 스택) 재귀호출 진행.
    return arrParent[node] = find(arrParent[node]);
  }
}; 

// union 연산 : 해당 두 원소의 대표 노드끼리 연결.
const union = (a, b) => { // union(1, 4) > 대표노드 배열의 4번째 원소를 1로 변경.
  // 두 원소를 같은 그룹으로 묶으려고 하기에 앞서 두 원소 각각의 대표 노드를 확인함.
  a = find(a);
  b = find(b);
  if(a !== b) {
    arrParent[b] = a;
  }
};

// 두 원소가 같은 집합에 포함돼 있는지 확인.
const checkIsSameGroup = (a, b) => {
  a = find(a);
  b = find(b);
  return a === b ? 'YES' : 'NO';
};