const fs = require('node:fs');
const data = fs.readFileSync('4.txt', 'utf8');

const lines = data.split('\n');

let sum = 0;

/* task 1 */
// const WORD = 'XMAS';
// for (let y = 0; y < lines.length; y++) {
//   for (let x = 0; x < lines[y].length; x++) {
//     // console.log('checking', y, x, lines[y][x]);
//     if (lines[y][x] === WORD[0]) {
//       for (let i = -1; i <= 1; i++) {
//         jloop: for (let j = -1; j <= 1; j++) {
//           // console.log("j, i: checking to move to", j, i)
//           for (let length = 1; length < WORD.length; length++) {
//             const moveY = y + j * length;
//             const moveX = x + i * length;
//             // check boundaries
//             if (
//               moveY < 0 ||
//               moveY >= lines.length ||
//               moveX < 0 ||
//               moveX >= lines.length
//             )
//               continue jloop;

//               // console.log("x, y: checking to move to", moveY, moveX)
//             // check word
//             if (lines[moveY][moveX] !== WORD[length]) continue jloop;
//           }
//           sum++;
//           // console.log('adding', x, y);
//         }
//       }
//     }
//   }
// }
// console.log('sum', sum);

function check(x, y) {
  return (x === 'M' && y === 'S') || (x === 'S' && y === 'M');
}

/* task 2 */
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines[y].length; x++) {
    // console.log('checking', y, x, lines[y][x]);
    if (lines[y][x] === 'A') {
      try {
        if (
          check(lines[y - 1][x - 1], lines[y + 1][x + 1]) &&
          check(lines[y - 1][x + 1], lines[y + 1][x - 1])
        ) {
          sum++;
        }
      } catch (_) {
        // pass;
      }

      // for (let i = -1; i <= 1; i++) {
      //   jloop: for (let j = -1; j <= 1; j++) {
      //     // console.log("j, i: checking to move to", j, i)
      //     for (let length = 1; length < WORD.length; length++) {
      //       const moveY = y + j * length;
      //       const moveX = x + i * length;
      //       // check boundaries
      //       if (
      //         moveY < 0 ||
      //         moveY >= lines.length ||
      //         moveX < 0 ||
      //         moveX >= lines.length
      //       )
      //         continue jloop;

      //         // console.log("x, y: checking to move to", moveY, moveX)
      //       // check word
      //       if (lines[moveY][moveX] !== WORD[length]) continue jloop;
      //     }
      //     sum++;
      //     // console.log('adding', x, y);
      //   }
      // }
    }
  }
}
console.log('sum', sum);
