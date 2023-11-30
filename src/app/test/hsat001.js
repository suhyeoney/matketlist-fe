const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n = 0;
let q = 0;
let arrRatio = [];
let arrQuery = [];

rl.on('line', input1 => {
  input.push(input1);
}).on('close', () => {
  const splittedFirst = input[0].split(' ');
  n = Number(splittedFirst[0]);
  q = Number(splittedFirst[1]);
  const splittedSecond = input[1].split(' ');
  arrRatio = [ ...splittedSecond.map(e => { 
    const num = Number(e);
    return num;
  }) ].sort((a, b) => { 
    return a - b; 
  });
  const rest = input.filter((e, idx) => idx !== 0 && idx !== 1).map(e => { 
    const num = Number(e);   
    return num;
  });
  arrQuery.push(...rest);
//   console.log(`n = ${n} q = ${q}`);
//   console.log(`arrRatio = ${JSON.stringify(arrRatio)}`);
//   console.log(`arrQuery = ${JSON.stringify(arrQuery)}`);


  for(let i = 0; i < q; i++) {
    const query = arrQuery[i];
    let result = 0;
    let index = doBinarySearch(query);
    if(index > 0) { // 어차피 중앙값인지 여부를 확인하는 것이므로 배열의 맨 첫번째(index = 0)는 안봐도 됨.
      result = index * (n - index - 1);
    }
    console.log(result);
  }

});

const doBinarySearch = (query) => {
  let leftIndex = 0;
  let rightIndex = arrQuery.length - 1;
  while(leftIndex <= rightIndex) {
    let middleIndex = parseInt((leftIndex + rightIndex) / 2);
    if(arrRatio[middleIndex] === query) {
      return middleIndex;
    } else if(arrRatio[middleIndex] < query) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }
  return -1;
};