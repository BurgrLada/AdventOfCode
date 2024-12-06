const fs = require('node:fs');
const data = fs.readFileSync('6.txt', 'utf8');

const lines = data.split('\n');

const map = [];
for (line of lines) {
  map.push(line.split(''));
}
// console.log(map.map((l) => l.join('')).join('\n'));

// expecting start to be '^'
let start;
outter: for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === '^') {
      start = [i, j];
      break outter;
    }
  }
}

const checkBounds = (pos) =>
  pos[0] >= 0 && pos[0] < map.length && pos[1] >= 0 && pos[1] < map.length;

const moveTop = (guard) => [guard[0] - 1, guard[1]];
const moveRight = (guard) => [guard[0], guard[1] + 1];
const moveDown = (guard) => [guard[0] + 1, guard[1]];
const moveLeft = (guard) => [guard[0], guard[1] - 1];

function task1(guard) {
  let sum = 1;
  map[guard[0]][guard[1]] = 'X';
  let facing = 0; // 0 ~ 'TOP', 1 ~ 'RIGHT', 2 ~ 'BOTTOM', 3 ~ 'DOWN'
  while (true) {
    let newPosition;
    switch (facing) {
      case 0:
        newPosition = moveTop(guard);
        break;
      case 1:
        newPosition = moveRight(guard);
        break;
      case 2:
        newPosition = moveDown(guard);
        break;
      case 3:
        newPosition = moveLeft(guard);
        break;
    }

    if (!checkBounds(newPosition)) break;
    const steppingStone = map[newPosition[0]][newPosition[1]];
    if (steppingStone === '#') {
      facing += 1;
      facing %= 4;
    } else {
      if (steppingStone === '.') sum++;
      map[newPosition[0]][newPosition[1]] = 'X';
      guard = newPosition;
    }
  }

  console.log(sum);
}

// task1([...start]);

function isInLoop(map, guard) {
  let facing = 0; // 0 ~ 'TOP', 1 ~ 'RIGHT', 2 ~ 'BOTTOM', 3 ~ 'DOWN'
  let loopPossibility = false;
  while (true) {
    let newPosition;
    switch (facing) {
      case 0:
        newPosition = moveTop(guard);
        break;
      case 1:
        newPosition = moveRight(guard);
        break;
      case 2:
        newPosition = moveDown(guard);
        break;
      case 3:
        newPosition = moveLeft(guard);
        break;
    }

    if (!checkBounds(newPosition)) break;
    const nextStep = map[newPosition[0]][newPosition[1]];

    // check loop
    if (loopPossibility && nextStep === '#') return true;
    else loopPossibility = false;
    if (nextStep === '+') loopPossibility = true;

    if (nextStep === '#') {
      map[guard[0]][guard[1]] = '+';
      facing += 1;
      facing %= 4;
    } else {
      if (map[guard[0]][guard[1]] !== '+') {
        if (facing % 2 === 0 && map[guard[0]][guard[1]] == '-')
          map[guard[0]][guard[1]] = '+';
        else if (facing % 2 === 1 && map[guard[0]][guard[1]] == '|')
          map[guard[0]][guard[1]] = '+';
        else if (facing % 2 === 0) map[guard[0]][guard[1]] = '|';
        else if (facing % 2 === 1) map[guard[0]][guard[1]] = '-';
      }
      guard = newPosition;
    }
  }
  return false;
}

function task2() {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === '.') {
        const modifiedMap = structuredClone(map);
        modifiedMap[i][j] = '#';
        if (isInLoop(modifiedMap, [...start])) {
          sum++;
        }
      }
    }
  }
  console.log(sum);
}

task2();

// isInLoop(map, start);
