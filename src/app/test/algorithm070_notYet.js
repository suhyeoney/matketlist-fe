const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrBST = Array(0); // 트리 배열
let resultPreOrder = '';
let resultInOrder = '';
let resultPostOrder = '';

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  // [중요] 배열의 원소 타입이 Object일 경우, 단순 Array.fill 처리한다면 Call by Reference에 의해 
  // 모든 원소가 동일한 값으로 변경이 됨. 이것을 막기 위해, Array.from으로 1차과정 거치고
  // 그리고나서 Array.fill로 2차과정을 거치는Call by Value로 처리할 수 있다. 그러면 값 복사 이슈 X
  arrBST = Array.from({ length: Number(arrInput1[0]) + 1 }, () =>({ left: null, right: null }));
    for(let i = 0; i < arrBST.length - 1; i++) {
      await new Promise(resolve => {
        rl.question('', async input2 => {
          const arrInput2 = input2.split(' ');
          const parent = Number(arrInput2[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1);
          // 해당 노드의 child가 존재하지 않으면,  child 값을 -1로 저장
          const leftChild = arrInput2[1] === '.' ? -1 : Number(arrInput2[1].charCodeAt(0) - 'A'.charCodeAt(0)) + 1;
          const rightChild = arrInput2[2] === '.' ? -1 : Number(arrInput2[2].charCodeAt(0) - 'A'.charCodeAt(0)) + 1;
          arrBST[parent].left = leftChild;
          arrBST[parent].right = rightChild;
          // console.log(`arrBST = ${JSON.stringify(arrBST)}`);
          
          resolve();
        });
      });
    }

    // BST Search 시작
    // preOrder(1);
    // inOrder(1);
    // postOrder(1);
    // console.log(`preOrder = ${resultPreOrder}`);
    // console.log(`inOrder = ${resultInOrder}`);
    // console.log(`postOrder = ${resultPostOrder}`);

    rl.close();
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

// 중간(parent)이 기준이 됨.
const preOrder = (nodeIndex) => {
  console.log(`nodeIndex = ${nodeIndex}`);
  // parent > leftChild > rightChild
  if(arrBST[nodeIndex] === -1) {
    return;
  }
  // resultPreOrder.concat(nodeIndex);
  preOrder(arrBST[nodeIndex].left);
  preOrder(arrBST[nodeIndex].right);
  console.log(`preOrder: ${nodeIndex}`);
};

const inOrder = (nodeIndex) => {
  // leftChild > parent > rightChild
  if(arrBST[nodeIndex] === -1) {
    return;
  }
  inOrder(arrBST[nodeIndex].left);` `
  // resultInOrder.concat(nodeIndex);
  console.log(`inOrder: ${nodeIndex}`);
  inOrder(arrBST[nodeIndex].right);
};b

const postOrder = (nodeIndex) => {
  // leftChild > rightChild > parent
  if(arrBST[nodeIndex] === -1) {
    return;
  }
  postOrder(arrBST[nodeIndex].left);
  postOrder(arrBST[nodeIndex].right);
  console.log(`postOrder: ${nodeIndex}`);
  // resultPostOrder.concat(nodeIndex);
};