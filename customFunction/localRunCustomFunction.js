const crypto = require("crypto");

const images = {
  bg: {
    seeingDouble: "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png",
    ahhhhhh: "https://i.ibb.co/4dgrH9T/groupphoto3.png",
  },
  me: [
    "https://i.ibb.co/j6SmfCv/anthony7.png",
    "https://i.ibb.co/fYcrgBH/anthony6.png",
    "https://i.ibb.co/1YC8Xqq/anthony5.png",
    "https://i.ibb.co/QXCQkBg/anthony4.png",
    "https://i.ibb.co/MpG6RFQ/anthony3.png",
    "https://i.ibb.co/jzDS7dz/anthony2.png",
    "https://i.ibb.co/h908XF4/anthony1.png",
    "https://i.ibb.co/4TrWJFY/anthony8.png",
  ],
  mee: [
    "https://i.ibb.co/8c5nL0Z/anthony9.png",
    "https://i.ibb.co/DtvDnYh/anthony10.png",
    "https://i.ibb.co/RBNSnhp/anthony11.png",
    "https://i.ibb.co/1vHDJnc/anthony12.png",
    "https://i.ibb.co/SrNh0rM/anthony13.png",
    "https://i.ibb.co/L6xnHN2/anthony14.png",
    "https://i.ibb.co/k5wYc84/anthony15.png",
    "https://i.ibb.co/jZNRYP2/anthony16.png",
    "https://i.ibb.co/GswJDk9/anthony17.png",
  ],
  pointA: [
    "https://i.ibb.co/MScVdHf/f1.png",
    "https://i.ibb.co/R73Q0ZS/f2.png",
    "https://i.ibb.co/7kb35j9/f3.png",
    "https://i.ibb.co/pK5spvT/f4.png",
    "https://i.ibb.co/19rZRGg/f5.png",
    "https://i.ibb.co/8bwQQBj/f6.png",
    "https://i.ibb.co/3RBSS8s/f7.png",
    "https://i.ibb.co/X3VyxVW/f8.png",
  ],
  pointB: [
    "https://i.ibb.co/PWMGTtM/g8.png",
    "https://i.ibb.co/fHJXxp3/g7.png",
    "https://i.ibb.co/SxS5jTb/g6.png",
    "https://i.ibb.co/Z2s6x4s/g5.png",
    "https://i.ibb.co/6b0NQ7m/g3.png",
    "https://i.ibb.co/1nGCXD3/g4.png",
    "https://i.ibb.co/C8qzwkn/g1.png",
    "https://i.ibb.co/YQfmZ9p/g2.png",
  ],
  pointC: [
    "https://i.ibb.co/0jTWN5L/e8.png",
    "https://i.ibb.co/Fz1rLFm/e7.png",
    "https://i.ibb.co/Ny8y9nH/e6.png",
    "https://i.ibb.co/dtKFSnG/e5.png",
    "https://i.ibb.co/YTTwQWK/e4.png",
    "https://i.ibb.co/ZMYR9vy/e3.png",
    "https://i.ibb.co/JmRsVLT/e2.png",
    "https://i.ibb.co/SxGQ4c8/e1.png",
  ],
  pointD: [
    "https://i.ibb.co/9hx26Jk/d8.png",
    "https://i.ibb.co/DpM9Sk4/d7.png",
    "https://i.ibb.co/RP2S6w8/d6.png",
    "https://i.ibb.co/2ZNx07G/d5.png",
    "https://i.ibb.co/C85m2zz/d4.png",
    "https://i.ibb.co/nf4LRBL/d3.png",
    "https://i.ibb.co/C7v2hb0/d2.png",
    "https://i.ibb.co/sK30tCP/d1.png",
  ],
};

/**
 * Return a random integer between 0 and the provided max value (exclusive of
 *  max value).
 * @param max - the maximum value to use in Math.random()
 * @returns A random number between 0 and the max value provided.
 */
const floorRND = (max) => {
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
  dvColVisualizePositionsArray,
  dvColPosArrayPositions,
  dvColPosSet,
  noLuck,
  dvImgWidth
) => {
  const lastDitchIterations = 100;
  let rnd = rndPos(dvImgWidth);

  // just try to avoid direct overlap
  for (let i = 0; i < lastDitchIterations; i++) {
    if (dvColPosArrayPositions[rnd]) {
      rnd = rndPos(dvImgWidth);
    } else {
      break;
    }
  }
  // add to set to try to avoid overlapping
  dvColPosSet.add(rnd);
  // add to array to return
  dvColVisualizePositionsArray[rnd] = true;
  dvColPosArrayPositions.push(rnd);
  noLuck++;

  return {
    noLuck,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
  };
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
  dvColVisualizePositionsArray,
  dvColPosArrayPositions,
  dvColPosSetAvailable,
  dvImgWidth,
  overlap,
  dvColPosSet
) => {
  let iteration = 0;

  let numPosAvailable = dvColPosSetAvailable.size;

  if (numPosAvailable > 0) {
    rndPosFromLeft = Array.from(dvColPosSetAvailable.values())[
      floorRND(numPosAvailable)
    ];
    dvColPosSet.add(rndPosFromLeft);
    dvColVisualizePositionsArray[rndPosFromLeft] = true;
    dvColPosArrayPositions.push(rndPosFromLeft);
    for (
      let i = rndPosFromLeft - dvImgWidth + overlap;
      i < rndPosFromLeft + dvImgWidth - overlap;
      i++
    ) {
      dvColPosSetAvailable.delete(i);
    }
  } else {
    loop1: while (iteration < maxIterationsBeforePickingAnyRND) {
      let rndPosFromLeft;

      let foundOverlap = false;
      rndPosFromLeft = rndPos(dvImgWidth);

      if (
        rndPosFromLeft > 100 - dvImgWidth - 1 ||
        dvColPosArrayPositions[rndPosFromLeft]
      ) {
        dvColPosSetAvailable.delete(rndPosFromLeft);
        rndPosFromLeft = rndPos(dvImgWidth);
        iteration++;
        continue;
      }

      if (dvColPosArrayPositions.length < dvImgWidth * 2) {
        loop2: for (
          let i = rndPosFromLeft - dvImgWidth;
          i < rndPosFromLeft + dvImgWidth;
          i++
        ) {
          if (dvColVisualizePositionsArray[i]) {
            dvColPosSetAvailable.delete(rndPosFromLeft);
            foundOverlap = true;
            break loop2;
          }
        }
      } else {
        loop3: for (
          let pos = rndPosFromLeft - dvImgWidth + overlap;
          pos < rndPosFromLeft + dvImgWidth - overlap;
          pos++
        ) {
          // if we already have this position (disallowing overlap), try again by
          // breaking out
          if (dvColVisualizePositionsArray[pos]) {
            dvColPosSetAvailable.delete(rndPosFromLeft);
            foundOverlap = true;
            break loop3;
          }
        }
      }

      if (foundOverlap) {
        // overlap found!
        // the rnd value overlaps one(+) of the positions
        // get a new random value
        rndPosFromLeft = rndPos(dvImgWidth);
      } else {
        // NO overlap found!
        // keep track to try to avoid overlapping and to use for position
        // renderings
        dvColPosSet.add(rndPosFromLeft);
        dvColVisualizePositionsArray[rndPosFromLeft] = true;
        dvColPosArrayPositions.push(rndPosFromLeft);
        dvColPosSetAvailable.delete(rndPosFromLeft);

        // we can end the outer loop since we found our non-overlapping position
        break loop1;
      }

      iteration++;
    }
  }

  return {
    rndPosFromLeft,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    dvColPosSetAvailable,
  };
};

// doesn't allow direct overlap
const getPosWithOverlapAllowed = (
  numPosWithoutCompleteOverlap,
  dvColPosSet,
  rndPosFromLeft,
  dvColVisualizePositionsArray,
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
      dvColVisualizePositionsArray[rndPosFromLeft] = true;
      dvColPosArrayPositions.push(rndPosFromLeft);
      break;
    }
  }

  return {
    rndPosFromLeft,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
  };
};

/**
 * Generates random position and adds to and returns an array
 * @returns An array of random positions without overlap
 */
const addPosWithAllowableOverlap = (
  dvColPosSet,
  dvColVisualizePositionsArray,
  dvColPosArrayPositions,
  dvColPosSetAvailable,
  dvImgWidth,
  maxPositionsWithoutOverlap,
  allowOverlap,
  noLuck
) => {
  const maxIterationsBeforePickingAnyRND = 100000;
  const initialPosArrayLength = dvColPosArrayPositions.length;
  let overlap = 0;

  if (allowOverlap) {
    overlap = getMinOverlapNeeded(
      dvColPosArrayPositions,
      maxPositionsWithoutOverlap,
      overlap
    );
  }

  ({
    rndPosFromLeft,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    dvColPosSetAvailable,
  } = getPositionWithMinOverlap(
    maxIterationsBeforePickingAnyRND,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    dvColPosSetAvailable,
    dvImgWidth,
    overlap,
    dvColPosSet
  ));

  if (dvColPosArrayPositions.length === initialPosArrayLength) {
    // ran through without luck, use rndPos anyways
    ({
      noLuck,
      dvColPosSet,
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
    } = noLuckFallback(
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
      dvColPosSet,
      noLuck,
      dvImgWidth
    ));
  }

  return {
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    dvColPosSetAvailable,
    noLuck,
  };
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
  dvColVisualizePositionsArray,
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
  ({
    rndPosFromLeft,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
  } = getPosWithOverlapAllowed(
    numPosWithoutCompleteOverlap,
    dvColPosSet,
    rndPosFromLeft,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions
  ));

  if (dvColPosSet.size === initialPosArrayLength) {
    // ran through without luck
    ({
      noLuck,
      dvColPosSet,
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
    } = noLuckFallback(
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
      dvColPosSet,
      noLuck,
      dvImgWidth
    ));
  }

  return {
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    noLuck,
  };
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
  let dvColVisualizePositionsArray = new Array(100);
  let dvColPosArrayPositions = new Array();
  let dvColPosSetAvailable = new Set();
  dvColVisualizePositionsArray = dvColVisualizePositionsArray.fill(0);

  for (let i = 0; i < 100 - dvImgWidth; i++) {
    dvColPosSetAvailable.add(i);
  }

  while (posCreated < numOfDVs) {
    if (posCreated > 100) {
      // we have to overlap entirely now
      const rnd = floorRND(100);
      dvColVisualizePositionsArray[rnd] = true;
      dvColPosArrayPositions.push(rnd);
      positionsOverlapping.withRandom = positionsOverlapping.withRandom + 1;
    } else if (posCreated < maxPositionsWithoutOverlap) {
      // can avoid overlap
      ({
        dvColPosSet,
        dvColVisualizePositionsArray,
        dvColPosArrayPositions,
        dvColPosSetAvailable,
        noLuck,
      } = addPosWithAllowableOverlap(
        dvColPosSet,
        dvColVisualizePositionsArray,
        dvColPosArrayPositions,
        dvColPosSetAvailable,
        dvImgWidth,
        maxPositionsWithoutOverlap,
        false,
        noLuck
      ));
      positionsOverlapping.withoutOverlap =
        positionsOverlapping.withoutOverlap + 1;
    } else if (posCreated < 50) {
      // can allow partial overlap
      ({
        dvColPosSet,
        dvColVisualizePositionsArray,
        dvColPosArrayPositions,
        noLuck,
      } = addPosWithAllowableOverlap(
        dvColPosSet,
        dvColVisualizePositionsArray,
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
      ({
        dvColPosSet,
        dvColVisualizePositionsArray,
        dvColPosArrayPositions,
        noLuck,
      } = addPosWithOverlap(
        dvColPosSet,
        dvColVisualizePositionsArray,
        dvColPosArrayPositions,
        dvImgWidth,
        noLuck
      ));
      positionsOverlapping.withOverlap = positionsOverlapping.withOverlap + 1;
    }

    posCreated++;
  }

  return {
    dvColVisualizePositionsArray,
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
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(ones.length);
    }
    image = ones[rnd];
  } else {
    // rnd will be < 0 if ones and twos arrays are of different lengths
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

const getImgOptions = (theme) => {
  const mes = images.me;
  const mees = images.mee;
  const as = images.pointA;
  const bs = images.pointB;
  const cs = images.pointC;
  const ds = images.pointD;
  // percentage chance for having another "oh" image show up
  const chanceForOh = 10;

  // shuffle
  let ohs;
  let ones;
  let twos;
  if (theme === "seeingDouble") {
    ohs = shuffleArray(mes);
    ones = shuffleArray(as);
    twos = shuffleArray(bs);
  } else if (theme === "ahhhhhh") {
    ohs = shuffleArray(mees);
    ones = shuffleArray(cs);
    twos = shuffleArray(ds);
  } else {
    ohs = shuffleArray(mes);
    ones = shuffleArray(as);
    twos = shuffleArray(bs);
  }

  return { chanceForOh, ohs, ones, twos };
};

const combineCodesAndPosArrayAndImgs = (
  numOfDVs,
  codes,
  dvColPosArrayPositions,
  theme
) => {
  // img options
  const { chanceForOh, ohs, ones, twos } = getImgOptions(theme);

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

const localParams = { numDVs: 14, dvImgWidth: 5, theme: "seeingDouble" };

module.exports = a = async (params = localParams) => {
  const numOfDVs = Number(params.numDVs);
  const dvImgWidth = Number(params.dvImgWidth);
  const theme = params.theme;
  const bgImgSrc = images.bg[theme];
  let {
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    noLuck,
    positionsOverlapping,
    maxPositionsWithoutOverlap,
  } = generateDVColPosArrays(numOfDVs, dvImgWidth);
  const codes = generateCodes(numOfDVs);
  const { code, renderings } = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    dvColPosArrayPositions,
    theme
  );
  const numDirectOverlaps =
    dvColPosArrayPositions.length -
    dvColVisualizePositionsArray.filter((pos) => pos).length;

  const positionsSorted = dvColPosArrayPositions.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });

  const output = {
    themeSrc: bgImgSrc,
    code: code,
    renderings: renderings,
    posArray: dvColVisualizePositionsArray,
    positions: dvColPosArrayPositions,
    positionsSorted: positionsSorted,
    posArrayLength: dvColPosArrayPositions.length,
    noLuck: noLuck,
    positionsOverlapping: positionsOverlapping,
    maxPositionsWithoutOverlap: maxPositionsWithoutOverlap,
    numDirectOverlaps: numDirectOverlaps,
  };

  return output;
};
