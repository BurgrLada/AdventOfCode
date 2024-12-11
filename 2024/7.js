const fs = require('node:fs');
const data = fs.readFileSync('7.txt', 'utf8');

const lines = data.split('\n');

let sum = 0;
for (line of lines) {
  const res = parseInt(line.split(': ')[0]);
  const numbers = line.split(': ')[1].split(' ').map(Number);
  if (recursiveCalibrationCheck(numbers, 1, res, numbers[0])) sum += res;
}

function recursiveCalibrationCheck(numbers, index, result, tmpResult) {
  if (index === numbers.length) {
    return tmpResult === result;
  }

  return (
    recursiveCalibrationCheck(
      numbers,
      index + 1,
      result,
      tmpResult + numbers[index]
    ) ||
    recursiveCalibrationCheck(
      numbers,
      index + 1,
      result,
      tmpResult * numbers[index]
    ) ||
    recursiveCalibrationCheck(
      numbers,
      index + 1,
      result,
      tmpResult * 10 ** numbers[index].toString().length + numbers[index]
    )
  );
}

console.log(sum);
