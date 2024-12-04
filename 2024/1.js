const fs = require('node:fs');
const data = fs.readFileSync('1.txt', 'utf8');

const rows = data.split('\n');

const fst = [],
  snd = [];

for (row of rows) {
  fst.push(row.split('   ')[0]);
  snd.push(row.split('   ')[1]);
}

function findMin(arr) {
  let min, minIndex;
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (min === undefined && num !== null) {
      min = num;
      minIndex = i;
      continue;
    }
    if (num !== null && num < min) {
      min = num;
      minIndex = i;
    }
  }
  if (minIndex !== undefined) arr[minIndex] = null;
  return min;
}

function getSum(fst, snd) {
  let sum = 0;
  let i = 0;
  while (true) {
    const smallest1 = findMin(fst);
    const smallest2 = findMin(snd);
    if (smallest1 && smallest2) {
      sum += Math.abs(smallest1 - smallest2);
    } else {
      break;
    }
  }

  return sum;
}

// console.log(getSum([...fst], [...snd]));

function getSimilarity(fst, snd) {
    let sum = 0;
    for (let i = 0; i < fst.length; i++) {
        sum += fst[i] * snd.filter((num) => num === fst[i]).length
    }
    return sum;
}

console.log(getSimilarity([...fst], [...snd]))
