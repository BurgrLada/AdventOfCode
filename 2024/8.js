const fs = require('node:fs');
const data = fs.readFileSync('8.txt', 'utf8');

const lines = data.split('\n');

// create map copy for antinode visualization
const mapCopy = [];

const antennas = {};
for (let i = 0; i < lines.length; i++) {
  mapCopy[i] = [];
  for (let j = 0; j < lines[0].length; j++) {
    mapCopy[i][j] = '.';
    const char = lines[i][j];
    if (char !== '.') {
      mapCopy[i][j] = '#'; // only for task 2!
      if (antennas[char]) {
        antennas[char].push([i, j]);
      } else {
        antennas[char] = [[i, j]];
      }
    }
  }
}

// console.log(mapCopy);
// console.log(antennas);

const checkBounds = (y, x) =>
  y >= 0 && y < lines.length && x >= 0 && x < lines[0].length;

// task 1
for (antennaType in antennas) {
  const antennaArray = antennas[antennaType];
  // each one with each one pairing
  for (let i = 0; i < antennaArray.length; i++) {
    for (let j = i + 1; j < antennaArray.length; j++) {
      const antenna1 = antennaArray[i];
      const antenna2 = antennaArray[j];
      const xDiff = Math.abs(antenna1[1] - antenna2[1]);
      const yDiff = Math.abs(antenna1[0] - antenna2[0]);
      const newAntinodeFrom1 = [
        antenna1[0] > antenna2[0] ? antenna1[0] + yDiff : antenna1[0] - yDiff,
        antenna1[1] > antenna2[1] ? antenna1[1] + xDiff : antenna1[1] - xDiff,
      ];
      const newAntinodeFrom2 = [
        antenna2[0] > antenna1[0] ? antenna2[0] + yDiff : antenna2[0] - yDiff,
        antenna2[1] > antenna1[1] ? antenna2[1] + xDiff : antenna2[1] - xDiff,
      ];
      if (checkBounds(newAntinodeFrom1[0], newAntinodeFrom1[1])) {
        mapCopy[newAntinodeFrom1[0]][newAntinodeFrom1[1]] = '#';
      }
      if (checkBounds(newAntinodeFrom2[0], newAntinodeFrom2[1])) {
        mapCopy[newAntinodeFrom2[0]][newAntinodeFrom2[1]] = '#';
      }
    }
  }
}

// task 2
for (antennaType in antennas) {
  const antennaArray = antennas[antennaType];
  // each one with each one pairing
  for (let i = 0; i < antennaArray.length; i++) {
    for (let j = i + 1; j < antennaArray.length; j++) {
      const antenna1 = antennaArray[i];
      const antenna2 = antennaArray[j];
      const xDiff = Math.abs(antenna1[1] - antenna2[1]);
      const yDiff = Math.abs(antenna1[0] - antenna2[0]);
      let amplifier = 1;
      while (true) {
        let newAntinodeFrom1 = [
          antenna1[0] > antenna2[0]
            ? antenna1[0] + yDiff * amplifier
            : antenna1[0] - yDiff * amplifier,
          antenna1[1] > antenna2[1]
            ? antenna1[1] + xDiff * amplifier
            : antenna1[1] - xDiff * amplifier,
        ];
        if (checkBounds(newAntinodeFrom1[0], newAntinodeFrom1[1])) {
          mapCopy[newAntinodeFrom1[0]][newAntinodeFrom1[1]] = '#';
        } else {
          break;
        }
        amplifier++;
      }
      amplifier = 1;
      while (true) {
        let newAntinodeFrom2 = [
          antenna2[0] > antenna1[0]
            ? antenna2[0] + yDiff * amplifier
            : antenna2[0] - yDiff * amplifier,
          antenna2[1] > antenna1[1]
            ? antenna2[1] + xDiff * amplifier
            : antenna2[1] - xDiff * amplifier,
        ];
        if (checkBounds(newAntinodeFrom2[0], newAntinodeFrom2[1])) {
          mapCopy[newAntinodeFrom2[0]][newAntinodeFrom2[1]] = '#';
        } else {
          break;
        }
        amplifier++;
      }
    }
  }
}

console.log(mapCopy.map((l) => l.join('')).join('\n'));

// sum all antinodes on the map
console.log(
  mapCopy.reduce(
    (acc, curr) =>
      acc + curr.reduce((acc, curr) => (curr === '#' ? acc + 1 : acc), 0),
    0
  )
);
