const a = require("./localRunCustomFunction.js");

/**
 * Testing so far showing a little under 15% chance of direct overlap
 */

// old numbers
// 10000 ~ 35s
// 50000 ~ 3min
// 14% chance of direct overlap
//
// new numbers
// 10000 ~ 12s
// 50000 ~ 1min
// 4% chance of direct overlap
//
const iterations = 1000;
// const iterations = 10000;
// const iterations = 50000;
// const iterations = 1;
let count = 0;
console.time("totalScriptRuntime");
for (let i = 0; i < iterations; i++) {
  const aResults = a();
  console.log(i);
  if (aResults.numDirectOverlaps > 0) {
    // || aResults.noLuck > 0) {
    count++;
    // console.log("numDirectOverlaps:", aResults.numDirectOverlaps);
    // console.log("noLuck:", aResults.noLuck);
    // console.log("positionsSorted:", aResults.positionsSorted);
  }
}
console.log("runs:", iterations);
console.log("count of direct overlaps:", count);
console.log("% with direct overlap:", (count / iterations) * 100);
console.timeEnd("totalScriptRuntime");
