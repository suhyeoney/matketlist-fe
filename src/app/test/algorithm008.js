const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let result = 0;

rl.question('', input1 => {
  const N = Number(input1);
  arrData = Array(N);
  rl.question('', input2 => {
    const arrInput2 = input2.split(' ').map(e => {
      let el = 0;
      el = Number(e);
      return el;
    });
    arrData = [ ...arrInput2 ];
    arrData.sort((a, b) => { // 오름차순으로 정렬
      return a - b;
    });
    console.log(`arrInput=${JSON.stringify(arrData)}`);

    for(let k = 0; k < N; k++) {
      let find =  arrData[k];
      let i = 0; // 맨 처음
      let j = N - 1; // 맨 마지막
      while(i < j) {
        console.log(`k: ${k} i: ${i} j: ${j}`);
        if(arrData[i] + arrData[j] === find) {
          if(i !== k && j !== k) {
            // 더하는 대상 두 값 중 하나라도 자기 자신이 들어가 있으면 안된다.
            // i, j 중 하나라도 자기 자신의 인덱스(현재 기준이 되는 인덱스 k)와 같다면 i, j를 증가 또는 감소시켜 나가야 함.
            result++;
            break;
          } else if(i == k) {
            i++;
          } else if(j == k) {
            j--;
          }
        } else if(arrData[i] + arrData[j] < find) { 
          // 상식적으로 생각해보자. 두 수를 더했는데 기준값 find보다 작다면
          // 맨 처음 인덱스 i값을 증가시켜 두 수의 합을 증가시켜 나가야 find 값에 가까워진다. 그래서 i를 증가시킴.
          i++;
        } else {
          // 반대로, 두 수를 더했는데 기준값 find보다 크다면
          // 맨 마지막 인덱스 j값을 감소시켜 두 수의 합을 감소시켜 나가야 find 값에 가까워진다. 그래서 j를 감소시킴.
          j--;
        }
      }
      console.log(`##### result = ${ result }`);
    }
    console.log(result);
    rl.close();
  });
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});