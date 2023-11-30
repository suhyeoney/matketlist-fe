const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const  LAST = 9;
let M = 2, N = 1;

rl.on('line', input1 => {
}).on('close', () => {
  
  while(M <= LAST) {
    console.log(`${ M } x ${ N } = ${ M * N }`);
    if(N === LAST) { 
      // 출력 후, N이 9일때에는 다음 단으로 넘어가야 하므로
      // M + 1, N은 0으로 초기화 
      M++;
      N = 0;
    }
    N++; // 모든 라인에 대해서 N을 1씩 증가시켜나감
  }
  
});