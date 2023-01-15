const crypto = require("crypto");

const images = {
  bg: {
    seeingDouble: "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png",
    ahhhhhh: "https://i.ibb.co/4dgrH9T/groupphoto3.png",
  },
  me: [
    "https://i.ibb.co/j6SmfCv/katpcha-me-b7e50e30-1f4e-43aa-8f6b-d82d9d7f4d32.png",
    "https://i.ibb.co/fYcrgBH/katpcha-me-97c59ab4-f899-4fe0-9bfe-074256c55d2e.png",
    "https://i.ibb.co/1YC8Xqq/katpcha-me-b89ba19f-9837-48e3-b91f-062f590e109e.png",
    "https://i.ibb.co/QXCQkBg/katpcha-me-823110f7-4f09-4c41-bc51-63fb8622f980.png",
    "https://i.ibb.co/MpG6RFQ/katpcha-me-d572f73a-fb38-4955-988d-535f471473c3.png",
    "https://i.ibb.co/jzDS7dz/katpcha-me-60f6683b-3918-4cb0-a4d2-1638fe5eee98.png",
    "https://i.ibb.co/h908XF4/kaptcha-me-0b749b3e-e9e3-4c34-85d3-a6324a2673e8.png",
    "https://i.ibb.co/4TrWJFY/katpcha-me-c3d09257-387c-4dd2-a6fa-e471cea8e2d9.png",
  ],
  mee: [
    "https://i.ibb.co/DtvDnYh/katpcha-me-bd3f73e7-1c2c-46b1-9544-c7d27529ad26.png",
    "https://i.ibb.co/8c5nL0Z/katpcha-me-37d58b2e-674a-4e60-882d-550135e6ae80.png",
    "https://i.ibb.co/RBNSnhp/katpcha-me-1d3a3db4-2ef1-4aec-8e6b-40ad5638b13e.png",
    "https://i.ibb.co/1vHDJnc/katpcha-me-8aedb330-22ec-41b7-b0f1-01895a079535.png",
    "https://i.ibb.co/SrNh0rM/katpcha-me-519204d0-5d2a-4c2d-88b3-ecde9e802b1d.png",
    "https://i.ibb.co/L6xnHN2/katpcha-me-b263ab48-d137-42da-a4a6-2c67d6522025.png",
    "https://i.ibb.co/k5wYc84/katpcha-me-cfe6156d-268f-481d-8f2f-7ce5442ef29d.png",
    "https://i.ibb.co/jZNRYP2/katpcha-me-84f00e2d-b2be-4d65-8f1f-9267997a839f.png",
    "https://i.ibb.co/GswJDk9/katpcha-me-5451de3b-f0a5-4947-a625-6b3cb6efb588.png",
  ],
  pointA: [
    "https://i.ibb.co/X3VyxVW/katpcha-me-a099cfb6-bd75-4431-b635-fa6f1f788783.png",
    "https://i.ibb.co/3RBSS8s/katpcha-me-41b0a353-195b-44bb-87fc-c04ad447ebee.png",
    "https://i.ibb.co/8bwQQBj/katpcha-me-8f2188d0-a3ad-4355-92b4-c9f9517d29d4.png",
    "https://i.ibb.co/19rZRGg/katpcha-me-49586981-7df6-400f-bbb0-e33e92646d4a.png",
    "https://i.ibb.co/pK5spvT/katpcha-me-7c43e5df-fe8e-4b50-8f72-819cfe648efd.png",
    "https://i.ibb.co/7kb35j9/katpcha-me-4709fab5-7f7e-4f10-88a7-928ecf705778.png",
    "https://i.ibb.co/R73Q0ZS/katpcha-me-e0440030-d42a-4abc-955e-85d3a69c82c7.png",
    "https://i.ibb.co/MScVdHf/katpcha-me-6c4dfb04-ec7f-46dd-b1ef-90ba271c3e34.png",
  ],
  pointB: [
    "https://i.ibb.co/YQfmZ9p/katpcha-me-293f18c8-781f-4dbe-aec0-22abcbf2b25b.png",
    "https://i.ibb.co/C8qzwkn/katpcha-me-d6544b54-29c7-4228-bd3b-c1083f9ee86c.png",
    "https://i.ibb.co/1nGCXD3/katpcha-me-c226201f-e369-42ba-a1f6-00fde7ba4b81.png",
    "https://i.ibb.co/6b0NQ7m/katpcha-me-9c1db434-c0f2-4dc6-9910-ab0bd06cec2c.png",
    "https://i.ibb.co/Z2s6x4s/katpcha-me-b2b00d2f-819f-45a6-94d4-5a7ea009be08.png",
    "https://i.ibb.co/SxS5jTb/katpcha-me-1b87c38c-1a08-49a0-9e0b-25407c814c9a.png",
    "https://i.ibb.co/fHJXxp3/katpcha-me-01a54ac8-4a3f-4bf2-b218-80944dcb16af.png",
    "https://i.ibb.co/PWMGTtM/katpcha-me-93207cc9-a70c-4938-9b88-d627352c02b1.png",
  ],
  pointC: [
    "https://i.ibb.co/SxGQ4c8/katpcha-me-0f045ad6-083a-43c2-a04e-786dafec1ef6.png",
    "https://i.ibb.co/JmRsVLT/katpcha-me-6511dada-a781-4d47-9b9b-238ed2a92d0c.png",
    "https://i.ibb.co/ZMYR9vy/katpcha-me-14051b83-34df-40a1-9548-f8a4ec2aa12f.png",
    "https://i.ibb.co/YTTwQWK/katpcha-me-03d780d5-ab98-425c-9ed1-5ebb0d63c15e.png",
    "https://i.ibb.co/dtKFSnG/katpcha-me-86ba1b48-8408-49df-9a00-1228c2bf876d.png",
    "https://i.ibb.co/Ny8y9nH/katpcha-me-157972bf-1350-4fcc-a0fd-1be5ed7df566.png",
    "https://i.ibb.co/Fz1rLFm/katpcha-me-4c2052f0-b135-4520-af0f-0b8fc4a49bb0.png",
    "https://i.ibb.co/0jTWN5L/katpcha-me-1e0086a4-0401-462e-93f8-eff24fc762b1.png",
  ],
  pointD: [
    "https://i.ibb.co/sK30tCP/katpcha-me-e61a3698-011d-4bea-bfbd-625354c4cecb.png",
    "https://i.ibb.co/C7v2hb0/katpcha-me-a91e18ea-00d9-47f2-b6a5-76f379648d4b.png",
    "https://i.ibb.co/nf4LRBL/katpcha-me-5df9206e-9510-46f8-b524-e2bf498bdb8e.png",
    "https://i.ibb.co/C85m2zz/katpcha-me-1423f8cb-955b-40e4-aded-30a7dcc1e176.png",
    "https://i.ibb.co/2ZNx07G/katpcha-me-0e80003f-8837-4b82-8bd7-a9306ead0926.png",
    "https://i.ibb.co/RP2S6w8/katpcha-me-a8c32429-04bc-4d81-9c2c-323d8c366b2f.png",
    "https://i.ibb.co/DpM9Sk4/katpcha-me-83ec086a-1b79-4aae-93f3-1781efca4187.png",
    "https://i.ibb.co/9hx26Jk/katpcha-me-137b0278-10bd-4f40-982b-62d80a4131cb.png",
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
  dvColPosSetAvailable,
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

  if (dvColPosSetAvailable && dvColPosSetAvailable.size > 0) {
    dvColPosSetAvailable.delete(i);
  }
  noLuck++;

  return {
    noLuck,
    dvColPosSet,
    dvColVisualizePositionsArray,
    dvColPosArrayPositions,
    dvColPosSetAvailable,
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
      if (dvColPosSetAvailable && dvColPosSetAvailable.size > 0) {
        dvColPosSetAvailable.delete(i);
      }
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
        if (dvColPosSetAvailable && dvColPosSetAvailable.size > 0) {
          dvColPosSetAvailable.delete(rndPosFromLeft);
        }
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
            if (dvColPosSetAvailable && dvColPosSetAvailable.size > 0) {
              dvColPosSetAvailable.delete(rndPosFromLeft);
            }
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

        if (dvColPosSetAvailable && dvColPosSetAvailable.size > 0) {
          dvColPosSetAvailable.delete(rndPosFromLeft);
        }

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
      dvColPosSetAvailable,
    } = noLuckFallback(
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
      dvColPosSetAvailable,
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
      dvColPosSetAvailable,
    } = noLuckFallback(
      dvColVisualizePositionsArray,
      dvColPosArrayPositions,
      dvColPosSetAvailable,
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
  rnd,
  immediateRight,
  immediateLeft
) => {
  const rndChanceToUseOhImg = floorRND(chanceForOh);

  if (
    rndChanceToUseOhImg === 0 &&
    position !== immediateRight &&
    position !== immediateLeft
  ) {
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
  dvColVisualizePositionsArray,
  initPos,
  renderings
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";
  let immediateRight = initRND;
  let immediateLeft = initRND;

  for (let i = initRND + 1; i < dvColVisualizePositionsArray.length; i++) {
    if (dvColVisualizePositionsArray[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initRND - 1; i >= 0; i--) {
    if (dvColVisualizePositionsArray[i]) {
      immediateLeft = i;
      break;
    }
  }

  for (let i = 0; i < numOfDVs; i++) {
    // skip the "chosen one" index (the one we used for initializing renderings)
    if (i === initRND) {
      continue;
    }

    if (ones.length === twos.length) {
      rnd = floorRND(ones.length);
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
      rnd,
      immediateRight,
      immediateLeft
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

  return { ohs, ones, twos };
};

const combineCodesAndPosArrayAndImgs = (
  numOfDVs,
  codes,
  dvColPosArrayPositions,
  dvColVisualizePositionsArray,
  theme
) => {
  // percentage chance for having another "oh" image show up
  let chanceForOh = 10;
  // img options
  const { ohs, ones, twos } = getImgOptions(theme);

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
    dvColVisualizePositionsArray,
    initPos,
    renderings
  );

  const renderingsString = JSON.stringify(renderings);

  return { code: initCode, renderings: renderingsString };
};

module.exports = a = async ({ params }) => {
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
    dvColVisualizePositionsArray,
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
