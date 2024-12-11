const fs = require('node:fs');
const data = fs.readFileSync('9.txt', 'utf8');

// convert to disk
const diskMap = [];
let file = true;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < parseInt(data[i]); j++) {
    diskMap.push(file ? i / 2 : '.');
  }
  file = !file;
}

/* Task 1 */
// // from back
// let startIndex = 0;
// outer: for (let i = diskMap.length - 1; i > 0; i--) {
//   // find first empty space from back
//   if (startIndex === i) break;
//   if (diskMap[i] === '.') continue;

//   // find first empty space from start
//   while (startIndex < diskMap.length) {
//     startIndex++;
//     if (startIndex === i) break outer;
//     if (diskMap[startIndex] === '.') {
//       // switch values
//       const tmp = diskMap[startIndex];
//       diskMap[startIndex] = diskMap[i];
//       diskMap[i] = tmp;
//       break;
//     }
//   }
//   // console.log(diskMap.join(''));
// }

/* Task 2 */
dataCopy = data.split('').map(Number);
// console.log(dataCopy);
let diskMapIndexRight = diskMap.length;
for (let right = dataCopy.length - 1; right > 0; right--) {
  diskMapIndexRight -= dataCopy[right];
  if (right % 2 !== 0) continue; // if is not file, continue

  // console.log(right);
  // console.log(diskMap.join(''));

  let lastFreeSpace = null;
  for (let left = 0; left <= diskMapIndexRight; left++) {
    // console.log("for left", left, lastFreeSpace, diskMap[left], dataCopy[right])
    if (lastFreeSpace === null && diskMap[left] === '.') lastFreeSpace = left;
    if (lastFreeSpace !== null && diskMap[left] !== '.') {
      if (left - lastFreeSpace >= dataCopy[right]) {
        // console.log("found spot", lastFreeSpace, left, right, diskMap[left], dataCopy[right])
        // write at the free space
        for (let i = lastFreeSpace; i < lastFreeSpace + dataCopy[right]; i++) {
          diskMap[i] = diskMap[diskMapIndexRight];
        }
        // clear end
        for (
          let i = diskMapIndexRight;
          i < diskMapIndexRight + dataCopy[right];
          i++
        ) {
          diskMap[i] = '.';
        }
        
        break;
      }
      lastFreeSpace = null;
    }
  }

  // let diskMapIndexLeft = 0;
  // for (let left = 0; left < right; left++) {
  //   diskMapIndexLeft +=
  //   if (left % 2 !== 1) continue; // if is not free space, continue
  //   if (dataCopy[left] <= dataCopy[right]) {
  //     // update indexes
  //     dataCopy[left] -= dataCopy[right]
  //     // update on diskMap
  //     for (let i = 0; )
  //   }
  // }
}
// console.log(diskMap)
// result
console.log(
  diskMap.reduce((acc, val, i) => acc + (val === '.' ? 0 : parseInt(val) * i))
);
// console.log(diskMap.join(''));
