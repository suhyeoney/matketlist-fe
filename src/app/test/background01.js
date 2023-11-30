function solution(wallpaper) {
  let pos = [ 50, 50, 0, 0 ], 
      // lux, luy, rdx, rdy
      // (lux, luy)는 범위의 첫부분(min), (rdx, rdy)는 범위의 끝부분(max)이므로
      // min, max 업데이트를 위해 초기값을 각각 50, 0으로 줘야 함.
      arr = [ ...wallpaper ];
  // 이중for문 구성 시, 오른쪽에서 왼쪽 순으로 순회하는 것이 빠름. (e.g. arr[i][j] : j > i 순으로)
  for(let j = 0; j < arr[0].length; j++) {
      for(let i = 0; i < arr.length; i++) {
          if(arr[i][j] === '#') {
              pos[0] = min(pos[0], i);
              pos[1] = min(pos[1], j);
              pos[2] = max(pos[2], i + 1);
              pos[3] = max(pos[3], j + 1);
          }
      }
  }
  
  return pos;
}

const min = (a, b) => {
  return a < b ? a : b;
};

const max = (a, b) => {
  return a > b ? a : b;
};



function solution(wallpaper) {
  let pos = [ wallpaper.length, wallpaper[0].length, 0, 0 ], 
      // lux, luy, rdx, rdy
      // (lux, luy)는 범위의 첫부분(min), (rdx, rdy)는 범위의 끝부분(max)이므로
      // min, max 업데이트를 위해 초기값을 각각 50, 0으로 줘야 함.
      arr = [ ...wallpaper ];
  // 이중for문 구성 시, 오른쪽에서 왼쪽 순으로 순회하는 것이 빠름. (e.g. arr[i][j] : j > i 순으로)
  // for(let j = 0; j < arr[0].length; j++) {
  //     for(let i = 0; i < arr.length; i++) {
  //         if(arr[i][j] === '#') {
  //             pos[0] = min(pos[0], i);
  //             pos[1] = min(pos[1], j);
  //             pos[2] = max(pos[2], i + 1);
  //             pos[3] = max(pos[3], j + 1);
  //         }
  //     }
  // }
  for(let iStart = 0; iStart < arr.length; iStart++) {
      if(arr[iStart].includes('#')) {
          pos[0] = iStart;
          break;
      }
  }
  for(let iEnd = arr.length - 1; iEnd >= 0; iEnd--) {
      if(arr[iEnd].includes('#')) {
          pos[2] = iEnd + 1;
          break;
      }
  }
  
  for(let jStart = 0; jStart < arr[0].length; jStart++) {
      let flag = false;
      for(let k = 0; k < arr.length; k++) {
          if(arr[k][jStart] === '#') {
              pos[1] = jStart;
              flag = true;
              break;
          }
      }
      if(flag) break;
  }
  for(let jEnd = arr[0].length - 1; jEnd >= 0; jEnd--) {
      let flag = false;
      for(let k = 0; k < arr.length; k++) {
          if(arr[k][jEnd] === '#') {
              pos[3] = jEnd + 1;
              flag = true;
              break;
          }
      }
      if(flag) break;
  }
  console.log(pos);
  return pos;
}