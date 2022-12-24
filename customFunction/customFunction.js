const crypto = require("crypto");

/**
 * Return a random integer between 0 and the provided max value (max value is
 *  exclusive).
 * @param max - the maximum value to return
 * @returns A random number between 0 and the max value provided.
 */
const floorRND = (max) => {
  // make sure we don't have a negative max value
  // if no max was provided, use 1
  if (max <= 1) {
    console.error("Need a max greater than 1 to get a random value");
    return -1;
  }
  return Math.floor(Math.random() * max);
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

  // unnecessary to use since this modifies the array in place, and this will
  // modify the original array argument where this func is called from
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

/**
 * It calculates a random number to place the col containing an img
 * min value is 0 to keep from going off screen to the left
 * max value is 100 - dvImgWidth since I'm using this value as a percentage
 * and dvImgWidth should be in vw units
 * @param dvImgWidth - the width of the div containing the image
 * @returns A random number
 */
const rndPos = (dvImgWidth) => {
  // use max to make sure we don't choose a negative value
  const maxPositionFromLeftEdge = 100 - dvImgWidth;
  return Math.max(0, floorRND(maxPositionFromLeftEdge));
};

const noLuckFallback = (
  dvColPosArray,
  dvColPosArrayPositions,
  dvColPosSet,
  noLuck,
  dvImgWidth
) => {
  const rnd = rndPos(dvImgWidth);

  // add to set to try to avoid overlapping
  dvColPosSet.add(rnd);
  // add to array to return
  dvColPosArray[rnd] = true;
  dvColPosArrayPositions.push(rnd);
  noLuck++;

  return { noLuck, dvColPosSet, dvColPosArray, dvColPosArrayPositions };
};

const getMinOverlapNeeded = (
  dvColPosArrayPositions,
  maxPositionsWithoutOverlap,
  overlap
) => {
  const howFarOverMaxOverlapLimit =
    dvColPosArrayPositions.length - maxPositionsWithoutOverlap;
  // if needing to overlap, find out min overlap we need

  if (howFarOverMaxOverlapLimit > 0) {
    overlap = Math.floor(
      howFarOverMaxOverlapLimit / maxPositionsWithoutOverlap
    );
  } else {
    overlap = 0;
  }

  return overlap;
};

const getPositionWithMinOverlap = (
  maxIterationsBeforePickingAnyRND,
  dvColPosArray,
  dvColPosArrayPositions,
  dvImgWidth,
  overlap,
  rndPosFromLeft,
  dvColPosSet
) => {
  let iteration = 0;
  let dvColPosArrayWithOnlyTakenPositions = dvColPosArray;

  loop1: while (iteration < maxIterationsBeforePickingAnyRND) {
    let foundOverlap = false;
    if (dvColPosSet.has(rndPosFromLeft)) {
      // the rnd value overlaps one(+) of the positions
      // get a new random value
      rndPosFromLeft = rndPos(dvImgWidth);

      continue;
    }
    loop2: for (let position of dvColPosSet) {
      const min = position;
      const max = position + dvImgWidth - overlap;
      // if we already have this position (disallowing overlap), try again, else break out and use that
      // value
      if (rndPosFromLeft > min && rndPosFromLeft < max) {
        foundOverlap = true;
        break loop2;
      }
    }

    if (foundOverlap) {
      // the rnd value overlaps one(+) of the positions
      // get a new random value
      rndPosFromLeft = rndPos(dvImgWidth);
    } else {
      // add to set to try to avoid overlapping (in case we move to the overlapping const)
      dvColPosSet.add(rndPosFromLeft);
      // add to array to return
      dvColPosArray[rndPosFromLeft] = true;
      dvColPosArrayPositions.push(rndPosFromLeft);

      break loop1;
    }

    iteration++;
  }

  return { rndPosFromLeft, dvColPosSet, dvColPosArray, dvColPosArrayPositions };
};

// doesn't allow direct overlap
const getPosWithOverlapAllowed = (
  numPosWithoutCompleteOverlap,
  dvColPosSet,
  rndPosFromLeft,
  dvColPosArray,
  dvColPosArrayPositions
) => {
  for (let i = 0; i < numPosWithoutCompleteOverlap; i++) {
    // if we already have this position try again, else break out and use that
    // value
    if (dvColPosSet.has(rndPosFromLeft)) {
      rndPosFromLeft = rndPos(dvImgWidth);
    } else {
      // add to set to try to avoid overlapping
      dvColPosSet.add(rndPosFromLeft);
      // add to array to return
      dvColPosArray[rndPosFromLeft] = true;
      dvColPosArrayPositions.push(rndPosFromLeft);
      break;
    }
  }

  return { rndPosFromLeft, dvColPosSet, dvColPosArray, dvColPosArrayPositions };
};

/**
 * Generates random position and adds to and returns an array
 * @returns An array of random positions without overlap
 */
const addPosWithAllowableOverlap = (
  dvColPosSet,
  dvColPosArray,
  dvColPosArrayPositions,
  dvImgWidth,
  maxPositionsWithoutOverlap,
  allowOverlap,
  noLuck
) => {
  const maxIterationsBeforePickingAnyRND = 100000;
  const initialPosArrayLength = dvColPosArrayPositions.length;
  let overlap = 0;
  // initialize rndLeft
  let rndPosFromLeft = rndPos(dvImgWidth);

  if (allowOverlap) {
    overlap = getMinOverlapNeeded(
      dvColPosArrayPositions,
      maxPositionsWithoutOverlap,
      overlap
    );
  }

  ({ rndPosFromLeft, dvColPosSet, dvColPosArray, dvColPosArrayPositions } =
    getPositionWithMinOverlap(
      maxIterationsBeforePickingAnyRND,
      dvColPosArray,
      dvColPosArrayPositions,
      dvImgWidth,
      overlap,
      rndPosFromLeft,
      dvColPosSet
    ));

  if (dvColPosArrayPositions.length === initialPosArrayLength) {
    // ran through without luck, use rndPos anyways
    ({ noLuck, dvColPosSet, dvColPosArray, dvColPosArrayPositions } =
      noLuckFallback(
        dvColPosArray,
        dvColPosArrayPositions,
        dvColPosSet,
        noLuck,
        dvImgWidth
      ));
  }

  return { dvColPosSet, dvColPosArray, dvColPosArrayPositions, noLuck };
};

/**
 * It generates a random number between 0 and the window width (technically 99%
 * of window width), and if that number is already in the set, it generates a
 * new number until it finds one that isn't in the set to avoid overlapping
 * but limited to 100 iterations
 * @returns A random number between 0 and the window width minus the width of the
 * image.
 */
const addPosWithOverlap = (
  dvColPosSet,
  dvColPosArray,
  dvColPosArrayPositions,
  dvImgWidth,
  noLuck
) => {
  // pos values are integers from 0 - 100.
  const numPosWithoutCompleteOverlap = 100;
  const initialPosArrayLength = dvColPosSet.size;
  // initialize rndPosFromLeft
  let rndPosFromLeft = rndPos(dvImgWidth);

  // keep iterations to 100 just to avoid infinite loop. at that point we'll probably have to just overlap to avoid too high of an execution time.
  ({ rndPosFromLeft, dvColPosSet, dvColPosArray, dvColPosArrayPositions } =
    getPosWithOverlapAllowed(
      numPosWithoutCompleteOverlap,
      dvColPosSet,
      rndPosFromLeft,
      dvColPosArray,
      dvColPosArrayPositions
    ));

  if (dvColPosSet.size === initialPosArrayLength) {
    // ran through without luck
    ({ noLuck, dvColPosSet, dvColPosArray, dvColPosArrayPositions } =
      noLuckFallback(
        dvColPosArray,
        dvColPosArrayPositions,
        dvColPosSet,
        noLuck,
        dvImgWidth
      ));
  }

  return { dvColPosSet, dvColPosArray, dvColPosArrayPositions, noLuck };
};

// fill an array while trying to avoid overlap and moving up slowly
// on how much overlap we add
const generateDVColPosArrays = (numOfDVs, dvImgWidth) => {
  // if dvImgWidth were 1, we'd have 100 position slots from 0 - 99
  const maxPositionsWithoutOverlap = Math.floor(100 / dvImgWidth);
  const positionsOverlapping = {
    withoutOverlap: 0,
    withPartialOverlap: 0,
    withOverlap: 0,
    withRandom: 0,
  };
  let posCreated = 0;
  let noLuck = 0;
  let dvColPosSet = new Set();
  let dvColPosArray = new Array(100);
  let dvColPosArrayPositions = new Array();
  dvColPosArray = dvColPosArray.fill(0);

  while (posCreated < numOfDVs) {
    if (posCreated > 100) {
      // we have to overlap entirely now
      const rnd = floorRND(100);
      dvColPosArray[rnd] = true;
      dvColPosArrayPositions.push(rnd);
      positionsOverlapping.withRandom = positionsOverlapping.withRandom + 1;
    } else if (posCreated < maxPositionsWithoutOverlap) {
      // can avoid overlap
      ({ dvColPosSet, dvColPosArray, dvColPosArrayPositions, noLuck } =
        addPosWithAllowableOverlap(
          dvColPosSet,
          dvColPosArray,
          dvColPosArrayPositions,
          dvImgWidth,
          maxPositionsWithoutOverlap,
          false,
          noLuck
        ));
      positionsOverlapping.withoutOverlap =
        positionsOverlapping.withoutOverlap + 1;
    } else if (posCreated < 50) {
      // can allow partial overlap
      ({ dvColPosSet, dvColPosArray, dvColPosArrayPositions, noLuck } =
        addPosWithAllowableOverlap(
          dvColPosSet,
          dvColPosArray,
          dvColPosArrayPositions,
          dvImgWidth,
          maxPositionsWithoutOverlap,
          true,
          noLuck
        ));
      positionsOverlapping.withPartialOverlap =
        positionsOverlapping.withPartialOverlap + 1;
    } else {
      // overlap
      ({ dvColPosSet, dvColPosArray, dvColPosArrayPositions, noLuck } =
        addPosWithOverlap(
          dvColPosSet,
          dvColPosArray,
          dvColPosArrayPositions,
          dvImgWidth,
          noLuck
        ));
      positionsOverlapping.withOverlap = positionsOverlapping.withOverlap + 1;
    }

    posCreated++;
  }

  return {
    dvColPosArray,
    dvColPosArrayPositions,
    noLuck,
    positionsOverlapping,
    maxPositionsWithoutOverlap,
  };
};

/**
 * It generates a random string of characters that can be used as a code
 * @param numOfCodes - The number of codes you want to generate.
 * @returns An array of codes.
 */
const generateCodes = (numOfCodes) => {
  const codes = [];
  for (let i = 0; i < numOfCodes; i++) {
    const code = crypto.randomBytes(64).toString("base64url");
    codes.push(code);
  }

  return codes;
};

const getImgToUseAtPos = (
  chanceForOh,
  ohs,
  ones,
  twos,
  image,
  position,
  initPos,
  rnd
) => {
  const rndChanceToUseOhImg = floorRND(chanceForOh);

  if (rndChanceToUseOhImg === 0) {
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

  return image;
};

const fillRenderings = (
  numOfDVs,
  initRND,
  chanceForOh,
  ohs,
  ones,
  twos,
  codes,
  dvColPosArrayPositions,
  initPos,
  renderings
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";

  if (ones.length === twos.length) {
    rnd = floorRND(ones.length);
  }

  for (let i = 0; i < numOfDVs; i++) {
    // skip the "chosen one" index (the one we used for initializing renderings)
    if (i === initRND) {
      continue;
    }

    code = codes[i];
    position = dvColPosArrayPositions[i];

    image = getImgToUseAtPos(
      chanceForOh,
      ohs,
      ones,
      twos,
      image,
      position,
      initPos,
      rnd
    );

    renderings[i] = { value: code, pos: position, img: image };
  }

  return renderings;
};

const getImgOptions = () => {
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

  return { chanceForOh, ohs, ones, twos };
};

const combineCodesAndPosArrayAndImgs = (
  numOfDVs,
  codes,
  dvColPosArrayPositions
) => {
  // img options
  const { chanceForOh, ohs, ones, twos } = getImgOptions();

  // init
  let renderings = {};
  const rndOh = floorRND(ohs.length);
  const initRND = floorRND(numOfDVs);
  const initCode = codes[initRND];
  const initPos = dvColPosArrayPositions[initRND];
  const initImage = ohs[rndOh];

  // initial rendering
  renderings[initRND] = { value: initCode, pos: initPos, img: initImage };

  renderings = fillRenderings(
    numOfDVs,
    initRND,
    chanceForOh,
    ohs,
    ones,
    twos,
    codes,
    dvColPosArrayPositions,
    initPos,
    renderings
  );

  const renderingsString = JSON.stringify(renderings);

  return { code: initCode, renderings: renderingsString };
};

module.exports = a = async ({ params }) => {
  const numOfDVs = Number(params.numDVs);
  const dvImgWidth = Number(params.dvImgWidth);
  let {
    dvColPosArray,
    dvColPosArrayPositions,
    noLuck,
    positionsOverlapping,
    maxPositionsWithoutOverlap,
  } = generateDVColPosArrays(numOfDVs, dvImgWidth);
  const codes = generateCodes(numOfDVs);
  const { code, renderings } = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    dvColPosArrayPositions
  );

  return {
    code: code,
    renderings: renderings,
    posArray: dvColPosArray,
    positions: dvColPosArrayPositions,
    posArrayLength: dvColPosArrayPositions.length,
    noLuck: noLuck,
    positionsOverlapping: positionsOverlapping,
    maxPositionsWithoutOverlap: maxPositionsWithoutOverlap,
  };
};
