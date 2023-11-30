const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let tempList =  []; 
let ans = null;
let answer = '';

rl.on('line', input1 => {
  input.push(input1);
}).on('close', () => {
  const str = input[0].split('');
  console.log(str);
  // let now = 0, next = 0;
  // for(let i = 0; i < str.length; i++) {
  //   if(i < next) {
  //     continue;
  //   }
  //   let partial = str[i];
  //   now = i, next = i + 1;
  //   console.log(now, next);
  //   while(now <= next) {
  //     if(str[now] === str[next]) {
  //       console.log(`str[${now}]`, str[now]);
  //       console.log(`str[${next}]`, str[next]);
  //       console.log(`before partial`, partial);
  //       partial += str[next];
  //       next++;
  //       console.log(now, next);
  //     } else {
  //       if(partial.length > 0) {
  //         tempList.push(partial);
  //       }
  //       break;
  //     }
  //   }
  // }
  // console.log(tempList);
  // const cntObj = tempList.reduce((a, i) => { 
  //   return a[i] = (a[i] || 0) + 1, a
  // }, {});
  // console.log(cntObj);
  // answer = Object.keys(cntObj).filter(key => cntObj[key] >= 2).map(e => { 
  //   return e.charAt(0) }).sort().join('');
  // console.log(answer.length > 0 ? answer : 'N');


  tempList.push(str[0]);
  for(let s of str) {
    if(s !== tempList[tempList.length - 1]) {
      tempList.push(s);
    }
  }
  console.log(tempList);
  ans = new Set(tempList);
  ans = [ ...ans ].sort();
  for(let s of ans) {
    let cnt = 0;
    for(let t of tempList) {
      if(s === t) {
        cnt++;
      }
    }
    if(cnt >= 2) {
      answer += s;
    }
  }
  if(answer.length === 0) {
    answer = 'N';
  }
  console.log(answer);
});  