const customFunction = require("./localRunCustomFunction.js");

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
/* Setting the number of times the function will run. */
const iterations = 1;
// const iterations = 100;
// const iterations = 1000;
// const iterations = 10000;
// const iterations = 50000;
// const iterations = 100000;
let count = 0;
async function test() {
  console.time("totalScriptRuntime");
  let arrMaxPos = [];
  let arrMinPos = [];
  for (let i = 0; i < iterations; i++) {
    const customFunctionResults = await customFunction();

    // console.log(JSON.parse(customFunctionResults.renderings)["19"].pos);
    arrMaxPos.push(JSON.parse(customFunctionResults.renderings)["39"].pos);
    arrMinPos.push(JSON.parse(customFunctionResults.renderings)["0"].pos);
    // console.log(JSON.parse(customFunctionResults.renderings));
    // console.log(customFunctionResults);
    // console.log(i);

    if (customFunctionResults.numDirectOverlaps > 0) {
      // || aResults.noLuck > 0) {
      count++;
      // console.log("numDirectOverlaps:", aResults.numDirectOverlaps);
      // console.log("noLuck:", aResults.noLuck);
      // console.log("positionsSorted:", aResults.positionsSorted);
    }
  }
  console.timeEnd("totalScriptRuntime");
  arrMaxPos.sort();
  arrMinPos.sort();
  console.log("max position");
  console.log("  max:", arrMaxPos[arrMaxPos.length - 1]);
  console.log("  min:", arrMaxPos[0]);
  console.log("min position");
  console.log("  max:", arrMinPos[arrMinPos.length - 1]);
  console.log("  min:", arrMinPos[0]);
  console.log("runs:", iterations);
  console.log("count of direct overlaps:", count);
  console.log("% with direct overlap:", (count / iterations) * 100);
}

test();
