const fs = require('node:fs');
const data = fs.readFileSync('10_tmp.txt', 'utf8');

const lines = data.split('\n');

let score = 0;
let rating = 0;
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    if (lines[i][j] === '0') {
      score += checkTrailheadScore(i, j).length;
      rating += checkTrailheadRating(i, j);
    }
  }
}

console.log(score);
console.log(rating);

function checkBounds(i, j) {
  return i >= 0 && i < lines.length && j >= 0 && j < lines[0].length;
}

function checkTrailheadScore(i, j) {
  if (lines[i][j] === '.') return []; // for checking on example solutions
  if (lines[i][j] === '9') return [[i, j]];

  const currHeight = parseInt(lines[i][j]);
  const positions = [];
  for (v of [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
  ]) {
    if (
      checkBounds(v[0], v[1]) &&
      parseInt(lines[v[0]][v[1]]) - currHeight === 1
    ) {
      const newPositions = checkTrailheadScore(v[0], v[1]);
      positions.push(
        ...newPositions.filter(
          (p1) => !positions.find((p2) => p1[0] === p2[0] && p1[1] === p2[1])
        )
      );
    }
  }
  return positions;
}

function checkTrailheadRating(i, j) {
  if (lines[i][j] === '.') return []; // for checking on example solutions
  if (lines[i][j] === '9') return 1;

  const currHeight = parseInt(lines[i][j]);
  let trails = 0;
  for (v of [
    [i + 1, j],
    [i - 1, j],
    [i, j + 1],
    [i, j - 1],
  ]) {
    if (
      checkBounds(v[0], v[1]) &&
      parseInt(lines[v[0]][v[1]]) - currHeight === 1
    ) {
      trails += checkTrailheadRating(v[0], v[1]);
    }
  }
  return trails;
}
