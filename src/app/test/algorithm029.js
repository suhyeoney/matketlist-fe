const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let arrData = Array(0);
let arrTofind = Array(0);

rl.question('', input1 => {
  const arrInput1 = input1.split(''); 
  arrData = Array(Number(arrInput1[0]));
  endIndex = Number(arrInput1[0]) - 1;
  rl.question('', input2 => {
    const arrInput2 = input2.split(' ').map(e => {
      let el = 0;
      el = Number(e);
      return el;
    });
    arrData = [ ...arrInput2 ];
    arrData.sort((a, b) => {
      return a - b;
    });
    rl.question('', input3 => {
      const arrInput3 = input3.split('');
      arrTofind = Array(Number(arrInput3[0]));
      rl.question('', input4 => {
        const arrInput4 = input4.split(' ').map(e => {
          let el = 0;
          el = Number(e);
          return el;
        });
      arrTofind = [ ...arrInput4 ];
      console.log(`arrData: ${JSON.stringify(arrData)}`);
      console.log(`arrToFind: ${JSON.stringify(arrTofind)}`);
      
      for(let i = 0; i < arrTofind.length; i++) {
        let M = 0;
        let Mindex = 0;
        let startIndex = 0;
        let endIndex = arrData.length - 1;
        let result = 0;
        while(startIndex <= endIndex) { // start와 end의 간격이 점점 좁아지면서 같아지는 순간 루프종료
          const middleIndex = parseInt((startIndex + endIndex) / 2); // (startIndex + endIndex) / 2 결과 전체에 parseInt를 씌워줘야 함. 안그러면 소수 인덱스가 나옴;;
          if(arrTofind[i] < arrData[middleIndex]) { // 찾고자 하는 값이 중간값보다 작으면 > (중간값보다 큰 범위는 볼 필요가 없음) >  end 인덱스를 중간값 인덱스 - 1로 변화시킴
            endIndex = middleIndex - 1;
          } else if(arrTofind[i] > arrData[middleIndex]) { // 찾고자 하는 값이 중간값보다 크면 > (중간값보다 작은 범위는 볼 필요가 없음) >  start 인덱스를 중간값 인덱스 + 1로 변화시킴
            startIndex = middleIndex + 1;
          } else { // arrToFind[i]와 M이 같으면 해당 값을 찾은 것!
            // console.log(`arrToFind[${i}] = ${arrTofind[i]}`);
            // console.log(`arrData[${middleIndex}] = ${arrData[middleIndex]}`);
            result = 1;
            break;
          }
        }
        console.log(`result = ${result}`);
      }
      rl.close();
      });
    });
  });
  // BS 탐색
});

rl.on('close', () => {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});