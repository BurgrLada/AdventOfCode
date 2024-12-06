const fs = require('node:fs');
const data = fs.readFileSync('5.txt', 'utf8');

const lines = data.split('\n');

let sum = 0;

const rules = [];
let addingRules = true;
for (const line of lines) {
  if (line === '') {
    addingRules = false;
    continue;
  }
  if (addingRules) {
    rules.push(line.split('|'));
  } else {
    // task 1:
    // sum += checkLine(line);

    // task 2:
    sum += checkLine2(line);
  }
}

function checkLine(line) {
  const chars = line.split(',');
  for (const index in chars) {
    // (premise: each number is unique in the line)
    if (
      rules.find((r) => {
        const ruleIndex = chars.findIndex((v) => v === r[1]);
        return r[0] === chars[index] && ruleIndex !== -1 && ruleIndex < index;
      })
    )
      return 0;
  }
  return parseInt(chars[Math.floor(chars.length / 2)]);
}

function checkLine2(line) {
  const chars = line.split(',');
  if (breaksRules(chars)) {
    while (breaksRules(chars)) {
      fixOrder(chars);
    }
    return parseInt(chars[Math.floor(chars.length / 2)]);
  }
  return 0;
}

function breaksRules(chars) {
  for (const index in chars) {
    if (
      rules.find((r) => {
        const ruleIndex = chars.findIndex((v) => v === r[1]);
        return r[0] === chars[index] && ruleIndex !== -1 && ruleIndex < index;
      })
    ) {
      return true;
    }
  }
  return false;
}

function fixOrder(chars) {
  for (const index in chars) {
    rules.find((r) => {
      const ruleIndex = chars.findIndex((v) => v === r[1]);
      if (r[0] === chars[index] && ruleIndex !== -1 && ruleIndex < index)
        swapElements(chars, index, ruleIndex);
    });
  }
}

function swapElements(arr, i, j) {
  const x = arr[i];
  arr[i] = arr[j];
  arr[j] = x;
}

console.log(sum);
