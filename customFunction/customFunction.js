const crypto = require("crypto");

const floorRND = (max) => {
  return Math.floor(Math.random() * max);
};

// calculates a random number to place the col contanining an img
// min value is 0 to keep from going off screen to the left
// max value is 99 - dvImgWidth since I'm converting this to a percentage
const rndNum = (dvImgWidth) => {
  return Math.max(0, floorRND(99 - dvImgWidth));
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
  let rndLeft = rndNum(dvImgWidth);

  // keep iterations to 100 just to avoid infinite loop. at that point we'll probably have to overlap.
  for (let i = 0; i < iterationsToFindLeftPos; i++) {
    // if we already have this position try again, else break out and use that
    // value
    if (dvColPosSet.has(rndLeft)) {
      rndLeft = rndNum(dvImgWidth);
    } else {
      // add to set to try to avoid overlapping
      dvColPosSet.add(rndLeft);
      // add to array to return
      dvColPosArray.push(rndLeft);
      break;
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
  let dvColPosArray = new Array();

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
    randomIndex = floorRND(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const shuffleObjectWithNumberKeys = (obj) => {
  let currentIndex = obj.keys.length;
  let randomIndex = 0;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = floorRND(currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [obj[currentIndex], obj[randomIndex]] = [
      obj[randomIndex],
      obj[currentIndex],
    ];
  }

  return obj;
};

const generateCodes = (numOfCodes) => {
  const codes = [];
  for (let i = 0; i < numOfCodes; i++) {
    const code = crypto.randomBytes(64).toString("base64url");
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

  const chanceForOh = 10;

  // shuffle
  shuffleArray(ohs);
  shuffleArray(ones);
  shuffleArray(twos);

  // init
  const renderings = {};
  const rndOh = floorRND(ohs.length);

  let rnd = floorRND(numOfDVs);
  let code = codes[rnd];
  let position = dvColPosArray[rnd];
  let image = ohs[rndOh];

  renderings[rnd] = { value: code, pos: position, img: image };

  // save init rnd index and code
  const initRND = rnd;
  const initCode = code;
  const initPos = position;

  // set to -1 so if ones and twos aren't equal we'll know by checking for -1
  rnd = -1;

  for (let i = 0; i < numOfDVs; i++) {
    // skip the "chosen one" (the one we used for init above)
    if (i === initRND) continue;

    const rndAddOh = floorRND(chanceForOh);

    code = codes[i];
    position = dvColPosArray[i];

    if (ones.length === twos.length) {
      rnd = floorRND(ones.length);
    }

    if (rndAddOh === 0) {
      const rndOhIndex = floorRND(ohs.length);
      image = ohs[rndOhIndex];
    } else if (position < initPos) {
      if (rnd < 0) {
        rnd = floorRND(ones.length);
      }
      image = ones[rnd];
    } else {
      if (rnd < 0) {
        rnd = floorRND(twos.length);
      }
      image = twos[rnd];
    }
    renderings[i] = { value: code, pos: position, img: image };
  }

  // i think i was able to come up with a way of avoiding needing this by
  // initializing renderings with a random key value
  // // only need because we put the code at the first value
  // if (numOfDVs > 1) {
  //   shuffleObj(renderings);
  // }

  const renderingsString = JSON.stringify(renderings);

  return { code: initCode, renderings: renderingsString };
};

module.exports = a = async ({ params }) => {
  const numOfDVs = Number(params.numDVs);
  const dvImgWidth = Number(params.dvImgWidth);
  const dvColPosArray = generateDVColPosArrays(numOfDVs, dvImgWidth);
  const codes = generateCodes(numOfDVs);
  const { code, renderings } = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    dvColPosArray
  );

  return {
    code: code,
    renderings: renderings,
    posArray: dvColPosArray,
  };
};
