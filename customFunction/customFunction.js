const crypto = require("crypto");

// calculates a random number to place the col contanining an img
// min value is 0 to keep from going off screen to the left
// max value is 99 since I'm converting this to a percentage
const rndPositionFromLeftForImg = (dvImgWidth) => {
  return Math.max(0, Math.floor(Math.random() * 99 - dvImgWidth));
};

/**
 * It generates a random number between 0 and the window width (technically 99%
 * of window width), and if that number is already in the set, it generates a
 * new number until it finds one that isn't in the set to avoid overlapping
 * but limited to 100 iterations
 * @returns A random number between 0 and the window width minus the width of the
 * image.
 */
const rndPosFromLeftEdgeNumber = (dvColPosSet, dvColPosArray, dvImgWidth) => {
  // pos values are integers from 0 - 100.
  const iterationsToFindLeftPos = 100;
  // initialize rndLeft
  let rndLeft = rndPositionFromLeftForImg(dvImgWidth);

  // keep iterations to 100 just to avoid infinite loop. at that point we'll probably have to overlap. if i really want, I can take the total window width and divide it by the dv img width to get when the whole window width should be filled up. but overlapping could make that tricky since I'm only checking for exact position was already used
  for (let i = 0; i < iterationsToFindLeftPos; i++) {
    // if we already have this position try again, else break out and use that
    // value
    if (dvColPosSet.has(rndLeft)) {
      rndLeft = rndPositionFromLeftForImg(dvImgWidth);
    } else {
      // add to set to try to avoid overlapping
      dvColPosSet.add(rndLeft);
      // add to array to return
      dvColPosArray.push(rndLeft);
    }
  }

  return { dvColPosSet: dvColPosSet, dvColPosArray: dvColPosArray };
};

// convert rnd number to percentage
const rndPosPercFromLeftEdge = () =>
  rndPosFromLeftEdgeNumber().toString() + "%";

const generateDVColPosArrays = (numOfDVs, dvImgWidth) => {
  // fill up DV_COL_POSITIONS
  let posCreated = 0;
  let dvColPosSet = new Set();
  let dvColPosArray = new Array(numOfDVs);

  // fill dvColPosArray while trying to avoid overlap with dvColPosSet keeping
  // track of positions
  while (posCreated < numOfDVs) {
    ({ dvColPosSet, dvColPosArray } = rndPosFromLeftEdgeNumber(
      dvColPosSet,
      dvColPosArray,
      dvImgWidth
    ));
    posCreated++;
  }

  // // Duplicate array but add % to each value
  // let colPosPercs = Array.from(dvColPos);
  // for (let i = 0; i < colPosPercs.length; i++) {
  //   const colPos = colPosPercs[i];
  //   colPosPercs = colPos + "%";
  // }

  return dvColPosArray;
};

const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateCodes = (numOfCodes) => {
  const codes = [];
  for (let i = 0; i < numOfCodes; i++) {
    const code = crypto.randomBytes(256).toString("base64url");
    codes.push(code);
  }

  return codes;
};

const combineCodesAndPosArrayAndImgs = (numOfDVs, codes, dvColPosArray) => {
  // img options
  const ohs = [
    "img0",
    "img00",
    "img000",
    "img0000",
    "img00000",
    "img000000",
    "img0000000",
    "img00000000",
  ];

  const ones = [
    "img1",
    "img11",
    "img111",
    "img1111",
    "img11111",
    "img111111",
    "img1111111",
    "img11111111",
  ];

  const twos = [
    "img2",
    "img22",
    "img222",
    "img2222",
    "img22222",
    "img222222",
    "img2222222",
    "img22222222",
  ];

  // shuffle
  shuffleArray(ohs);
  shuffleArray(ones);
  shuffleArray(twos);

  const code = codes.pop();
  const pos = dvColPosArray.pop();
  const image = ohs.pop();
  // init
  const renderings = {
    0: { value: code, pos: pos, img: image },
  };
  numOfDVs--;

  for (let i = 0; i < numOfDVs; i++) {
    const code = codes[i];
    const dvColPos = dvColPosArray[i];
    if (i % 3 === 0) {
      const rndIndex = Math.floor(Math.random() * ohs.length);
      console.log("rndIndex");
      console.log(rndIndex);
      img = ohs[rndIndex];
    } else if (dvColPos < 50) {
      const rndIndex = Math.floor(Math.random() * ones.length);
      console.log("rndIndex");
      console.log(rndIndex);
      img = ones[rndIndex];
    } else {
      const rndIndex = Math.floor(Math.random() * twos.length);
      console.log("rndIndex");
      console.log(rndIndex);
      img = twos[rndIndex];
    }
    renderings[i] = { value: code, pos: dvColPos, img: img };
  }

  if (numOfDVs > 1) {
    shuffleArray(renderings);
  }

  return JSON.stringify(renderings);
};

module.exports = a = async ({ params }) => {
  const numOfDVs = Number(params.numDVs);
  const dvImgWidth = Number(params.dvImgWidth);
  const dvColPosArray = generateDVColPosArrays(numOfDVs, dvImgWidth);
  const codes = generateCodes(numOfDVs);
  const code = codes[codes.length - 1];
  const renderings = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    dvColPosArray
  );

  return {
    code: code,
    renderings: renderings,
  };
};
