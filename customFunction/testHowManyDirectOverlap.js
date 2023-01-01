const a = require("./localRunCustomFunction.js");

const iterations = 10000;
let count = 0;
console.time("totalScriptRuntime")
for (let i = 0; i < iterations; i++) {
  const aResults = a();
  if (aResults.numDirectOverlaps > 0) { // || aResults.noLuck > 0) {
    count++;
    // console.log("numDirectOverlaps:", aResults.numDirectOverlaps);
    // console.log("noLuck:", aResults.noLuck);
    // console.log("positionsSorted:", aResults.positionsSorted);
  }
}
console.log("count:", count);
console.log("% with overlap:", count / iterations * 100);
console.timeEnd("totalScriptRuntime")
