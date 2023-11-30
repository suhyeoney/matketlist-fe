const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = 0;
let questionNo = 0;
let K = 0;
let arrPermutation = [];
let arrIsVisited = Array(0);
let arrResult = [];

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  N = Number(arrInput1[0]);
  arrIsVisited = Array(N).fill(false);
  rl.question('', async input2 => {
    const arrInput2 = input2.split(' ');
    questionNo = Number(arrInput2[0]);
    switch(questionNo) {
      case 1:
        K = Number(arrInput2[1]);
        for(let i = 1; i <= N; i++) {
          arrPermutation.push(i);
        }
        break;
      case 2:
        for(let i = 1; i < arrInput2.length; i++) {
          arrPermutation.push(Number(arrInput2[i]));
        }
        break;
    }
    permutation(arrPermutation);
    rl.close();
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

const permutation = (arr) => {
  // console.log(`N = ${N}`);
  // console.log(`K = ${K}`);
  // console.log(`arrPermutation = ${JSON.stringify(arr)}`);
  let result = [];
  if(arr.length === 0) {
    return [];
  }
  if(arr.length === 1) {
    return [ arr ];
  }
  for(let i = 0; i < arr.length; i++) {
    const now = arr[i];
    console.log(`now = ${now}`);
    const remains = arr.slice(0, i).concat(arr.slice(i + 1)); // now순열을 제외한 나머지 원소를 remains 변수에 할당
    console.log(`remains = ${JSON.stringify(remains)}`);
    const permutatedRemains = permutation(remains); // 남은 수들에 대한 순열 재귀 처리
    console.log(`permutatedRemains = ${JSON.stringify(permutatedRemains)}`);
    for(let j = 0; j < permutatedRemains.length; j++) {
      const arrPermuated = [now].concat(permutatedRemains[j]); // 아까 저장해둔 now순열과 남은 수들에 대해 재귀 처리 후 리턴된 순열을 합침. 결과적으로 length는 4
      console.log(`arrPermuated = ${JSON.stringify(arrPermuated)}`);
      result.push(arrPermuated);
    }
  }
  console.log(`result = ${JSON.stringify(result)}`);
  return result;
};