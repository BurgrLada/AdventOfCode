const fs = require('node:fs');
const data = fs.readFileSync('3.txt', 'utf8');

const lines = data.split('\n');

let sum = 0;

/* task 1 */
const mulRegexp = /mul\((\d){1,3},(\d){1,3}\)/g;

function findMuls(string) {
  let localSum = 0;
  const matches = string.matchAll(mulRegexp);
  for (match of matches) {
    const nums = match[0].slice(4, -1).split(',');
    localSum += nums[0] * nums[1];
  }
  return localSum;
}

// for (line of lines) {
//   sum += findMuls(line);
// }
// console.log(sum);

/* task 2 */
let sum2 = 0;
// const regexp = /mul\((\d){1,3},(\d){1,3}\)/g;
const doRegexp = /(.*?)do\(\)/g;
const dontRegexp = /(.*?)don't\(\)/g;
let allowed = true;

// lines.join(""); -> no effect

for (line of lines) {
  let index = 0;
  while (true) {
    if (allowed) {
      const matches = [...line.slice(index).matchAll(dontRegexp)];
      if (matches.length === 0) {
        sum2 += findMuls(line.slice(index));
        break;
      }
      console.log('allowed', matches, matches[0], matches[0][0]);
      allowed = false;
      sum2 += findMuls(matches[0][0]);
      console.log('adding', matches[0][0], findMuls(matches[0][0]));
      index += matches[0][0].length;
    } else {
      const matches = [...line.slice(index).matchAll(doRegexp)];
      if (matches.length === 0) break;
      console.log('not allowed', matches);
      index += matches[0][0].length;
      allowed = true;
    }
  }
  // const matches = line.matchAll(regexp);
  // for (match of matches) {
  //   const nums = match[0].slice(4, -1).split(',');
  //   sum += nums[0] * nums[1];
  //   console.log(match[0].slice(4, -1));
  // }
}
console.log(sum2);
