const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const nCr = (arr, data, start, end, index, r) => {
//   if(index === r) {
//     console.log(data.filter((e, idx) => idx < r).join(' '));
//   }
//   for(let i = start; i <= end && i <= end + index + 1 - r; i++) {
//     data[index] = arr[i];
//     nCr(arr, data, i + 1, end, index + 1, r);
//   }
// };


let input = [];
let arr = [];
let data = null;
let n = 0;
let r = 0;
rl.on('line', i => {
  input.push(i);
}).on('close', () => {
  const nr = input[0].split(' ');
  n = Number(nr[0]);
  r = Number(nr[1]);
  arr.push(...input[1].split(' ').map(e => { return Number(e); }));
  data = new Array(r);
  nCr(arr, data, 0, n - 1, 0, r);
});

const nCr = (arr, data, start, end, index, r) => {
  if(index === r) {
    console.log(data.filter((e, idx) => idx < r).join(' '));
  }
  for(let i = start; i <= end && i <= end + index + 1 - r; i++) {
    data[index] = arr[i];
    nCr(arr, data, i + 1, end, index + 1, r);
  }
};