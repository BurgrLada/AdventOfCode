const fs = require('node:fs');
const data = fs.readFileSync('2.txt', 'utf8');

const reports = data.split('\n');

let sum = 0;
for (report of reports) {
  const nums = report.split(' ').map(Number);
  sum += isIncreasingDecreasingTolerable(nums) ? 1 : 0;
}

function isIncreasingDecreasing(nums) {
  let last = nums[0];
  const increasing = nums[0] < nums[1];
  for (let i = 1; i < nums.length; i++) {
    const difference = nums[i] - last;
    last = nums[i];
    if (
      Math.abs(difference) >= 1 &&
      Math.abs(difference) <= 3 &&
      (increasing ? difference > 0 : difference < 0)
    )
      continue;
    else return false;
  }
  return true;
}

function isIncreasingDecreasingTolerable(nums) {
  let last = nums[0];
  const increasing = nums[0] < nums[1];
  for (let i = 1; i < nums.length; i++) {
    const difference = nums[i] - last;
    last = nums[i];
    if (
      Math.abs(difference) >= 1 &&
      Math.abs(difference) <= 3 &&
      (increasing ? difference > 0 : difference < 0)
    )
      continue;
    else {
      return (
        isIncreasingDecreasing([...nums.slice(0, i - 1), ...nums.slice(i)]) ||
        isIncreasingDecreasing([...nums.slice(0, i), ...nums.slice(i + 1)]) ||
        isIncreasingDecreasing([...nums.slice(0, i + 1), ...nums.slice(i + 2)])
      );
    }
  }
  return true;
}

console.log(sum);

/* chatgpt tries: */
function countSafeReportsPart1(reports) {
    const isSafe = (levels) => {
        const n = levels.length;

        // Check for either all increasing or all decreasing
        let increasing = true, decreasing = true;
        for (let i = 1; i < n; i++) {
            const diff = levels[i] - levels[i - 1];
            if (diff < 1 || diff > 3) return false; // Adjacent difference rule violated
            if (diff > 0) decreasing = false; // Not decreasing
            if (diff < 0) increasing = false; // Not increasing
        }
        return increasing || decreasing;
    };

    return reports.filter(isSafe).length;
}

function countSafeReportsPart2(reports) {
    const isSafe = (levels) => {
        const n = levels.length;

        // Check if the array is safe
        const check = (arr) => {
            let increasing = true, decreasing = true;
            for (let i = 1; i < arr.length; i++) {
                const diff = arr[i] - arr[i - 1];
                if (diff < 1 || diff > 3) return false; // Adjacent difference rule violated
                if (diff > 0) decreasing = false; // Not decreasing
                if (diff < 0) increasing = false; // Not increasing
            }
            return increasing || decreasing;
        };

        // Check original array
        if (check(levels)) return true;

        // Try removing each level
        for (let i = 0; i < n; i++) {
            const modified = levels.slice(0, i).concat(levels.slice(i + 1));
            if (check(modified)) return true;
        }

        return false;
    };

    return reports.filter(isSafe).length;
}

console.log(countSafeReportsPart1(reports.map((row) => row.split(" ").map(Number))))
console.log(countSafeReportsPart2(reports.map((row) => row.split(" ").map(Number))))