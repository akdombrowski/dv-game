const crypto = require("crypto");

const images = {
  bg: {
    seeingDouble: "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png",
    ahhhhhh: "https://i.ibb.co/4dgrH9T/groupphoto3.png",
    racing: "https://i.ibb.co/ystvSH8/race-Track.png",
    ping: "https://i.imgur.com/pOecQB0.png",
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
  meee: [
    "https://i.imgur.com/tH80cQz.png",
    "https://i.imgur.com/FU1sRJb.png",
    "https://i.imgur.com/tSR0nQs.png",
    "https://i.imgur.com/7YheaDf.png",
    "https://i.imgur.com/L79PWKd.png",
    "https://i.imgur.com/vqZZnky.png",
    "https://i.imgur.com/kGhb45K.png",
    "https://i.imgur.com/4QclOpQ.png",
  ],
  meeee: [
    "https://i.imgur.com/R629KIl.png",
    "https://i.imgur.com/X28raec.png",
    "https://i.imgur.com/xT9YrVJ.png",
    "https://i.imgur.com/E5zZpaW.png",
    "https://i.imgur.com/kMuti33.png",
    "https://i.imgur.com/RLSrHSb.png",
    "https://i.imgur.com/z63al0H.png",
    "https://i.imgur.com/AQrZLTX.png",
  ],
  ping: [
    "https://i.ibb.co/qFtPp72/katpcha-me-1b795ca0-9ce4-4634-a18e-e2913aa8e74b.png",
    "https://i.ibb.co/6FcRkLx/katpcha-me-86c63577-dc26-4c06-b537-7c4e2d1457db.png",
    "https://i.ibb.co/GkQxXhW/katpcha-me-05539794-4152-4d0d-8b44-f49fff4cfe69.png",
    "https://i.ibb.co/vHL3xCP/katpcha-me-b7bfd0c3-ac17-4d66-939b-4af51cd498e1.png",
    "https://i.ibb.co/7YGCsDP/katpcha-me-bc859376-f6c9-4153-945a-d131387e5d13.png",
    "https://i.ibb.co/DRW73pg/katpcha-me-cc761a94-1feb-4c31-b4f3-6373f5fdaf58.png",
    "https://i.ibb.co/Y7DJJxN/katpcha-me-dc81c394-a48e-4ba1-9c16-9ab5d25f223c.png",
    "https://i.ibb.co/y8DVb07/katpcha-me-e2e1008d-9b8e-4ac6-917a-d9685f3152d7.png",
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
  pointF: [
    "https://i.imgur.com/sl1O32S.png",
    "https://i.imgur.com/em110KA.png",
    "https://i.imgur.com/51uvWRV.png",
    "https://i.imgur.com/z2VN6Ne.png",
    "https://i.imgur.com/Ve6Cksb.png",
    "https://i.imgur.com/36zTZId.png",
    "https://i.imgur.com/oP730Sd.png",
    "https://i.imgur.com/xd97AhH.png",
  ],
  pointFF: [
    "https://i.imgur.com/ndBTJzK.png",
    "https://i.imgur.com/YRS60Jw.png",
    "https://i.imgur.com/oEQ6z8a.png",
    "https://i.imgur.com/tRolKnk.png",
    "https://i.imgur.com/8kxo9Ac.png",
    "https://i.imgur.com/XCMDV1S.png",
    "https://i.imgur.com/IFBsGtx.png",
    "https://i.imgur.com/0vFfGKO.png",
  ],
  pointG: [
    "https://i.imgur.com/aqd5f3y.png",
    "https://i.imgur.com/wvJvCJ9.png",
    "https://i.imgur.com/behd9Zy.png",
    "https://i.imgur.com/Q8Vi65x.png",
    "https://i.imgur.com/SSLKQFT.png",
    "https://i.imgur.com/ur38y4c.png",
    "https://i.imgur.com/NS1IiYu.png",
    "https://i.imgur.com/eFgp97J.png",
  ],
  pointGG: [
    "https://i.imgur.com/zKbgT36.png",
    "https://i.imgur.com/3jHIsHt.png",
    "https://i.imgur.com/cWpbosY.png",
    "https://i.imgur.com/cS3zEZd.png",
    "https://i.imgur.com/pmkT2S5.png",
    "https://i.imgur.com/8NTojHQ.png",
    "https://i.imgur.com/xXyN8Ja.png",
    "https://i.imgur.com/tlnqo09.png",
  ],
  pointI: [
    "https://i.imgur.com/7UpBYYI.png",
    "https://i.imgur.com/xeOtZmm.png",
    "https://i.imgur.com/4SOoYcE.png",
    "https://i.imgur.com/P07Zcaj.png",
    "https://i.imgur.com/0WU03YI.png",
    "https://i.imgur.com/HgQdQZd.png",
    "https://i.imgur.com/JSe0zjq.png",
    "https://i.imgur.com/4GiaPhz.png",
  ],
  pointJ: [
    "https://i.imgur.com/pgWvOl1.png",
    "https://i.imgur.com/pWPUGUo.png",
    "https://i.imgur.com/rCLXY6N.png",
    "https://i.imgur.com/0NZGLFw.png",
    "https://i.imgur.com/pRqltkP.png",
    "https://i.imgur.com/gRqzafU.png",
    "https://i.imgur.com/dyNloCw.png",
    "https://i.imgur.com/gZ3LEEL.png",
  ],
};

/**
 * Return a random integer between 0 and the provided max value (exclusive of
 *  max value).
 * @param max - the maximum value to use in Math.random()
 * @returns A random number between 0 and the max value provided.
 */
const floorRND = (max) => {
  const rnd = Math.random();
  const rndValUsingMax = rnd * max;
  return Math.floor(rndValUsingMax);
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
 * max value is 100 - imgSize since I'm using this value as a percentage
 * and imgSize should be in vw units
 * @param imgSize - the width of the div containing the image
 * @returns A random number
 */
const getRNDPos = (imgSize) => {
  // use max to make sure we don't choose a negative value
  const maxPositionFromLeftEdge = 100 - imgSize;
  return Math.max(0, floorRND(maxPositionFromLeftEdge));
};

const noLuckFallback = (
  claimedPosVizArr,
  claimedPosArr,
  unclaimedPosSet,
  claimedPosSet,
  noLuck,
  imgSize
) => {
  const lastDitchIterations = 100;
  let rnd = getRNDPos(imgSize);

  // just try to avoid direct overlap
  for (let i = 0; i < lastDitchIterations; i++) {
    const isRNDAlreadyAClaimedPos = claimedPosArr[rnd];
    if (isRNDAlreadyAClaimedPos) {
      rnd = getRNDPos(imgSize);
    } else {
      break;
    }
  }
  // add to set to try to avoid overlapping
  claimedPosSet.add(rnd);
  // add to array to return
  claimedPosVizArr[rnd] = true;
  claimedPosArr.push(rnd);

  const numUnclaimedPos = unclaimedPosSet.size;
  if (unclaimedPosSet && numUnclaimedPos > 0) {
    unclaimedPosSet.delete(i);
  }
  noLuck++;

  return {
    noLuck,
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    unclaimedPosSet,
  };
};

const getMinOverlapNeeded = (imgSize, maxNumPosWOOverlap, numOfDVs) => {
  // actually don't want to go through at an overlap then increase overlap
  // because we'll get more overlap on some that we might've been able to avoid
  // if we started out spacing out imgs with the min overlap required given how
  // many imgs we need to show
  // we can use the following formula
  // imgSize - floor(maxNumPosAvail / numDVs)
  //
  // if we have more imgs we need to show than the max num of imgs without
  // overlap should try starting at a rnd pos between 0 and imgSize - 1
  // That way, avoid leaving too much space for another img to fit in
  // so if img width is 5, start at a pos between 0 - 4
  // as long as we choose a rnd img to put at each successive spaced out pos
  // we'll have our randomization
  // otherwise, we can choose rnd nums and make sure there isn't another pos
  // claimed within imgSize of it
  //
  //
  // num of times we've gone through a full set of pos overlapping at an
  // overlap value
  // Example:
  // if we have an img size of 5, we want to have a max pos of
  // 100 - imgSize = 95, so it has room to display, <95>,96,97,98,99
  // which equates to 95 + 1 = 96 (remember 0 is a possible pos) positions to
  // work with
  // we can fit floor(96 / 5) = 19 imgs in the window since each img takes up 5
  // positions in our imgSize = 5 example
  // Which leaves us with 96 - 19 = 77 pos left to work with
  //
  // if we start with an overlap of 1, our "width" changes from 5 to 4
  // We can think of this in terms of how many positions we need to reserve for
  // space between the current img pos and the previous one
  //
  // We can just consider one side since the next img will have
  // the other side of the previous img covered,
  // i.e., if we reserve 3 pos to the left of img a, and the next img is img b,
  // then the 3 pos we reserve for the left of img b will also be the 3 pos we
  // need to reserve to the right of img a
  // xxxAxxxB
  // so if we've got an overlap of 0, an img width of 5, then we need to
  // reserve 5 - 1 - 0 = 4 positions
  // if we've got an overlap of 1, then
  // 5 - 1 - 1 = 3 pos
  // or we can think of, with an overlap of 1, each img taking up 4 pos instead
  // of 5
  // which means with an img overlap of 1, a max pos avail of 96, we can fit
  // 96 / 4 = 24 imgs
  // or
  // 96 / (5 - 1) = 24
  // maxNumPosAvail / (imgSize - overlap) = maxNumClaimedPos
  //
  // at overlap of 3, img width of 10
  // floor(96 / (10 - 3)) = floor(96 / 7) = 13 imgs
  //
  // to find the size of the current min overlap we can reverse that
  // the img width minus (the max num of pos divided by the max num of claimed pos possible at that overlap)
  // maxNumPosAvail / numClaimedPos = imgSize - overlap
  // want to take the floor of the division result
  // imgSize - floor(maxNumPosAvail / numClaimedPos)
  // or
  // ceil of the total formula's result
  // ceil(imgSize - (maxNumPosAvail / numClaimedPos))
  //
  // but this gives the max num of pos at that overlap with the claimed pos
  // spaced out perfectly evenly
  // since we start with a rnd num that might not be true
  // we could try with this min overlap until we can't find a pos that fits,
  // then move to overlap + 1
  // but is there a way to calc this value or calc the num of pos we can fill
  // with a certain overlap given a certain num of unclaimed pos remaining?
  //
  //
  // Reserving 4 pos to the right of a claimed pos will give us a width of 5,
  // so with an overlap of 1 we want to reserve only 4 - 1 = 3 positions next
  // to each img
  //
  // if any imgs are close enough to the edge where there aren't enough pos to
  // reserve,
  // e.g., the img a is at pos 1,
  // then there's only 1 pos, pos 0, to reserve
  // xA
  // 01
  // we can change that to say if we're reserving 3 pos to the left of each
  // img and an img is less than 3 pos out from the left edge of the window,
  // we just need to reserve all pos to the left of that img or img pos - 0,
  // e.g., img a at pos 1 we reserve 1 - 0 = 1 pos, if img a is at pos 2, then
  // we reserve 2 spots, 1, 0, or 2 - 0
  // it's the min of pos - 0 or the current overlap number

  const overlap = imgSize - Math.floor(maxNumPosWOOverlap / numOfDVs);

  return overlap;
};

const getLeftImgBufferEdge = (rndPos, imgSize, overlap) => {
  return Math.max(rndPos - (imgSize - 1) + overlap + 1, 0);
};

const getRightImgBufferEdge = (rndPos, imgSize, overlap) => {
  return Math.min(rndPos + (imgSize - 1) + overlap - 1, 99);
};

const addPosToHelperObjs = (pos, helperObjs) => {
  // add pos to list of claimed pos
  helperObjs.claimedPosSet.add(pos);
  // mark index which is equal to the pos in the visualization array
  helperObjs.claimedPosVizArr[pos] = true;
  // add pos to claimed positions array
  helperObjs.claimedPosArr.push(pos);

  return helperObjs;
};

const claimPosAndNearby = (
  currPos,
  imgSize,
  overlap,
  numPosAvail,
  unclaimedPosSet
) => {
  const leftEdgeImgBufferWOverlap = getLeftImgBufferEdge(
    currPos,
    imgSize,
    overlap
  );
  const rightEdgeImgBufferWOverlap = getRightImgBufferEdge(
    currPos,
    imgSize,
    overlap
  );
  for (
    let i = leftEdgeImgBufferWOverlap;
    i <= rightEdgeImgBufferWOverlap;
    i++
  ) {
    numPosAvail = unclaimedPosSet.size;
    if (unclaimedPosSet && numPosAvail > 0) {
      unclaimedPosSet.delete(i);
    }
  }
  return numPosAvail;
};

const fillPosWithOverlap = (
  imgSize,
  claimedPosSet,
  claimedPosVizArr,
  claimedPosArr,
  maxNumPosWOOverlap,
  posOverlapping,
  overlap,
  numOfDVs
) => {
  let numClaimedPos = 0;
  const maxNumPosAvail = 100 - imgSize + 1 + 1;

  // if we started at pos >= imgSize we'd be leaving enough room for another
  // img to fit in before it
  const maxPosForFirstImg = imgSize - overlap;
  const firstPos = floorRND(maxPosForFirstImg);
  ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
    firstPos,
    {
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
    }
  ));

  let prevPos = firstPos;
  numClaimedPos++;

  // TODO: figure how much we can space out if we're below the next overlap number
  let rndMaxSpacingAddition =
    Math.floor(numOfDVs / maxNumPosWOOverlap) + (maxNumPosAvail % numOfDVs);
  const minSpacing = imgSize - overlap - 1;
  let rnd = 0;
  while (numClaimedPos < numOfDVs) {
    // if we've got greater than 1 extra space left to work with,
    // divide it by 2 so we don't use all the extra space up in the first couple
    // of positions
    if (rndMaxSpacingAddition > 0) {
      const rndNumForChance = floorRND(101);
      const rndChance = rndNumForChance % 2;
      const rndChanceOfAddingXtraSpacing = rndChance === 0;
      if (rndChanceOfAddingXtraSpacing && rndMaxSpacingAddition > 1) {
        const halfMaxAmtExtraSpacing = Math.floor(rndMaxSpacingAddition / 2);
        rnd = floorRND(halfMaxAmtExtraSpacing) + 1;
      } else {
        rnd = floorRND(rndMaxSpacingAddition + 1);
      }
    } else {
      rnd = 0;
    }
    // calc the pos
    const currPos = prevPos + minSpacing + 1 + rnd;
    rndMaxSpacingAddition -= rnd;
    const extraSpacingUsed = currPos - (prevPos + imgSize - overlap);

    ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
      currPos,
      {
        claimedPosSet,
        claimedPosVizArr,
        claimedPosArr,
      }
    ));

    posOverlapping.withoutOverlap = posOverlapping.withoutOverlap + 1;

    numClaimedPos++;
    prevPos = currPos;
  }

  return {
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    posOverlapping,
  };
};

/**
 * Generates random position and adds to and returns an array
 * @returns An array of random positions without overlap
 */
const fillPosWOOverlap = (
  claimedPosSet,
  claimedPosVizArr,
  claimedPosArr,
  unclaimedPosSet,
  imgSize,
  noLuck,
  numOfDVs,
  totNumPosAvail
) => {
  const overlap = 0;
  const numOfPosTakenImg = imgSize - 1;
  const numOfPosNeededForAllImgs = numOfPosTakenImg * numOfDVs;
  let xtraSpacing = totNumPosAvail - numOfPosNeededForAllImgs;
  let rnd = xtraSpacing;
  let currPos = floorRND(imgSize + xtraSpacing);
  let prevPos = 0;
  let numPosAvail = unclaimedPosSet.size;

  // Remove first pos and imgSize - 1 positions after it to avoid overlap
  for (let i = 0; i < currPos + imgSize - 1; i++) {
    unclaimedPosSet.delete(i);
  }

  let j = 0;
  while (claimedPosArr.length < numOfDVs) {
    prevPos = currPos;
    xtraSpacing -= rnd;
    ({ claimedPosSet, claimedPosVizArr, claimedPosArr } = addPosToHelperObjs(
      currPos,
      {
        claimedPosSet,
        claimedPosVizArr,
        claimedPosArr,
      }
    ));

    // should only hit this first conditional block if numOfDVs <
    // maxNumPosWOOverlapping
    if (numPosAvail > 0) {
      // get a rnd num to add to prev pos
      rnd = floorRND(xtraSpacing + 1);
      currPos = prevPos + imgSize + rnd;

      // walk positions from leftmost position that would be overlapping too much
      // to the rightmost position that would be overlapping too much
      numPosAvail = claimPosAndNearby(
        currPos,
        imgSize,
        overlap,
        numPosAvail,
        unclaimedPosSet
      );
    }
  }

  return {
    claimedPosSet,
    claimedPosVizArr,
    claimedPosArr,
    unclaimedPosSet,
    noLuck,
  };
};

// fill an array while trying to avoid overlap and moving up slowly
// on how much overlap we add
const generateDVColPosArrays = (numOfDVs, imgSize) => {
  // if imgSize were 1, we'd have 100 position slots from 0 - 99
  // if imgSize were 5, we'd have 96 positions to work with 0 - 95
  const maxPosToAvoidClipping = 100 - imgSize;
  const totNumPosAvail = maxPosToAvoidClipping + 1;
  const maxNumPosWOOverlap = Math.floor(totNumPosAvail / imgSize);
  const posOverlapping = {
    withoutOverlap: 0,
    withPartialOverlap: 0,
    withOverlap: 0,
    withRandom: 0,
  };
  let numPosClaimed = 0;
  let noLuck = 0;
  let claimedPosSet = new Set();
  let claimedPosVizArr = new Array(100);
  let claimedPosArr = new Array();
  let unclaimedPosSet = new Set();
  claimedPosVizArr = claimedPosVizArr.fill(0);

  for (let i = 0; i <= 100 - imgSize; i++) {
    unclaimedPosSet.add(i);
  }

  if (numOfDVs > maxNumPosWOOverlap) {
    // with overlap
    const overlap = getMinOverlapNeeded(imgSize, totNumPosAvail, numOfDVs);

    ({} = fillPosWithOverlap(
      imgSize,
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      maxNumPosWOOverlap,
      posOverlapping,
      overlap,
      numOfDVs
    ));
  } else {
    // without overlap

    ({
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      unclaimedPosSet,
      noLuck,
      numPosClaimed,
    } = fillPosWOOverlap(
      claimedPosSet,
      claimedPosVizArr,
      claimedPosArr,
      unclaimedPosSet,
      imgSize,
      noLuck,
      numOfDVs,
      totNumPosAvail
    ));
  }

  return {
    claimedPosVizArr,
    claimedPosArr,
    noLuck,
    posOverlapping,
    maxNumPosWOOverlap,
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
    position !== immediateRight &&
    position !== immediateLeft &&
    rndChanceToUseOhImg === 0
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

const getImgToUseAtPosHorizontal = (
  chanceForOh,
  ohs,
  ohhs,
  ones,
  oness,
  twos,
  twoss,
  image,
  image2,
  position,
  initPos,
  rnd,
  immediateRight,
  immediateLeft
) => {
  const rndChanceToUseOhImg = floorRND(chanceForOh);

  if (
    position !== immediateRight &&
    position !== immediateLeft &&
    rndChanceToUseOhImg === 0
  ) {
    const rndOhIndex = floorRND(ohs.length);
    image = ohs[rndOhIndex];
    image2 = ohhs[rndOhIndex];
  } else if (position < initPos) {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(ones.length);
    }
    image = ones[rnd];
    image2 = oness[rnd];
  } else {
    // rnd will be < 0 if ones and twos arrays are of different lengths
    if (rnd < 0) {
      rnd = floorRND(twos.length);
    }
    image = twos[rnd];
    image2 = twoss[rnd];
  }

  return { image, image2 };
};

const fillRenderings = (
  numOfDVs,
  initRND,
  chanceForOh,
  ohs,
  ones,
  twos,
  codes,
  claimedPosArr,
  claimedPosVizArr,
  initPos,
  renderings
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";
  let immediateRight = initPos + 1;
  let immediateLeft = initPos - 1;

  for (let i = initPos; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos; i >= 0; i--) {
    if (claimedPosVizArr[i]) {
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
    position = claimedPosArr[i];

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

const fillRenderings2D = (
  numOfDVs,
  initRND,
  chanceForOh,
  ohs,
  ohhs,
  ones,
  oness,
  twos,
  twoss,
  codes,
  claimedPosArr,
  claimedPosVizArr,
  initPos,
  renderings
) => {
  let rnd = -1;
  let code = 0;
  let position = 0;
  let image = "";
  let image2 = "";
  let immediateRight = initPos + 1;
  let immediateLeft = initPos - 1;

  for (let i = initPos; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos; i >= 0; i--) {
    if (claimedPosVizArr[i]) {
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
    position = claimedPosArr[i];

    ({ image, image2 } = getImgToUseAtPosHorizontal(
      chanceForOh,
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
      image,
      image2,
      position,
      initPos,
      rnd,
      immediateRight,
      immediateLeft
    ));

    renderings[i] = { value: code, pos: position, img: [image, image2] };
  }

  return renderings;
};

const getImgOptions = (theme) => {
  const mes = images.me;
  const mees = images.mee;
  const meees = images.meee;
  const meeees = images.meeee;
  const pings = images.ping;
  const as = images.pointA;
  const bs = images.pointB;
  const cs = images.pointC;
  const ds = images.pointD;
  const fs = images.pointF;
  const ffs = images.pointFF;
  const gs = images.pointG;
  const ggs = images.pointGG;
  const is = images.pointI;
  const js = images.pointJ;

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
  } else if (theme === "ping") {
    ohs = shuffleArray(pings);
    ones = shuffleArray(js);
    twos = shuffleArray(is);
  } else if (theme === "racing") {
    ohs = shuffleArray(meees);
    ohhs = shuffleArray(meeees);
    ones = shuffleArray(fs);
    oness = shuffleArray(ffs);
    twos = shuffleArray(gs);
    twoss = shuffleArray(ggs);

    return {
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
    };
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
  claimedPosArr,
  claimedPosVizArr,
  theme
) => {
  // init
  let renderings = {};
  const initRND = floorRND(numOfDVs);
  const initCode = codes[initRND];
  const initPos = claimedPosArr[initRND];

  // inverse of percentage chance (percentage chance will be equal to 1 over
  // this number) for having another "oh" image show up
  let chanceForOh = 10;

  // img options
  const imgOptions = getImgOptions(theme);

  if (Object.values(imgOptions).length > 3) {
    const { ohs, ohhs, ones, oness, twos, twoss } = imgOptions;

    const rndOh = floorRND(ohs.length);
    const initImage = ohs[rndOh];
    const initImage2 = ohhs[rndOh];

    // initial rendering
    renderings[initRND] = {
      value: initCode,
      pos: initPos,
      img: [initImage, initImage2],
    };

    renderings = fillRenderings2D(
      numOfDVs,
      initRND,
      chanceForOh,
      ohs,
      ohhs,
      ones,
      oness,
      twos,
      twoss,
      codes,
      claimedPosArr,
      claimedPosVizArr,
      initPos,
      renderings
    );
  } else {
    const { ohs, ones, twos } = imgOptions;

    const rndOh = floorRND(ohs.length);
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
      claimedPosArr,
      claimedPosVizArr,
      initPos,
      renderings
    );
  }

  const renderingsString = JSON.stringify(renderings);

  return { code: initCode, renderings: renderingsString };
};

module.exports = a = async ({ params }) => {
  const numOfDVs = Number(params.numDVs);
  const imgSize = Number(params.imgSize);
  const imgSizeRacing = Number(params.imgSizeRacing);
  const theme = params.theme;
  const bgImgSrc = images.bg[theme];
  let size;
  if (theme === "racing") {
    size = imgSizeRacing;
  } else {
    size = imgSize;
  }
  let {
    claimedPosVizArr,
    claimedPosArr,
    noLuck,
    posOverlapping,
    maxNumPosWOOverlap,
  } = generateDVColPosArrays(numOfDVs, size);

  const codes = generateCodes(numOfDVs);

  const { code, renderings } = combineCodesAndPosArrayAndImgs(
    numOfDVs,
    codes,
    claimedPosArr,
    claimedPosVizArr,
    theme
  );
  const numDirectOverlaps =
    claimedPosArr.length - claimedPosVizArr.filter((pos) => pos).length;

  const positionsSorted = claimedPosArr.sort((a, b) => {
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
    posArray: claimedPosVizArr,
    positions: claimedPosArr,
    positionsSorted: positionsSorted,
    posArrayLength: claimedPosArr.length,
    noLuck: noLuck,
    posOverlapping: posOverlapping,
    maxNumPosWOOverlap: maxNumPosWOOverlap,
    numDirectOverlaps: numDirectOverlaps,
  };

  return output;
};
