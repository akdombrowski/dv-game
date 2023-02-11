const crypto = require("crypto");

const images = {
  bg: {
    seeingDouble: "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png",
    ahhhhhh: "https://i.ibb.co/4dgrH9T/groupphoto3.png",
    racing: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
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
    "https://i.postimg.cc/tg7ndd9G/katpcha-me-2e8d60e3-486e-4bd1-bbb9-35b88629a6f6.webp",
    "https://i.postimg.cc/Jnkyv1yT/katpcha-me-62525271-d051-4011-9844-16e118b23f5b.webp",
    "https://i.postimg.cc/d0Xk570k/katpcha-me-8f168fe3-3ed3-4cbe-95f8-1547b47d08f2.webp",
    "https://i.postimg.cc/wMYtdSL9/katpcha-me-99a9c8c9-102a-4f69-b8b8-e2e6fcb49432.webp",
    "https://i.postimg.cc/FF0dxHXz/katpcha-me-a50d651b-408b-43fd-84e0-e1188820b099.webp",
    "https://i.postimg.cc/SNqX1bmr/katpcha-me-aa202be5-dc52-4069-b29b-9798c2e722e9.webp",
    "https://i.postimg.cc/QxbFRYtr/katpcha-me-b76dd6cd-1619-4835-91f4-8d8a8a39a375.webp",
    "https://i.postimg.cc/6qV86Yfn/katpcha-me-c100b297-d6f5-4bcb-b8b5-f1ab3cb13c24.webp",
  ],
  meeee: [
    "https://i.postimg.cc/WzcV3V5f/katpcha-me-17e4ad47-9d0e-4e5d-b02e-259c129fb473.webp",
    "https://i.postimg.cc/rpbcBxxT/katpcha-me-436a8856-6dc2-4229-8461-6327fa2e7b0d.webp",
    "https://i.postimg.cc/mDHRBkyH/katpcha-me-4f63dd63-0b8d-4bc6-9d40-0ba515ce6960.webp",
    "https://i.postimg.cc/Cxcw4WKz/katpcha-me-593d0fdf-2683-4d4e-a392-c6f2ef65005c.webp",
    "https://i.postimg.cc/SN7SnXFL/katpcha-me-ac149974-1dd4-4b2a-9a12-91ec543ee100.webp",
    "https://i.postimg.cc/vZYQfQbJ/katpcha-me-ae261cd4-b1ec-4ee7-8a9e-2021d6f3bf37.webp",
    "https://i.postimg.cc/FK1NCDfG/katpcha-me-aea2b5c9-18fa-4c5b-a800-ecec5b4110ab.webp",
    "https://i.postimg.cc/J4W77Ng4/katpcha-me-f238a6ef-71c9-4a3c-b82d-9ef8248d3cb6.webp",
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
    "https://i.postimg.cc/k5XMW7FV/katpcha-me-31d208b2-86ad-4e10-8479-67233f6201f5.webp",
    "https://i.postimg.cc/qvGMtNnV/katpcha-me-41695bd5-5135-47de-beb4-4bf427085985.webp",
    "https://i.postimg.cc/BZ86hQWH/katpcha-me-83ca008c-1d39-4c11-a2e9-49b6bd6de121.webp",
    "https://i.postimg.cc/9FZfh8Qf/katpcha-me-8d3221ca-67fb-4ce1-a270-50f2d6b58e9a.webp",
    "https://i.postimg.cc/kgCgXQ2v/katpcha-me-a1dd0f2a-6445-4708-bf13-6183b24fa4e4.webp",
    "https://i.postimg.cc/g0SzD1Ng/katpcha-me-b438238c-2729-4e9c-8e80-53fb48abb3ef.webp",
    "https://i.postimg.cc/j5Dskv1t/katpcha-me-de0f5450-85cf-4485-82fb-2a255007491a.webp",
    "https://i.postimg.cc/KcdYCSFV/katpcha-me-f766d63e-03ea-472c-a599-6aa5a4c046c8.webp",
  ],
  pointFF: [
    "https://i.postimg.cc/g0GNGTyq/katpcha-me-2c9fc8f1-e971-4442-8739-3d2aa3550556.webp",
    "https://i.postimg.cc/brSR6c88/katpcha-me-3f0d7363-131e-46ac-b7ae-e353525311d9.webp",
    "https://i.postimg.cc/zBB7gHcy/katpcha-me-5b37b654-3ef2-4115-a652-545e09c91ac1.webp",
    "https://i.postimg.cc/h4JWFXt4/katpcha-me-677db85a-7923-4900-9754-c65e4be7074b.webp",
    "https://i.postimg.cc/XNTMnnrf/katpcha-me-85a4cfef-3dba-4ee5-85e7-973e1102bc4d.webp",
    "https://i.postimg.cc/hGMMv1pF/katpcha-me-97c2917d-10bc-4fa0-9f6b-1d062e942ae8.webp",
    "https://i.postimg.cc/Hxh24WqB/katpcha-me-af001030-771b-43e1-a27b-1f8e84ca8582.webp",
    "https://i.postimg.cc/dDMjpHtC/katpcha-me-d5f20291-a44d-40ce-a2a4-794cf59989e8.webp",
  ],
  pointG: [
    "https://i.postimg.cc/nVd4mL4m/katpcha-me-06534eb7-0dd5-4f9d-aa5e-11d2c9cf93e1.webp",
    "https://i.postimg.cc/sx05Cnjm/katpcha-me-1b3dedb0-185d-48ad-857c-908c84fd8da6.webp",
    "https://i.postimg.cc/jSfPBQG6/katpcha-me-454d1a15-0dbc-49c3-899c-5219662ec3bf.webp",
    "https://i.postimg.cc/JhcJz77G/katpcha-me-572be08f-e96e-473a-8ed9-3b9d6a358745.webp",
    "https://i.postimg.cc/jdmy8kkd/katpcha-me-7cf5de79-72ca-41df-b3e6-7bcb9e596bb4.webp",
    "https://i.postimg.cc/CLzjsV7Q/katpcha-me-b5f28960-818b-417a-8692-cb1ad3a56bfb.webp",
    "https://i.postimg.cc/XJj5GMXx/katpcha-me-c08eeb8c-822a-478a-8c2d-6ec99e603b34.webp",
    "https://i.postimg.cc/pdtzv5Hw/katpcha-me-cc64ae6d-8dda-4b0f-9df8-65fd065666f6.webp",
  ],
  pointGG: [
    "https://i.postimg.cc/dtxg5wYk/katpcha-me-4b4a7edc-a60c-4eb8-b769-86e8bce0d8d7.webp",
    "https://i.postimg.cc/Zqk2hH0J/katpcha-me-61005410-5b1e-4a41-96e7-c35a5b0cc36e.webp",
    "https://i.postimg.cc/ZqrgYNyp/katpcha-me-62ed42e9-9b4e-41d2-8a52-a5b075249a48.webp",
    "https://i.postimg.cc/sXsLM2p8/katpcha-me-aea5c6b9-51d1-4f1a-9c1d-f3707654119b.webp",
    "https://i.postimg.cc/Tw04gX0P/katpcha-me-bdc75d9c-199d-49b4-bf83-31a775d15d11.webp",
    "https://i.postimg.cc/Z5v2g2bf/katpcha-me-bef29e05-53e7-4ade-b2ce-4743c8745f41.webp",
    "https://i.postimg.cc/fygqqj6n/katpcha-me-ec071831-fef6-4915-8e00-7354a7929ef6.webp",
    "https://i.postimg.cc/0jNHCHX0/katpcha-me-f1682e3e-053a-4366-9353-80945c638ad5.webp",
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

  for (let i = initPos + 1; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos - 1; i >= 0; i--) {
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

  for (let i = initPos + 1; i < claimedPosVizArr.length; i++) {
    if (claimedPosVizArr[i]) {
      immediateRight = i;
      break;
    }
  }

  for (let i = initPos - 1; i >= 0; i--) {
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

const localParams = {
  numDVs: 10,
  imgSize: 5,
  imgSizeRacing: 20,
  theme: "racing",
};

module.exports = a = async (params = localParams) => {
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
