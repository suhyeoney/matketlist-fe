const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', input1 => {
  input.push(input1);
}).on('close', () => {
  const ab = input[0].split(' ');
  let a = Number(ab[0]);
  let b = Number(ab[1]);
  
  if(a > b) {
    console.log(`a = ${ (a | b) ^ a } b = ${ (a | b) ^ b }`);
  } else {
    console.log(`a = ${ a ^ (a | b) } b = ${ b ^ (a | b) }`);
  }
});