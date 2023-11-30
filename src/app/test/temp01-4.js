const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const nCrSum = (arr, temp, start, remaining) => { // 백트래킹
//   for(let i = start; i < arr.length && arr[i] <= remaining; i++) {
//     const toAdd = [ ...temp, arr[i] ]; // arr[i]가 조건에 맞으면 temp 배열에 추가
//     if(arr[i] === remaining) {
//       if(!combinations.has(JSON.stringify(toAdd))) { // 문자열화해서 비교해야 함! 안그러면 비교 인식 불가.
//         combinations.add(JSON.stringify(toAdd));
//       }
//     } else {
//       nCrSum(arr, toAdd, i, remaining - arr[i]);
//     }
//   }
// };


let input = [];
let arr = [];
let sum = 0;
let nth = 0;
let combinations = new Set();
let caseCntSmallest = { cnt: Infinity, case: null };
rl.on('line', i => {
  input.push(i);
}).on('close', () => {
  const sNth = input[0].split(' ');
  sum = Number(sNth[0]);
  nth = Number(sNth[1]);
  arr.push(...input[1].split(' ').map(e => { return Number(e); }).sort((a, b) => { return a - b; }));
  nCrSum(arr, [], 0, sum);
  // console.log(combinations);
  console.log(caseCntSmallest);
});

const nCrSum = (arr, temp, start, remaining) => {   
  for(let i = start; i < arr.length && arr[i] <= remaining; i++) {
    const toAdd = [ ...temp, arr[i] ];
    if(arr[i] === remaining) {
      if(!combinations.has(JSON.stringify(toAdd))) {
        combinations.add(JSON.stringify(toAdd));
        if(toAdd.length < caseCntSmallest.cnt) {
          caseCntSmallest.cnt = toAdd.length;
          caseCntSmallest.case = [ ...toAdd ];
        }
      }
    } else {
      nCrSum(arr, toAdd, i, remaining - arr[i]);
    }
  }
};