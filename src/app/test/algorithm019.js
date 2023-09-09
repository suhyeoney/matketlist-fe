const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrResult = Array(0);
let K = 0;

rl.question('', async input1 => {
  const arrInput1 = input1.split(' ');
  arrData = Array(Number(arrInput1[0]));
  arrResult = Array(Number(arrInput1[0]));
  K = Number(arrInput1[1]);
  rl.question('', input2 => {
    // 주의!!! split 후 '바로' map 처리 해줘야 함. 안그러면, 다시 string형으로 되돌아감...
    const arrInput2 = input2.split(' ').map(e => {
      let el = 0;
      el = Number(e);
      return el;
    });
    arrData = [ ...arrInput2 ]; 

    arrResult = quickSort(arrData, 0, arrData.length - 1);

    console.log(`arrData = ${JSON.stringify(arrData)}`);
    console.log(`result = ${arrResult[K - 1]}`);
    rl.close();
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

// 퀵 정렬은 스왑(swap) + 분할(partition) + 실제 정렬(quickSort) 세 가지 프로세스로 수행됨.

const swap = (arr, leftIndex, rightIndex) => { // 당연히 left값이 right값보다 클 때 swap을 진행함.
  let temp = 0;
  temp = arr[leftIndex];
  arr[leftIndex] = arr[rightIndex];
  arr[rightIndex] = temp;
  console.log(`### current array status after swapped : ${arr}`);
};
const partition = (arr, leftIndex, rightIndex) => {
  let pivot = arr[parseInt((leftIndex + rightIndex) / 2)];
  console.log(`pivot: ${pivot}`);
  let i = leftIndex;
  let j = rightIndex;
  while(i <= j) {
    while(arr[i] < pivot) { // 피벗의 왼쪽
      i++;
    }
    while(arr[j] > pivot) { // 피벗의 오른쪽
      j--;
    }
    while(i <= j) { // start와 end가 서로 교차하려는 순간 > 서로 스왑 후, 인덱스 각자 갈길 계속 감.
      console.log(`is going to swap!!!! i: ${i}, j: ${j}`);
      swap(arr, i, j);
      i++; 
      j--;
    }
  }
  // i와 j가 서로 교차해 i가 j보다 클 때 루프를 종료하며, 이 때의 i를 리턴함.
  console.log(`i and j value after partition() loop finished: (${i}, ${j})`);
  return i; // start 리턴
};

const quickSort = (arr, leftIndex, rightIndex) => {
  let pivotIndex = 0;
  if(arr.length > 1) {
    pivotIndex = partition(arr, leftIndex, rightIndex); // 피벗을 기준으로 왼쪽과 오른쪽 그룹으로 분할.
    if(leftIndex < pivotIndex - 1) { // 피벗은 제외하고 고려함.
      console.log(`leftIndex < pivotIndex - 1 ===> ${leftIndex} ~ ${pivotIndex - 1}`);
      quickSort(arr, leftIndex, pivotIndex - 1); // start부터 피벗 전까지의 범위
    }
    if(pivotIndex < rightIndex) { // 피벗부터 end까지의 범위
      console.log(`pivotIndex < rightIndex ===> ${pivotIndex} ~ ${rightIndex}`);
      quickSort(arr, pivotIndex, rightIndex);
    }
  }
  console.log(`##### current array status: ${arr}`);
  return arr;
};
